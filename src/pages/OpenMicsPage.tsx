import { LimelightNav } from "@/components/ui/limelight-nav"
import { 
  Users,
  Mic2,
  Flame,
  Music,
  Radio,
  Clock,
  Plus,
  ChevronUp,
  ChevronDown,
  Calendar,
  MapPin,
  MoreHorizontal,
  CheckCircle2,
  Video
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

// --- Types ---

interface OpenMicSession {
  id: string;
  title: string;
  host: string;
  hostAvatar: string;
  coverImage: string;
  status: 'live' | 'upcoming' | 'completed';
  genre: string;
  viewers?: number;
  date?: string;
  time?: string;
  location?: string; // Virtual or Physical
}

// --- Mock Data ---

const MOCK_SESSIONS: OpenMicSession[] = [
  {
    id: '1',
    title: 'THE UNDERGROUND CYPHER #42',
    host: 'ZEPHYR',
    hostAvatar: 'https://picsum.photos/seed/zephyr/100/100',
    coverImage: 'https://images.unsplash.com/photo-1514525253361-bee8a187c473?q=80&w=2864&auto=format&fit=crop',
    status: 'live',
    genre: 'HARDCORE RAP',
    viewers: 1240,
    location: 'VIRTUAL STAGE 1'
  },
  {
    id: '2',
    title: 'SUFI NIGHTS: OPEN SOUL',
    host: 'ALIF',
    hostAvatar: 'https://picsum.photos/seed/alif/100/100',
    coverImage: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2940&auto=format&fit=crop',
    status: 'live',
    genre: 'SUFI/FUSION',
    viewers: 850,
    location: 'VIRTUAL STAGE 3'
  },
  {
    id: '3',
    title: 'GAZAL & CHAI (VIRTUAL)',
    host: 'MEER',
    hostAvatar: 'https://picsum.photos/seed/meer/100/100',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2940&auto=format&fit=crop',
    status: 'upcoming',
    genre: 'GAZALS',
    date: 'MAR 31',
    time: '09:00 PM',
    location: 'ONLINE EVENT'
  },
  {
    id: '4',
    title: 'BEATBOX BATTLE: SEMIS',
    host: 'B-BASS',
    hostAvatar: 'https://picsum.photos/seed/bbass/100/100',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2940&auto=format&fit=crop',
    status: 'upcoming',
    genre: 'BEATBOXING',
    date: 'APR 02',
    time: '10:00 PM',
    location: 'BLUE ROOM'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Sessions', icon: Users },
  { id: 'live', label: 'Live Now', icon: Flame },
  { id: 'rap', label: 'Rap/Cyphers', icon: Mic2 },
  { id: 'sufi', label: 'Sufi Soul', icon: Radio },
  { id: 'gazals', label: 'Gazals', icon: Music },
  { id: 'upcoming', label: 'Upcoming', icon: Calendar },
];

export function OpenMicsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const currentSession = MOCK_SESSIONS[currentSessionIndex];
  
  const lastScrollTime = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return;

      if (Math.abs(e.deltaY) > 50) {
        lastScrollTime.current = now;
        if (e.deltaY > 0) {
          setCurrentSessionIndex(prev => (prev === MOCK_SESSIONS.length - 1 ? 0 : prev + 1));
        } else {
          setCurrentSessionIndex(prev => (prev === 0 ? MOCK_SESSIONS.length - 1 : prev - 1));
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', onClick: () => navigate('/dashboard') },
    { id: 'about-us', label: 'About Us', onClick: () => navigate('/about') },
    { id: 'discover', label: 'Discover', onClick: () => navigate('/discover') },
    { id: 'open-mics', label: 'Open Mics', onClick: () => navigate('/open-mics') },
    { id: 'communities', label: 'Communities', onClick: () => navigate('/communities') },
    { id: 'song-feed', label: 'Song Feed' },
    { id: 'beat-market', label: 'Beat Market' },
    { id: 'my-studio', label: 'My Studio' },
  ];

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden selection:bg-white/20">
      
      {/* Shared Glass Header */}
      <div className="w-full mx-auto px-6 md:px-12 py-5 flex justify-between items-center z-[100] fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-xl border-b border-white/5 flex-wrap gap-4 transition-all duration-300">
         <div className="flex items-center">
             <img 
                 src="/cypherlogo 1.svg" 
                 alt="Cypher Connect" 
                 className="w-12 h-12 md:w-14 md:h-14 object-contain grayscale brightness-[5] contrast-[1.2] drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all cursor-pointer hover:scale-105" 
             />
         </div>
         
         <div className="hidden lg:flex items-center justify-center flex-1">
            <LimelightNav items={navItems} defaultActiveIndex={3} />
         </div>

         <div className="flex items-center gap-4">
             <div className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all backdrop-blur-md group">
                <Mic2 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
             </div>
         </div>
      </div>

      <main className="flex flex-1 overflow-hidden pt-28">
        {/* Glass Sidebar */}
        <div className="w-64 hidden md:flex flex-col gap-4 p-6 border-r border-white/5 h-full bg-black/20 backdrop-blur-sm">
          <div className="flex flex-col gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group",
                  activeCategory === cat.id 
                    ? "bg-white text-black font-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
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
          
          <button className="mt-4 flex items-center justify-center gap-2 bg-white text-black py-4 rounded-3xl font-black hover:bg-zinc-200 transition-all text-xs uppercase tracking-widest active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
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
