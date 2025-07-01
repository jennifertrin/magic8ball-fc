'use client';

import { useEffect, useState } from 'react';
import { isMiniAppEnvironment } from '../lib/miniapp';

interface DebugInfo {
  hostname: string;
  userAgent: string;
  url: string;
  isMiniApp: boolean;
  timestamp: string;
}

export default function DebugInfo() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);

  useEffect(() => {
    const info: DebugInfo = {
      hostname: window.location.hostname,
      userAgent: navigator.userAgent,
      url: window.location.href,
      isMiniApp: isMiniAppEnvironment(),
      timestamp: new Date().toISOString(),
    };

    setDebugInfo(info);

    // Also log to console for debugging
    console.log('Debug Info:', info);
  }, []);

  if (!debugInfo) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black bg-opacity-75 text-white text-xs p-3 rounded max-w-xs">
      <div className="font-bold mb-2">Debug Info</div>
      <div className="space-y-1">
        <div><strong>Host:</strong> {debugInfo.hostname}</div>
        <div><strong>MiniApp:</strong> {debugInfo.isMiniApp ? 'Yes' : 'No'}</div>
        <div><strong>User Agent:</strong> {debugInfo.userAgent.substring(0, 30)}...</div>
        <div><strong>URL:</strong> {debugInfo.url.substring(0, 40)}...</div>
      </div>
    </div>
  );
}