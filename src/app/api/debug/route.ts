import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const headers = Object.fromEntries(request.headers.entries());
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    url: request.url,
    headers: {
      'user-agent': headers['user-agent'],
      'referer': headers['referer'],
      'origin': headers['origin'],
      'host': headers['host'],
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      isFarcaster: headers['user-agent']?.includes('farcaster') || false,
      hostname: new URL(request.url).hostname,
    }
  });
} 