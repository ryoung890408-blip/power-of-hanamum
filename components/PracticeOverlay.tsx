import React from 'react';

interface PracticeOverlayProps {
  onClose: () => void;
}

export const PracticeOverlay: React.FC<PracticeOverlayProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-in slide-in-from-bottom-4 duration-300">
      {/* Header for the overlay */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#FDFBF7] border-b border-amber-200 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-800">하루 5번 관하기</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="닫기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Iframe Container */}
      <div className="flex-1 w-full bg-gray-50 relative">
         <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-0">
            <div className="flex flex-col items-center gap-2">
                <svg className="animate-spin h-6 w-6 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm">수행 페이지를 불러오는 중입니다...</span>
            </div>
         </div>
         <iframe 
            src="https://gwanbeop-daily-practice-406695416863.us-west1.run.app"
            className="absolute inset-0 w-full h-full z-10 border-none bg-white"
            title="Daily Gwanbeop Practice"
            allow="clipboard-write; encrypted-media;"
         />
      </div>
    </div>
  );
};