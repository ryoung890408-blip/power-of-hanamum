import React from 'react';

interface HeaderProps {
  onOpenPractice: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPractice }) => {
  return (
    <header className="bg-amber-100/80 backdrop-blur-md border-b border-amber-200 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white shadow-md flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">한생각의 힘</h1>
            <p className="text-sm md:text-base text-amber-800 font-medium mt-0.5">대행스님의 지혜와 법문 찾기</p>
          </div>
        </div>

        {/* Desktop Button */}
        <button 
          onClick={onOpenPractice}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white text-amber-900 text-sm font-semibold rounded-full border border-amber-200 transition-all shadow-sm hover:shadow active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          하루 5번 관하기
        </button>

        {/* Mobile Icon Button */}
        <button 
          onClick={onOpenPractice}
          className="md:hidden p-2 text-amber-900 bg-white/60 hover:bg-white rounded-full border border-amber-200 shadow-sm active:scale-95"
          aria-label="하루 5번 관하기"
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </button>
      </div>
    </header>
  );
};