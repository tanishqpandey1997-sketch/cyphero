import { 
  Heart, 
  MessageCircle, 
  Share2, 
  CheckCircle2, 
  Music2, 
  Flame, 
  LayoutGrid, 
  Radio, 
  ChevronUp, 
  ChevronDown,
  Star
} from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { SharedHeader } from "@/components/ui/shared-header"
import AudioPlayer from "@/components/ui/audio-player"

// --- Mock Data ---

const MOCK_POSTS = [
  {
    id: "1",
    artist: "STUDIO_X",
    artistAvatar: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2940&auto=format&fit=crop",
    title: "MIDNIGHT CHASE",
    genre: "Synthwave",
    likes: "124K",
    commentsCount: "3.2K",
    caption: "Latest track from the upcoming 'NEON NIGHTS' album. Vibes for the late night drive. 🌌🏎️",
    coverArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2940&auto=format&fit=crop",
    comments: [
      { id: "c1", user: "BeatMaker99", text: "That bassline is absolutely filth! 🔥", likes: 124, avatar: "https://picsum.photos/seed/1/100/100", time: "2h" },
      { id: "c2", user: "SynthQueen", text: "The atmosphere here is incredible. Truly cyberpunk.", likes: 89, avatar: "https://picsum.photos/seed/2/100/100", time: "5h" }
    ]
  },
  {
    id: "2",
    artist: "ECHO_DRIFT",
    artistAvatar: "https://images.unsplash.com/photo-1514525253361-bee8a187c473?q=80&w=2864&auto=format&fit=crop",
    title: "LOFI RAIN",
    genre: "Lofi Hip-Hop",
    likes: "85K",
    commentsCount: "1.5K",
    caption: "Rainy days were made for this. New lofi chill out session now live. ☕️🌧️",
    coverArt: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2940&auto=format&fit=crop",
    comments: [
      { id: "c3", user: "ChillVibes", text: "Perfect study music.", likes: 56, avatar: "https://picsum.photos/seed/3/100/100", time: "1h" },
      { id: "c4", user: "RainLover", text: "The sound of the rain is so realistic.", likes: 32, avatar: "https://picsum.photos/seed/4/100/100", time: "10m" }
    ]
  }
];

const CATEGORIES = [
  { id: 'for-you', label: 'For You', icon: Star },
  { id: 'trending', label: 'Trending', icon: Flame },
  { id: 'new', label: 'New Releases', icon: Music2 },
  { id: 'communities', label: 'Communities', icon: LayoutGrid },
  { id: 'live', label: 'Live Sessions', icon: Radio },
];

export function DiscoverPage() {
  const [activeCategory, setActiveCategory] = useState("for-you");
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const currentPost = MOCK_POSTS[currentPostIndex];

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden selection:bg-white/20">
      
      <SharedHeader activeIndex={2} />

      <main className="flex flex-1 overflow-hidden pt-28">
        {/* Left Sidebar - Discovery Navigation */}
        <div className="w-80 hidden xl:flex flex-col p-8 border-r border-white/5 bg-black/20 backdrop-blur-md">
          <div className="space-y-4">
            <h2 className="px-4 text-[10px] font-black uppercase text-zinc-500 tracking-[0.4em] mb-6">Discovery</h2>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                    "w-full flex items-center gap-5 px-6 py-4 rounded-[24px] transition-all group relative overflow-hidden",
                    activeCategory === cat.id 
                    ? "bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.1)]" 
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                )}
              >
                <cat.icon size={20} className={cn(
                    "transition-colors",
                    activeCategory === cat.id ? "text-black" : "group-hover:text-white"
                )} />
                <span className="text-sm uppercase tracking-widest font-bold">{cat.label}</span>
              </button>
            ))}
          </div>
          
          {/* Pro Upgrade Card (Subtle) */}
          <div className="mt-auto p-8 rounded-[40px] bg-white/5 border border-white/10 group cursor-pointer hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                  <Flame size={24} fill="currentColor" />
               </div>
               <div>
                  <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Upgrade to</h3>
                  <p className="text-sm font-black italic uppercase tracking-tighter">Pro Plus</p>
               </div>
            </div>
            <button className="w-full py-3 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-transform">Get Started</button>
          </div>
        </div>

        {/* Central Immersive Feed Area */}
        <div className="flex-1 flex overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPost.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden"
            >
              {/* Immersive Background Blur */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-[120px] opacity-20 scale-125 pointer-events-none transition-all duration-1000"
                style={{ backgroundImage: `url(${currentPost.coverArt})` }}
              />

              {/* Main Visual Content */}
              <div className="flex-1 relative flex flex-col items-center justify-center p-8 overflow-hidden h-full z-10">
                <div className="relative w-full max-w-lg aspect-square group">
                  <motion.div 
                    layoutId={`cover-${currentPost.id}`}
                    className="absolute inset-0 rounded-[48px] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                  >
                    <img src={currentPost.coverArt} alt={currentPost.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    
                    {/* Integrated Audio Player Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
                      <AudioPlayer 
                        src="https://ui.webmakers.studio/audio/ncs.mp3"
                        cover={currentPost.coverArt}
                        title={currentPost.title}
                      />
                    </div>
                  </motion.div>

                  {/* Local Info (Vertical) */}
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap">
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">{currentPost.genre} • PREVIEW MODE</span>
                  </div>
                </div>

                <div className="mt-12 text-center space-y-3">
                  <h2 className="text-4xl lg:text-6xl font-black italic tracking-tighter leading-none uppercase drop-shadow-2xl">{currentPost.title}</h2>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-lg font-black text-white/90">{currentPost.artist}</span>
                    <CheckCircle2 size={16} className="text-blue-400 fill-blue-400/20" />
                  </div>
                </div>

                {/* Local Nav Arrows */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                  <button 
                    onClick={() => setCurrentPostIndex(prev => (prev === 0 ? MOCK_POSTS.length - 1 : prev - 1))}
                    className="p-5 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all backdrop-blur-xl group"
                  >
                    <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setCurrentPostIndex(prev => (prev === MOCK_POSTS.length - 1 ? 0 : prev + 1))}
                    className="p-5 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all backdrop-blur-xl group"
                  >
                    <ChevronDown size={24} className="group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Sidebar Interaction Panel */}
              <div className="w-full lg:w-[480px] flex flex-col bg-zinc-950/40 backdrop-blur-3xl border-l border-white/5 h-full overflow-hidden z-20">
                <div className="p-8 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10">
                      <img src={currentPost.artistAvatar} alt={currentPost.artist} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black uppercase tracking-widest">{currentPost.artist}</span>
                        <CheckCircle2 size={14} className="text-blue-400" />
                      </div>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Follow for more</span>
                    </div>
                  </div>
                  <button className="px-8 py-3 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                    Follow
                  </button>
                </div>

                {/* Caption Section */}
                <div className="p-8 border-b border-white/5 bg-white/5">
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium italic">
                    "{currentPost.caption}"
                  </p>
                  <div className="mt-6 flex items-center gap-6">
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <Heart size={18} className="text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-black tracking-widest">{currentPost.likes}</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <MessageCircle size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
                      <span className="text-xs font-black tracking-widest">{currentPost.commentsCount}</span>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar custom-scrollbar">
                  <h3 className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em] mb-4">Comments</h3>
                  {currentPost.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 group">
                      <div className="w-10 h-10 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all border border-white/5">
                         <img src={comment.avatar} alt={comment.user} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-tight text-zinc-300">{comment.user}</span>
                          <span className="text-[9px] text-zinc-600 font-bold">{comment.time}</span>
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed font-medium">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Interaction Bar */}
                <div className="p-6 border-t border-white/5 bg-black/40">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Add a comment..." 
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-6 pr-14 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/10 transition-all placeholder:text-zinc-700"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-zinc-600 hover:text-white transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
