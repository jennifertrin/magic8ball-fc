import { sdk } from '@farcaster/miniapp-sdk';

// Initialize the mini-app SDK
export const initializeMiniApp = async () => {
  try {
    await sdk.actions.ready();
    console.log('Farcaster Mini App SDK initialized successfully');
    return sdk;
  } catch (error) {
    console.error('Failed to initialize Farcaster Mini App SDK:', error);
    throw error;
  }
};

// Get the mini-app SDK instance
export const getMiniAppSDK = () => sdk;

// Always attempt to connect wallet using mini-app SDK
export const autoConnectWallet = async () => {
  try {
    const sdkInstance = getMiniAppSDK();
    const isReady = await sdkInstance.actions.ready();
    return isReady;
  } catch (error) {
    console.error('Failed to auto-connect wallet:', error);
    return false;
  }
}; 