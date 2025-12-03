import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  onSuggestionClick?: (text: string) => void;
  onPlayVideo?: (videoId: string) => void;
}

const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onSuggestionClick, onPlayVideo }) => {
  const isUser = message.role === 'user';
  const isSystemError = message.text.includes("오류가 발생했습니다");

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm mt-1 ${
          isUser ? 'bg-indigo-600' : 'bg-stone-200'
        }`}>
          {isUser ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-stone-600">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          )}
        </div>

        {/* Bubble content */}
        <div className={`flex flex-col`}>
            <div className={`px-5 py-3.5 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm whitespace-pre-wrap ${
              isUser 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-stone-100 rounded-tl-none'
            }`}>
              {message.text}
            </div>

            {/* Sources / Recommendations */}
            {!isUser && message.sources && message.sources.length > 0 && (
              <div className="mt-3 bg-stone-50 rounded-xl p-3 border border-stone-100">
                <p className="text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wide flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.9a.75.75 0 01.76-.04l2 1a.75.75 0 010 1.34l-2 1A.75.75 0 018 10V7.5a.75.75 0 01.39-.66z" clipRule="evenodd" />
                  </svg>
                  관련 자료 및 동영상
                </p>
                <div className="flex flex-col gap-2">
                  {message.sources.map((source, idx) => {
                    const videoId = getYouTubeId(source.uri);
                    
                    if (videoId && onPlayVideo) {
                      return (
                        <button 
                          key={idx}
                          onClick={() => onPlayVideo(videoId)}
                          className="text-xs md:text-sm text-indigo-600 hover:text-indigo-800 hover:underline flex items-start gap-2 transition-colors text-left"
                        >
                          <span className="mt-0.5 flex-shrink-0 text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span>{source.title} (동영상 재생)</span>
                        </button>
                      );
                    }

                    return (
                      <a 
                        key={idx} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs md:text-sm text-indigo-600 hover:text-indigo-800 hover:underline flex items-start gap-2 transition-colors"
                      >
                        <span className="mt-0.5 text-gray-400">•</span>
                        <span>{source.title}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* "Find More" Suggestion Button */}
            {!isUser && !isSystemError && onSuggestionClick && (
              <button
                onClick={() => onSuggestionClick("방금 말씀하신 내용과 관련된 대행스님의 법문이나 동영상을 더 찾아주세요.")}
                className="mt-3 ml-1 text-xs font-medium text-amber-800 bg-white hover:bg-amber-50 border border-amber-200 hover:border-amber-300 px-4 py-2 rounded-full transition-all shadow-sm flex items-center gap-2 w-fit group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-600 group-hover:text-amber-700">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
                연관 법문 더 찾기
              </button>
            )}
            
            <span className={`text-[10px] mt-1 text-gray-400 ${isUser ? 'text-right' : 'text-left'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
        </div>
      </div>
    </div>
  );
};
