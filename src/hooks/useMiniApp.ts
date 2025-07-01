import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { initializeMiniApp, getMiniAppSDK, isMiniAppEnvironment, autoConnectWallet } from '../lib/miniapp';

export const useMiniApp = () => {
  const [isMiniApp, setIsMiniApp] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    const checkAndInitialize = async () => {
      const miniAppEnv = isMiniAppEnvironment();
      setIsMiniApp(miniAppEnv);

      if (miniAppEnv) {
        try {
          await initializeMiniApp();
          setIsInitialized(true);
          
          // Auto-connect wallet in mini-app environment
          const connected = await autoConnectWallet();
          if (connected) {
            console.log('Wallet auto-connected in mini-app environment');
          }
        } catch (error) {
          console.error('Failed to initialize mini-app:', error);
        }
      }
    };

    checkAndInitialize();
  }, []);

  const connectWallet = async () => {
    if (isMiniApp) {
      try {
        await autoConnectWallet();
      } catch (error) {
        console.error('Failed to connect wallet in mini-app:', error);
        throw error;
      }
    } else if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  };

  const sendTransaction = async () => {
    if (!isMiniApp) {
      throw new Error('Transaction sending is only available in mini-app environment');
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
    if (!isMiniApp) {
      throw new Error('Cast composition is only available in mini-app environment');
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
    isMiniApp,
    isInitialized,
    isConnected,
    connectWallet,
    sendTransaction,
    composeCast,
    getMiniAppSDK
  };
}; 