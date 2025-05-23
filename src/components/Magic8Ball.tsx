'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { sdk } from '@farcaster/frame-sdk';
// import { useAccount } from 'wagmi';
import Magic8BallUI from './Magic8BallUI';
import { generateResultImage, getRandomAnswer, createCastTextOptions } from '../utils/magic8Utils';
// import { useMintNFT } from '../hooks/useMintNFT';

export default function Magic8BallContainer() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [hasShaken, setHasShaken] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const ballRef = useRef<HTMLDivElement>(null);

  // const { isConnected } = useAccount();
  // const { mint, isPending: isMinting, isSuccess: isMinted } = useMintNFT();

  const staticParticles = useMemo(() => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 0.3 + (i % 3) * 0.2;
      const x = 50 + Math.cos(angle) * radius * 40;
      const y = 50 + Math.sin(angle) * radius * 40;
      particles.push({ id: i, left: `${x}%`, top: `${y}%`, duration: 3 + (i % 4), delay: (i % 5) * 0.4 });
    }
    return particles;
  }, []);

  useEffect(() => {
    setIsClient(true);
    
    // Initialize Farcaster SDK
    const initializeSdk = async () => {
      try {
        await sdk.actions.ready();
        console.log('Farcaster SDK initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Farcaster SDK:', error);
      }
    };
    
    initializeSdk();
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
  
      // Use the imported SDK directly
      if (sdk?.actions?.composeCast) {
        // Farcaster SDK expects specific embed format - only strings (URLs)
        const embedUrls: string[] = [window.location.href];
        await sdk.actions.composeCast({ text: randomText, embeds: embedUrls as [] | [string] | [string, string] });
      } 
      // Try native sharing with files
      else if (navigator.share && imageBlob) {
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
    } catch (error: unknown) {
      // Check if the error is due to user cancellation
      if (error instanceof Error && error.name === 'AbortError') {
        // User cancelled the share dialog - this is normal behavior, no need to show error
        console.log('Share cancelled by user');
        return;
      }
      
      // Handle other types of errors
      console.error('Error sharing result:', error);
      
      // Optionally show a user-friendly error message for actual errors
      // alert('Sorry, there was an error sharing the result. Please try again.');
    }
  };

  // const handleMintNFT = async () => {
  //   if (!isConnected) {
  //     alert('Please connect your wallet first');
  //     return;
  //   }

  //   try {
  //     const imageBlob = await generateResultImage(ballRef, answer, question);
  //     if (!imageBlob) {
  //       throw new Error('Failed to generate image');
  //     }

  //     // Upload image to IPFS or your preferred storage
  //     // const imageURI = 'ipfs://...'; // Replace with actual image upload logic

  //     // await mint(question, answer, imageURI);
  //   } catch (error) {
  //     console.error('Error minting NFT:', error);
  //     alert('Failed to mint NFT. Please try again.');
  //   }
  // };

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
      // onMint={handleMintNFT}
      // isConnected={isConnected}
      // isMinting={isMinting}
      // isMinted={isMinted}
    />
  );
}