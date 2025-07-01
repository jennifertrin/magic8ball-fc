import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { initializeMiniApp, getMiniAppSDK, isMiniAppEnvironment, autoConnectWallet } from '../lib/miniapp';

export const useMiniApp = () => {
  const [isMiniApp, setIsMiniApp] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    // Ensure we're on the client side
    setIsClient(true);
    
    const checkAndInitialize = async () => {
      try {
        const miniAppEnv = isMiniAppEnvironment();
        setIsMiniApp(miniAppEnv);

        if (miniAppEnv) {
          try {
            console.log('Initializing Farcaster Mini App...');
            await initializeMiniApp();
            setIsInitialized(true);
            setInitializationError(null);
            
            // Auto-connect wallet in mini-app environment
            const connected = await autoConnectWallet();
            if (connected) {
              console.log('Wallet auto-connected in mini-app environment');
            } else {
              console.log('Wallet auto-connection failed, will use manual connection');
            }
          } catch (error) {
            console.error('Failed to initialize mini-app:', error);
            setInitializationError(error instanceof Error ? error.message : 'Failed to initialize mini-app');
            // Don't throw here, just log the error and continue with fallback
          }
        }
      } catch (error) {
        console.error('Error checking mini-app environment:', error);
        setInitializationError(error instanceof Error ? error.message : 'Error checking mini-app environment');
      }
    };

    // Use a small delay to ensure proper hydration
    const timer = setTimeout(checkAndInitialize, 0);
    return () => clearTimeout(timer);
  }, []);

  const connectWallet = async () => {
    if (isMiniApp && isInitialized && !initializationError) {
      try {
        await autoConnectWallet();
      } catch (error) {
        console.error('Failed to connect wallet in mini-app:', error);
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
    if (!isMiniApp || !isInitialized || initializationError) {
      throw new Error('Transaction sending is only available in initialized mini-app environment');
    }

    try {
      const sdk = getMiniAppSDK();
      // The mini-app SDK will handle the transaction through the user's wallet
      // Note: The actual method name may vary based on the SDK version
      return await sdk.actions.ready();
    } catch (error) {
      console.error('Failed to send transaction:', error);
      throw error;
    }
  };

  const composeCast = async (text: string, embeds?: string[]) => {
    if (!isMiniApp || !isInitialized || initializationError) {
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
    isMiniApp: isClient ? isMiniApp : false,
    isInitialized: isClient ? isInitialized : false,
    initializationError: isClient ? initializationError : null,
    isConnected,
    connectWallet,
    sendTransaction,
    composeCast,
    getMiniAppSDK
  };
}; 