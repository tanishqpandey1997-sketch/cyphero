import { 
  Mic2, 
  Users, 
  MapPin, 
  Clock, 
  Music,
  Video, 
  Star,
  Plus,
  Play,
  Heart,
  MessageSquare,
  Share2,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  Radio,
  Gamepad,
  Search,
  Filter,
  CheckCircle2
} from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { SharedHeader } from "@/components/ui/shared-header"

// --- Types ---

interface Session {
  id: string;
  title: string;
  host: string;
  genre: string;
  status: 'live' | 'upcoming';
  viewers?: number;
  date?: string;
  time?: string;
  location: string;
  coverImage: string;
}

const MOCK_SESSIONS: Session[] = [
  {
    id: "s1",
    title: "Late Night Jazz Fusion & Improvisation",
    host: "Marcus Keys",
    genre: "Jazz Fusion",
    status: 'live',
    viewers: 1240,
    location: "Virtual Stage 3",
    coverImage: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: "s2",
    title: "Underground Drill Beat Cook-up 🎹",
    host: "D-Vibe",
    genre: "Hip-Hop / Drill",
    status: 'live',
    viewers: 850,
    location: "Studio-X Live",
    coverImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: "s3",
    title: "Vocals & Loops: Experimental Pop",
    host: "Sarah Soul",
    genre: "Experimental Pop",
    status: 'upcoming',
    date: "Oct 12",
    time: "8:00 PM",
    location: "The Cloud Lounge",
    coverImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2940&auto=format&fit=crop"
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Sessions', icon: Radio },
  { id: 'music', label: 'Music Only', icon: Music },
  { id: 'creative', label: 'Creative Chat', icon: MessageSquare },
  { id: 'gaming', label: 'Gaming / Music', icon: Gamepad },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
];

export function OpenMicsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const currentSession = MOCK_SESSIONS[currentSessionIndex];

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden selection:bg-white/20">
      
      <SharedHeader activeIndex={3} />

      <main className="flex flex-1 overflow-hidden pt-28">
        {/* Left Sidebar - High Fidelity Navigation */}
        <div className="w-80 hidden xl:flex flex-col p-8 border-r border-white/5 bg-black/20 backdrop-blur-md">
          <div className="space-y-4">
            <h2 className="px-4 text-[10px] font-black uppercase text-zinc-500 tracking-[0.4em] mb-6">Categories</h2>
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
          
          <button className="mt-auto flex items-center justify-center gap-2 bg-white text-black py-4 rounded-3xl font-black hover:bg-zinc-200 transition-all text-xs uppercase tracking-widest active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
            <Plus size={18} />
            <span>Host Session</span>
          </button>
        </div>
        
        {/* Interactive Session Stage */}
        <div className="flex-1 flex overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSession.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden"
            >
              {/* Main Content Area */}
              <div className="flex-1 relative flex flex-col items-center justify-center p-8 overflow-hidden h-full">
                {/* Backdrop with Dynamic Gradient */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-[120px] opacity-20 scale-125 pointer-events-none transition-all duration-1000"
                  style={{ backgroundImage: `url(${currentSession.coverImage})` }}
                />
                
                {/* Immersive Glass Card */}
                <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
                  <motion.div className="relative group perspective-1000">
                    <div className="absolute inset-0 bg-white/10 blur-2xl rounded-[32px] opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                    <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:rotate-y-6">
                        <img src={currentSession.coverImage} alt={currentSession.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        
                        {/* Status Badge */}
                        <div className="absolute top-6 left-6 flex items-center gap-2">
                             <div className={cn(
                                 "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border",
                                 currentSession.status === 'live' ? "bg-red-500/80 border-red-400 text-white" : "bg-white/10 border-white/20 text-white"
                             )}>
                                 {currentSession.status === 'live' ? <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE NOW</span> : 'UPCOMING'}
                             </div>
                        </div>

                        {/* Viewers Counter */}
                        {currentSession.status === 'live' && (
                             <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/5">
                                 <Users size={12} className="text-white/60" />
                                 <span className="text-[10px] font-bold text-white/90">{currentSession.viewers?.toLocaleString()}</span>
                             </div>
                        )}
                    </div>
                  </motion.div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                        <span className="text-zinc-500 font-black tracking-[0.4em] text-[10px] uppercase block">{currentSession.genre}</span>
                        <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter leading-[0.9] uppercase drop-shadow-2xl">{currentSession.title}</h1>
                        <div className="flex items-center gap-4 pt-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Host</span>
                                <span className="text-sm font-black italic">{currentSession.host}</span>
                                <CheckCircle2 size={14} className="text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm space-y-1">
                            <div className="flex items-center gap-2 text-zinc-500 uppercase tracking-widest text-[9px] font-black mb-1">
                                <MapPin size={10} /> Location
                            </div>
                            <span className="text-sm font-black tracking-tight">{currentSession.location}</span>
                        </div>
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm space-y-1">
                            <div className="flex items-center gap-2 text-zinc-500 uppercase tracking-widest text-[9px] font-black mb-1">
                                <Clock size={10} /> Time
                            </div>
                            <span className="text-sm font-black tracking-tight">{currentSession.status === 'live' ? 'CURRENTLY OPEN' : `${currentSession.date} • ${currentSession.time}`}</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 bg-white text-black py-5 rounded-[24px] font-black uppercase text-xs tracking-[0.2em] shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                            <Video size={18} fill="black" />
                            {currentSession.status === 'live' ? 'Join Stage' : 'Remind Me'}
                        </button>
                    </div>
                  </div>
                </div>

                {/* Local Nav Arrows */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                  <button 
                    onClick={() => setCurrentSessionIndex(prev => (prev === 0 ? MOCK_SESSIONS.length - 1 : prev - 1))}
                    className="p-5 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all backdrop-blur-xl group"
                  >
                    <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setCurrentSessionIndex(prev => (prev === MOCK_SESSIONS.length - 1 ? 0 : prev + 1))}
                    className="p-5 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all backdrop-blur-xl group"
                  >
                    <ChevronDown size={24} className="group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
