import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  X, 
  Send, 
  Mic2, 
  Users,
  Music
} from 'lucide-react';
import { useCypherBot } from '@/context/CypherBotContext';
import { cn } from '@/lib/utils';

export function CypherBotPanel() {
  const { isOpen, setIsOpen, messages, sendMessage, isTyping } = useCypherBot();
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const content = inputValue;
    setInputValue('');
    await sendMessage(content);
  };

  const handleQuickAction = (action: string) => {
    sendMessage(`I want to ${action.toLowerCase()}. Can you help?`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] z-[60] p-4 pointer-events-none">
       <motion.div 
         initial={{ x: '100%', opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         exit={{ x: '100%', opacity: 0 }}
         transition={{ type: 'spring', damping: 25, stiffness: 200 }}
         className="w-full h-full bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto overflow-hidden relative"
       >
          {/* Header */}
          <div className="p-8 flex items-center justify-between border-b border-white/5 relative z-10">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group animate-pulse">
                   <Bot size={24} className="text-white group-hover:scale-110 transition-transform" />
                </div>
                <div>
                   <h2 className="text-lg font-black uppercase tracking-widest italic leading-none">CypherBot</h2>
                   <div className="flex items-center gap-2 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Always Listening</span>
                   </div>
                </div>
             </div>
             <button 
               onClick={() => setIsOpen(false)}
               className="p-3 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-all"
             >
                <X size={20} />
             </button>
          </div>

          {/* Quick Actions */}
          <div className="p-6 bg-white/[0.02] border-b border-white/5 flex gap-4 overflow-x-auto no-scrollbar relative z-10">
             {[
                { label: 'Analyze Mix', icon: Mic2, color: 'text-indigo-400' },
                { label: 'Find Collab', icon: Users, color: 'text-emerald-400' },
                { label: 'Beat Feedback', icon: Music, color: 'text-amber-400' },
             ].map((action, i) => (
                <button 
                   key={i} 
                   onClick={() => handleQuickAction(action.label)}
                   className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all group"
                >
                   <action.icon size={16} className={cn("transition-colors", action.color, "group-hover:text-black")} />
                   <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{action.label}</span>
                </button>
             ))}
          </div>

          {/* Chat Container */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar relative z-10">
             {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={cn("flex flex-col", msg.role === 'user' ? "items-end text-right" : "items-start")}
                >
                   <div className={cn(
                      "max-w-[85%] p-6 rounded-[32px] text-sm leading-relaxed tracking-tight",
                      msg.role === 'user' 
                         ? "bg-white text-black font-medium rounded-tr-sm shadow-xl" 
                         : "bg-white/5 border border-white/10 text-zinc-300 rounded-tl-sm backdrop-blur-xl whitespace-pre-wrap"
                   )}>
                      {msg.content}
                   </div>
                   <span className="text-[8px] text-zinc-700 font-bold uppercase tracking-widest mt-2 px-2">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                </motion.div>
             ))}
             {isTyping && (
                <div className="flex items-start">
                   <div className="bg-white/5 border border-white/10 p-5 rounded-[24px] rounded-tl-sm flex gap-1.5 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" />
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce [animation-delay:0.4s]" />
                   </div>
                </div>
             )}
          </div>

          {/* Input Area */}
          <div className="p-8 border-t border-white/5 bg-black relative z-10">
              <div className="relative group">
                 <textarea 
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                         e.preventDefault();
                         handleSend();
                      }
                   }}
                   placeholder="Ask CypherBot anything..." 
                   className="w-full bg-white/5 border border-white/10 rounded-[32px] py-6 pl-8 pr-16 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/10 transition-all resize-none no-scrollbar h-[72px] placeholder:text-zinc-700"
                 />
                 <button 
                   onClick={handleSend}
                   disabled={!inputValue.trim()}
                   className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-white text-black hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-50 disabled:scale-100"
                 >
                    <Send size={18} />
                 </button>
              </div>
              <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-[0.2em] text-center mt-6">
                 CYPHERBOT x GEMINI • ACTIVE SOUND
              </p>
          </div>

          {/* Decorative mesh bg */}
          <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
          </div>
       </motion.div>
    </div>
  );
}

export function CypherBotFAB({ onClick }: { onClick: () => void }) {
   return (
      <motion.button 
         whileHover={{ scale: 1.1, rotate: 5 }}
         whileTap={{ scale: 0.9 }}
         onClick={onClick}
         className="fixed bottom-10 right-10 z-[55] w-20 h-20 bg-white rounded-[32px] flex items-center justify-center shadow-[0_20px_50px_rgba(255,255,255,0.2)] text-black group transition-all"
         title="Open CypherBot"
      >
         <Bot size={32} className="group-hover:scale-110 transition-transform" />
      </motion.button>
   );
}
