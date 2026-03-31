import { useState } from "react"
import { motion } from "framer-motion"
import { Image, Zap, Music, Video, HardDrive, Users, Send } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProfileContent() {
  const [activeTab, setActiveTab] = useState('activity');
  const [postText, setPostText] = useState("");

  const tabs = [
    { id: 'activity', label: 'Activity', icon: Zap },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'gear', label: 'Gear', icon: HardDrive },
    { id: 'bands', label: 'Bands', icon: Users },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* What's New? Post Box */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden group focus-within:border-white/10 transition-all">
        <div className="p-6">
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                 <img src="/travis-scott.jpg" alt="User" className="w-full h-full object-cover grayscale" />
              </div>
              <textarea 
                placeholder="What's new?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="w-full bg-transparent border-none outline-none resize-none text-white text-sm font-medium tracking-tight h-20 placeholder:text-zinc-600 focus:placeholder:text-zinc-400 transition-colors py-2 uppercase tracking-widest placeholder:lowercase"
              />
           </div>
        </div>
        
        <div className="flex items-center justify-between px-6 py-4 bg-white/[0.01] border-t border-white/5">
           <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 group/icon text-zinc-500 hover:text-white transition-colors cursor-pointer">
                 <Image size={18} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Media</span>
              </button>
              <button className="flex items-center gap-2 group/icon text-zinc-500 hover:text-white transition-colors cursor-pointer">
                 <Zap size={18} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Boost</span>
              </button>
           </div>
           
           <button 
             disabled={!postText.trim()}
             className={cn(
               "flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
               postText.trim() ? "bg-white text-black hover:scale-105" : "bg-white/5 text-zinc-600 cursor-not-allowed"
             )}
           >
              <Send size={14} />
              <span>Post</span>
           </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-white/5 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
               "px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 relative",
               activeTab === tab.id ? "text-white border-white scale-105" : "text-zinc-600 border-transparent hover:text-zinc-400"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="profile-tab-glow" className="absolute inset-0 bg-white/5 -z-10 blur-xl" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area (Feed) */}
      <div className="py-12 flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center group hover:bg-white/[0.05] transition-all">
           <Music className="text-zinc-600 group-hover:text-white group-hover:scale-110 transition-all" size={32} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white mix-blend-difference">It's time to make music</h2>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">Watch your activity feed fill up once you start publishing revisions and posts.</p>
        </div>
        
        <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
           Get Started
        </button>
      </div>
    </div>
  );
}
