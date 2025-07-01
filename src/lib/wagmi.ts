import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector'
import { injected } from 'wagmi/connectors'

// Check if we're in a mini-app environment
const isMiniAppEnvironment = () => {
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
    console.error('Error checking miniapp environment:', error);
    return false;
  }
};

// Create different configs for different environments
const createMiniAppConfig = () => {
  return createConfig({
    chains: [base],
    transports: {
      [base.id]: http(),
    },
    connectors: [
      miniAppConnector()
    ]
  });
};

const createStandardConfig = () => {
  return createConfig({
    chains: [base],
    transports: {
      [base.id]: http(),
    },
    connectors: [
      injected()
    ]
  });
};

// Export the appropriate config based on environment
export const config = typeof window !== 'undefined' && isMiniAppEnvironment() 
  ? createMiniAppConfig() 
  : createStandardConfig();