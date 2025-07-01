'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import Magic8BallUI from './Magic8BallUI';
import { generateResultImage, getRandomAnswer, createCastTextOptions } from '../utils/magic8Utils';
import { useMintNFT } from '../hooks/useMintNFT';
import { useMiniApp } from '../hooks/useMiniApp';

export default function Magic8BallContainer() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [hasShaken, setHasShaken] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const ballRef = useRef<HTMLDivElement>(null);

  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { mint, isPending: isMinting, isSuccess: isMinted, mintingFee } = useMintNFT();
  const { isMiniApp, isInitialized, connectWallet, composeCast } = useMiniApp();

  const staticParticles = useMemo(() => {
    if (!isClient) return [];
    
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 0.3 + (i % 3) * 0.2;
      const x = 50 + Math.cos(angle) * radius * 40;
      const y = 50 + Math.sin(angle) * radius * 40;
      particles.push({ id: i, left: `${x}%`, top: `${y}%`, duration: 3 + (i % 4), delay: (i % 5) * 0.4 });
    }
    return particles;
  }, [isClient]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleShake = () => {
    if (!question.trim() || isShaking) return;
    setIsShaking(true);
    setHasShaken(true);
    setShowAnswer(false);
    setTimeout(() => {
      const randomAnswer = getRandomAnswer();
      setAnswer(randomAnswer);
      setShowAnswer(true);
      setIsShaking(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleShake();
  };

  const handleShare = async (): Promise<void> => {
    try {
      const imageBlob: Blob | null = await generateResultImage(ballRef, answer, question);
      const castTexts: string[] = createCastTextOptions(question, answer);
      const randomText: string = castTexts[Math.floor(Math.random() * castTexts.length)];
  
      // Use the Mini App SDK for sharing
      if (isMiniApp && isInitialized) {
        try {
          const embedUrls: string[] = [window.location.href];
          await composeCast(randomText, embedUrls);
        } catch {
          // Fallback to native sharing
        }
      }
      
      // Try native sharing with files
      if (navigator.share && imageBlob) {
        const imageFile: File = new File([imageBlob], 'magic-8-ball-result.png', { type: 'image/png' });
        await navigator.share({ 
          title: 'Magic 8 Ball Result', 
          text: randomText, 
          files: [imageFile] 
        });
      } 
      // Try native sharing without files
      else if (navigator.share) {
        await navigator.share({ 
          title: 'Magic 8 Ball Result', 
          text: randomText, 
          url: window.location.href 
        });
      } 
      // Fallback to clipboard
      else {
        await navigator.clipboard.writeText(`${randomText} ${window.location.href}`);
        alert('Result copied to clipboard!');
      }
    } catch {
      // (error intentionally ignored to fix ESLint error)
    }
  };

  const handleMintNFT = async () => {
    if (!isConnected) {
      if (isMiniApp && isInitialized) {
        // In mini-app, try to auto-connect
        try {
          await connectWallet();
          // Wait a moment for connection to establish
          setTimeout(async () => {
            if (isConnected) {
              await mint(question, answer, ballRef);
            } else {
              alert('Please connect your wallet to mint NFTs');
            }
          }, 1000);
        } catch {
          alert('Please connect your wallet to mint NFTs');
        }
      } else {
        alert('Please connect your wallet first');
      }
      return;
    }

    try {
      await mint(question, answer, ballRef);
    } catch {
      alert('Failed to mint NFT. Please try again.');
    }
  };

  const handleConnectWallet = () => {
    if (isMiniApp && isInitialized) {
      // In mini-app, try to auto-connect
      connectWallet().catch(() => {
        alert('Failed to connect wallet. Please try again.');
      });
    } else if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  };

  const handleDisconnectWallet = () => {
    disconnect();
  };

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null;
  }

  return (
    <Magic8BallUI
      question={question}
      setQuestion={setQuestion}
      answer={answer}
      isShaking={isShaking}
      hasShaken={hasShaken}
      showAnswer={showAnswer}
      isClient={isClient}
      staticParticles={staticParticles}
      ballRef={ballRef}
      onShake={handleShake}
      onKeyPress={handleKeyPress}
      onShare={handleShare}
      onMint={handleMintNFT}
      onConnectWallet={handleConnectWallet}
      onDisconnectWallet={handleDisconnectWallet}
      isConnected={isConnected}
      isMinting={isMinting}
      isMinted={isMinted}
      address={address}
      mintingFee={mintingFee}
      isMiniApp={isMiniApp}
    />
  );
}