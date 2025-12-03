import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { VideoModal } from './components/VideoModal';
import { PracticeOverlay } from './components/PracticeOverlay';
import { Message, Source } from './types';
import { sendMessageToGemini } from './services/geminiService';

const INITIAL_MESSAGE: Message = {
  id: 'init-1',
  role: 'model',
  text: '반갑습니다. "한생각의 힘"입니다. \n대행스님의 가르침과 법문을 통해 삶의 지혜를 찾아드립니다. \n어떤 고민이 있으신가요?',
  timestamp: new Date(),
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Prepare history for context (exclude last message which we just added)
      const response = await sendMessageToGemini(text, messages);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        sources: response.sources,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayVideo = (videoId: string) => {
    setCurrentVideoId(videoId);
  };

  const handleCloseVideo = () => {
    setCurrentVideoId(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Header onOpenPractice={() => setIsPracticeOpen(true)} />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-6 pb-32">
        <div className="flex flex-col">
          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              onSuggestionClick={!isLoading ? handleSendMessage : undefined}
              onPlayVideo={handlePlayVideo}
            />
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-6 w-full">
               <div className="flex flex-row gap-3">
                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center shadow-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-stone-600">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                 </div>
                 <div className="px-5 py-4 bg-white rounded-2xl rounded-tl-none border border-stone-100 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-200"></span>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      
      {currentVideoId && (
        <VideoModal videoId={currentVideoId} onClose={handleCloseVideo} />
      )}

      {isPracticeOpen && (
        <PracticeOverlay onClose={() => setIsPracticeOpen(false)} />
      )}
    </div>
  );
};

export default App;