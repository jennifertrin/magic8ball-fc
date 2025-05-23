'use client';

import React, { RefObject } from 'react';

interface Particle {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

interface Magic8BallUIProps {
  question: string;
  setQuestion: (value: string) => void;
  answer: string;
  isShaking: boolean;
  hasShaken: boolean;
  showAnswer: boolean;
  isClient: boolean;
  staticParticles: Particle[];
  ballRef: RefObject<HTMLDivElement | null>;
  onShake: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onShare: () => void;
  // onMint: () => void;
}

export default function Magic8BallUI({
  question,
  setQuestion,
  answer,
  isShaking,
  hasShaken,
  showAnswer,
  isClient,
  staticParticles,
  ballRef,
  onShake,
  onKeyPress,
  onShare,
  // onMint
}: Magic8BallUIProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden p-4">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 opacity-20 z-0">
        <div className="absolute top-10 left-10 w-48 h-48 bg-purple-500 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-20 right-10 w-48 h-48 bg-indigo-500 rounded-full blur-xl animate-pulse delay-700" />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-blue-500 rounded-full blur-xl animate-pulse delay-1000" />
      </div>

      {/* Particles */}
      {isClient && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          {staticParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-indigo-400 rounded-full opacity-60"
              style={{
                left: particle.left,
                top: particle.top,
                animation: `float ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-2 items-center text-center z-10 pt-4">
        <h1 className="flex text-4xl font-bold text-white mb-2">✨ MAGIC 8 BALL ✨</h1>
        <p className="flex text-gray-300 text-sm">Ask a question and shake to reveal your destiny</p>
        <div className="flex w-full max-w-md z-10 mt-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="What would you like to know?"
            className="w-full px-4 py-4 text-base bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            disabled={isShaking}
          />
        </div>
      </div>

      {/* Ball */}
      <div ref={ballRef} className="z-10 flex justify-center items-center">
        <div
          className={`relative cursor-pointer transition-all duration-300 ${
            isShaking ? 'animate-bounce' : 'hover:rotate-3'
          }`}
          onClick={onShake}
          style={{
            animation: isShaking ? 'shake 0.5s ease-in-out infinite' : 'float 3s ease-in-out infinite'
          }}
        >
          <div className="absolute top-4 left-4 w-80 h-80 bg-black/30 rounded-full blur-2xl -z-10"></div>
          <div className="w-80 h-80 rounded-full bg-gradient-to-br from-gray-800 via-black to-gray-900 shadow-2xl relative overflow-hidden">
            <div className="absolute top-12 left-16 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute top-8 left-12 w-8 h-8 bg-white/40 rounded-full blur-sm"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-8">
              <div
                className={`w-32 h-32 rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 border-4 border-indigo-700 shadow-inner relative overflow-hidden transition-all duration-500 ${
                  isShaking ? 'animate-pulse' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-purple-600/30 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 flex items-center justify-center">
                  {isShaking ? (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                    </div>
                  ) : showAnswer && answer ? (
                    <div className="text-white text-xs font-bold text-center leading-tight px-1 animate-fade-in">
                      {answer}
                    </div>
                  ) : (
                    <div className="text-indigo-300 text-center opacity-50 text-3xl">8</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="flex flex-col gap-8 z-10 text-center w-full max-w-md">
        <div className="flex justify-center bg-white/10 backdrop-blur-md rounded-lg px-6 py-2 border border-white/20">
          <p className="text-white text-sm">
            {!hasShaken ? (
              <>💫 Type your question above and tap the ball</>
            ) : isShaking ? (
              <>🔮 The spirits are consulting...</>
            ) : showAnswer && answer ? (
              <>✨ Share your result</>
            ) : (
              <>✨ Ask another question or shake again</>
            )}
          </p>
        </div>
        <div className={`flex w-full max-w-md z-10 pb-4 grid gap-2 ${showAnswer && answer && !isShaking ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <button
          onClick={onShake}
          disabled={!question.trim() || isShaking}
          className="w-full px-6 py-3 text-base bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isShaking ? 'Shaking...' : 'Shake the Ball'}
        </button>
        {showAnswer && answer && !isShaking && (
          <>
            <button
              onClick={onShare}
              className="w-full px-6 py-3 text-base bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl"
            >
              Share
            </button>
            {/* <button
              onClick={onMint}
              className="w-full px-6 py-3 text-base bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl"
            >
              Mint NFT
            </button> */}
          </>
        )}
      </div>
      </div>
      

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px) rotate(-2deg);
          }
          75% {
            transform: translateX(5px) rotate(2deg);
          }
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}