import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { initializeMiniApp, getMiniAppSDK, autoConnectWallet } from '../lib/miniapp';

export const useMiniApp = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    // Ensure we're on the client side
    setIsClient(true);
    
    const initialize = async () => {
      try {
        console.log('Initializing Farcaster Mini App...');
        await initializeMiniApp();
        setIsInitialized(true);
        setInitializationError(null);
        
        // Auto-connect wallet
        const connected = await autoConnectWallet();
        if (connected) {
          console.log('Wallet auto-connected successfully');
        } else {
          console.log('Wallet auto-connection failed, will use manual connection');
        }
      } catch (error) {
        console.error('Failed to initialize mini-app:', error);
        setInitializationError(error instanceof Error ? error.message : 'Failed to initialize mini-app');
        // Continue with fallback behavior
      }
    };

    // Use a small delay to ensure proper hydration
    const timer = setTimeout(initialize, 0);
    return () => clearTimeout(timer);
  }, []);

  const connectWallet = async () => {
    if (isInitialized && !initializationError) {
      try {
        await autoConnectWallet();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        // Fallback to manual connection
        if (connectors.length > 0) {
          connect({ connector: connectors[0] });
        }
      }
    } else if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  };

  const sendTransaction = async () => {
    if (!isInitialized || initializationError) {
      throw new Error('Transaction sending is only available in initialized mini-app environment');
    }

    try {
      const sdk = getMiniAppSDK();
      return await sdk.actions.ready();
    } catch (error) {
      console.error('Failed to send transaction:', error);
      throw error;
    }
  };

  const composeCast = async (text: string, embeds?: string[]) => {
    if (!isInitialized || initializationError) {
      throw new Error('Cast composition is only available in initialized mini-app environment');
    }

    try {
      const sdk = getMiniAppSDK();
      return await sdk.actions.composeCast({ 
        text, 
        embeds: embeds as [] | [string] | [string, string] || [] 
      });
    } catch (error) {
      console.error('Failed to compose cast:', error);
      throw error;
    }
  };

  return {
    isInitialized: isClient ? isInitialized : false,
    initializationError: isClient ? initializationError : null,
    isConnected,
    connectWallet,
    sendTransaction,
    composeCast,
    getMiniAppSDK
  };
}; 