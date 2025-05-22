import { Suspense } from 'react';
import Magic8Ball from '../components/Magic8Ball';

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Suspense fallback={
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
          <div className="text-center max-w-sm mx-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-base sm:text-lg font-semibold">Loading Magic 8 Ball...</p>
            <p className="text-gray-300 text-xs sm:text-sm mt-2 px-2">Preparing the mystical experience</p>
          </div>
        </div>
      }>
        <Magic8Ball />
      </Suspense>
    </div>
  );
}