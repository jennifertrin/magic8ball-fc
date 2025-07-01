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

// Check if we're in a mini-app environment
export const isMiniAppEnvironment = () => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    // Check for Farcaster-specific indicators
    const isFarcasterHost = window.location.hostname.includes('farcaster.xyz');
    const isFarcasterUserAgent = navigator.userAgent.includes('farcaster');
    const hasFarcasterFrame = window.location.search.includes('frame=');
    
    return isFarcasterHost || isFarcasterUserAgent || hasFarcasterFrame;
  } catch (error) {
    console.error('Error checking mini-app environment:', error);
    return false;
  }
};

// Auto-connect wallet if in mini-app environment
export const autoConnectWallet = async () => {
  try {
    if (!isMiniAppEnvironment()) {
      return false;
    }

    const sdkInstance = getMiniAppSDK();
    const isReady = await sdkInstance.actions.ready();
    return isReady;
  } catch (error) {
    console.error('Failed to auto-connect wallet:', error);
    return false;
  }
}; 