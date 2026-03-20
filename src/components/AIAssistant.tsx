'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

type QuickAction = string;

const BOT_DELAY = 800;
const TYPING_DELAY = 1200;

export function AIAssistant() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', text: 'Hi there. I’m the Mentivo AI Guide.' },
    { id: '2', role: 'assistant', text: 'How can I help you find clarity today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([
    'How does this work?',
    'Help me choose',
    'Is my data private?',
    'Show sample result'
  ]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Listen for global toggle and initialize from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mentivo-ai-enabled');
      if (stored !== null) {
        setIsEnabled(stored === 'true');
      }
    }

    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setIsEnabled(customEvent.detail);
      if (!customEvent.detail) {
        setIsOpen(false);
        setShowTooltip(false);
      }
    };

    window.addEventListener('mentivo-ai-toggle', handleToggle);
    return () => window.removeEventListener('mentivo-ai-toggle', handleToggle);
  }, []);

  // Idle timer for tooltip
  useEffect(() => {
    if (isOpen || !isEnabled) {
      setShowTooltip(false);
      return;
    }
    
    // Show tooltip after 12s of inactivity if not open and not previously interacted/shown
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('mentivo-ai-tooltip-shown') === 'true' || 
          localStorage.getItem('mentivo-ai-used') === 'true') {
        return;
      }
    }

    const timeout = setTimeout(() => {
      setShowTooltip(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('mentivo-ai-tooltip-shown', 'true');
      }
    }, 12000);

    return () => clearTimeout(timeout);
  }, [isOpen, isEnabled]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const simulateBotResponse = async (texts: string[], nextActions: string[]) => {
    setQuickActions([]);
    setIsTyping(true);

    for (let i = 0; i < texts.length; i++) {
      await new Promise(r => setTimeout(r, i === 0 ? BOT_DELAY : TYPING_DELAY));
      
      setMessages(prev => [...prev, { 
        id: Date.now().toString() + i, 
        role: 'assistant', 
        text: texts[i] 
      }]);
    }
    
    setIsTyping(false);
    if (nextActions.length > 0) {
      setQuickActions(nextActions);
    }
  };

  const handleAction = (action: string) => {
    if (isTyping) return;
    if (typeof window !== 'undefined') {
      localStorage.setItem('mentivo-ai-used', 'true');
    }

    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: action }]);
    setQuickActions([]);

    // Route conversation
    if (action === 'How does this work?') {
      simulateBotResponse([
        "You’ll answer a short structured assessment.",
        "We analyze your strengths and interests.",
        "You receive stream and career suggestions.",
        "Would you like to see a sample recommendation?"
      ], ["Yes, show me", "Help me choose"]);
    } 
    else if (action === 'Help me choose') {
      simulateBotResponse([
        "Let’s begin with something simple — which subjects do you naturally enjoy?"
      ], ["Mathematics", "Science", "Business", "Arts", "I’m not sure"]);
    }
    else if (action === 'I’m not sure') {
      simulateBotResponse([
        "That’s completely normal. Let’s look at the kind of activities you enjoy instead.",
        "Do you prefer analytical problem-solving or creative expression?"
      ], ["Analytical problem-solving", "Creative expression"]);
    }
    else if (action === 'Analytical problem-solving') {
      simulateBotResponse([
        "That suggests you may feel comfortable in fields that value structured thinking.",
        "Would you like to explore specific degree paths?"
      ], ["Yes, let's explore"]);
    }
    else if (action === 'Is my data private?') {
      simulateBotResponse([
        "Yes. Your responses are processed securely.",
        "We don’t share or sell personal data.",
        "The goal is guidance — nothing more."
      ], ["How does this work?", "Help me choose"]);
    }
    else if (action === 'Show sample result' || action === 'Yes, show me') {
      simulateBotResponse([
        "Based on analytical and logical preferences, a Technology-focused path may align well.",
        "Possible directions include Computer Science or Engineering.",
        "This is exploratory, not permanent.",
        "Would you like to begin your own assessment?"
      ], ["Begin Assessment"]);
    }
    else if (action === 'Begin Assessment') {
      simulateBotResponse([
        "Excellent. Let's go step by step.",
        "Redirecting you to the assessment..."
      ], []);
      setTimeout(() => {
        setIsOpen(false);
        router.push('/assessment');
      }, 1500);
    }
    else {
      // Generic fallback
      simulateBotResponse([
        "We can explore this together.",
        "Let's focus on narrowing things down gradually."
      ], ["Help me choose", "How does this work?"]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    
    handleAction(inputValue.trim());
    setInputValue('');
  };

  if (!isEnabled) return null;

  return (
    <>
      {/* Floating Button Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
        
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('mentivo-ai-tooltip-shown', 'true');
                }
              }}
              className="bg-white px-4 py-2.5 rounded-2xl shadow-lg border border-[var(--color-border-light)] pointer-events-auto cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <span className="text-sm font-medium text-[#0F172A]">Need help getting started?</span>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-b border-r border-[var(--color-border-light)] transform rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating AI Button Element */}
        <button
          onClick={() => {
            setIsOpen(true);
            setShowTooltip(false);
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('mentivo-ai-tooltip-shown', 'true');
            }
          }}
          className={`relative w-[72px] h-[72px] rounded-full bg-white border border-[#E2E8F0] shadow-[0_4px_12px_rgba(15,23,42,0.08),0_1px_2px_rgba(15,23,42,0.05)] flex items-center justify-center cursor-pointer pointer-events-auto transition-all duration-300 hover:scale-[1.05] group overflow-hidden ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
          style={{ animation: 'premiumFloat 5s ease-in-out infinite' }}
          aria-label="Open AI Assistant"
        >
          {/* Subtle Halo via pseudo-element equivalent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] rounded-full -z-10 bg-[radial-gradient(rgba(37,99,235,0.15),transparent_70%)]" />

          {/* Avatar Image (Framed and Cropped via Object Fit) */}
          <img 
            src="/girl-avatar.png" 
            alt="Mentivo AI Guide" 
            className="w-[85%] h-auto object-cover rounded-full"
            style={{ 
              filter: 'none', // Removed desaturation for the character image
            }}
          />
        </button>
      </div>

      {/* Slide-in Help Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Dimming when panel active */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="fixed inset-0 bg-slate-900/[0.03] backdrop-blur-[1px] z-[55] md:bg-transparent md:backdrop-blur-none"
            />
            
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 h-[85vh] md:h-full md:w-[360px] md:top-0 md:left-auto md:bottom-auto bg-white md:border-l border-[#E2E8F0] shadow-2xl z-[60] flex flex-col rounded-t-3xl md:rounded-none overflow-hidden"
              // Desktop override: slide from right
              style={{
                ...((typeof window !== 'undefined' && window.innerWidth >= 768) ? {
                  transform: 'translateX(100%)', // Handled by Framer on init, but we override animation setup
                } : {})
              }}
            >
              {/* Desktop slide-in animation override */}
              <style jsx>{`
                @media (min-width: 768px) {
                   :global(.desktop-panel-slide) {
                      animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
                   }
                   :global(.desktop-panel-slide.exit) {
                      animation: slideOutRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
                   }
                }
                @keyframes slideInRight {
                  from { transform: translateX(100%); }
                  to { transform: translateX(0); }
                }
                @keyframes slideOutRight {
                  from { transform: translateX(0); }
                  to { transform: translateX(100%); }
                }
                @keyframes premiumFloat {
                  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); }
                  25% { transform: translateY(-2px) translateX(0.5px) rotate(0.1deg) scale(1.005); }
                  50% { transform: translateY(-3px) translateX(0px) rotate(0.2deg) scale(1.015); }
                  75% { transform: translateY(-1.5px) translateX(-0.5px) rotate(0.1deg) scale(1.005); }
                }
                @keyframes haloPulse {
                  0%, 100% { opacity: 0.8; transform: scale(1); }
                  50% { opacity: 1; transform: scale(1.05); }
                }
                @keyframes typingBounce {
                  0%, 100% { transform: translateY(0); opacity: 0.4; }
                  50% { transform: translateY(-4px); opacity: 1; }
                }
              `}</style>
              
              <div className={`flex-1 flex flex-col h-full ${isOpen ? 'desktop-panel-slide' : 'desktop-panel-slide exit'}`}>
                
                {/* Panel Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9] bg-white relative">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-50 to-slate-50 border border-teal-100/50 flex items-center justify-center p-0.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] overflow-hidden">
                       <img src="/girl-avatar.png" alt="Mentivo AI Guide" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#0F172A] leading-tight flex items-center gap-2">
                        Mentivo Guide
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-900 shadow-[0_0_4px_rgba(16,185,129,0.4)] animate-pulse" />
                        <span className="text-[12px] text-[#64748B] font-medium leading-none">Online</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5 bg-white scroll-smooth relative">
                   <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-transparent to-transparent h-4 z-10" />
                   
                   <AnimatePresence initial={false}>
                      {messages.map((msg) => (
                         <motion.div 
                           key={msg.id}
                           initial={{ opacity: 0, y: 12, scale: 0.98 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           transition={{ type: "spring", damping: 25, stiffness: 300 }}
                           className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[88%] ${msg.role === 'user' ? 'self-end' : 'self-start'}`}
                         >
                            <div className={`px-4 py-3 text-[14px] leading-[1.6] ${
                               msg.role === 'user' 
                               ? 'bg-[#EFF6FF] text-[#0F172A] rounded-[14px] rounded-br-sm border border-teal-100/50 shadow-[0_1px_2px_rgba(37,99,235,0.02)]' 
                               : 'bg-white text-[#0F172A] rounded-[14px] rounded-bl-sm border border-[#F1F5F9] shadow-[0_2px_8px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)]'
                            }`}>
                               {msg.text}
                            </div>
                         </motion.div>
                      ))}
                   </AnimatePresence>
                   
                   {/* Typing Indicator */}
                   {isTyping && (
                      <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="self-start bg-white border border-[#F1F5F9] px-4 py-3.5 rounded-[14px] rounded-bl-sm shadow-[0_2px_8px_rgba(15,23,42,0.04)] flex gap-1.5 items-center mt-1"
                      >
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-300" style={{ animation: 'typingBounce 1.4s infinite cubic-bezier(0.4, 0, 0.2, 1)' }} />
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-300" style={{ animation: 'typingBounce 1.4s infinite cubic-bezier(0.4, 0, 0.2, 1) 0.15s' }} />
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-300" style={{ animation: 'typingBounce 1.4s infinite cubic-bezier(0.4, 0, 0.2, 1) 0.3s' }} />
                      </motion.div>
                   )}
                   
                   <div ref={messagesEndRef} className="h-2" />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-[#E2E8F0]">
                   
                   {/* Quick Actions */}
                   <AnimatePresence>
                      {quickActions.length > 0 && !isTyping && (
                         <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-wrap gap-2 mb-4"
                         >
                            {quickActions.map((action, idx) => (
                               <button
                                 key={idx}
                                 onClick={() => handleAction(action)}
                                 className="text-[13px] font-medium px-4 py-2 border border-[#E2E8F0] rounded-full text-[#475569] hover:bg-teal-50 hover:text-emerald-950 hover:border-teal-200 transition-colors text-left"
                               >
                                  {action}
                               </button>
                            ))}
                         </motion.div>
                      )}
                   </AnimatePresence>

                   <form onSubmit={handleSubmit} className="flex gap-2">
                      <input 
                         type="text" 
                         value={inputValue}
                         onChange={(e) => setInputValue(e.target.value)}
                         placeholder="Ask me about streams, careers..."
                         className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full px-5 py-3 text-[14px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-emerald-950/20 focus:border-emerald-950 transition-all placeholder:text-[#94A3B8]"
                      />
                      <button 
                         type="submit"
                         disabled={!inputValue.trim() || isTyping}
                         className="w-12 h-12 rounded-full bg-[#059669] flex items-center justify-center text-white flex-shrink-0 hover:bg-[#047857] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                         <Send className="w-4 h-4" />
                      </button>
                   </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
