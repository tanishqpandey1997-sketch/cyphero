import { LimelightNav } from "@/components/ui/limelight-nav"
import { 
  Mic,
  Music,
  Bird,
  Mic2,
  Flame,
  Music2,
  Disc3,
  Radio,
  Grid,
  Plus,
  ChevronUp,
  ChevronDown,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  CheckCircle2
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import AudioPlayer from "@/components/ui/audio-player"

// --- Types ---
interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}

interface Post {
  id: string;
  title: string;
  artist: string;
  artistAvatar: string;
  coverArt: string;
  caption: string;
  likes: number;
  commentsCount: number;
  comments: Comment[];
  genre: string;
}

// --- Mock Data ---
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'OFF THA WALL (OPEN VERSE CHALLENGE)',
    artist: 'DEVYN!',
    artistAvatar: 'https://picsum.photos/seed/devyn/100/100',
    coverArt: 'https://picsum.photos/seed/cypher1/600/600',
    caption: 'GOOD LUCK 🤞 1st- 5$ & all plats 🔥 2nd- FREE ZAY-TOL X D3VYN COLLAB 💯 3rd- 2 FREE PROMOS 🤙',
    likes: 33,
    commentsCount: 30,
    genre: 'Hip Hop',
    comments: [
      { id: 'c1', user: 'KingKory', avatar: 'https://picsum.photos/seed/user1/100/100', text: 'Hard G!!!! 🔥🔥🔥🔥🔥', time: '1h ago', likes: 1 },
      { id: 'c2', user: 'RAHZOR', avatar: 'https://picsum.photos/seed/user2/100/100', text: 'This is fire bro! 🚀🚀🚀', time: '1h ago', likes: 2 }
    ]
  },
  {
    id: '2',
    title: 'Midnight Cypher',
    artist: 'GhostWriter',
    artistAvatar: 'https://picsum.photos/seed/ghost/100/100',
    coverArt: 'https://picsum.photos/seed/cypher2/600/600',
    caption: 'Late night sessions are the best. Who wants to hop on this beat? #cypher #rap',
    likes: 124,
    commentsCount: 12,
    genre: 'Electronic',
    comments: [
      { id: 'c3', user: 'BeatMaker', avatar: 'https://picsum.photos/seed/user3/100/100', text: 'That bass line is insane.', time: '2h ago', likes: 5 }
    ]
  }
];

const CATEGORIES = [
  { id: 'hot', label: 'Hot Now', icon: Flame },
  { id: 'hiphop', label: 'Hip Hop', icon: Mic2 },
  { id: 'underground', label: 'Underground', icon: Mic },
  { id: 'sufi', label: 'Sufi', icon: Bird },
  { id: 'gazals', label: 'Gazals', icon: Music },
  { id: 'pop', label: 'Pop', icon: Disc3 },
  { id: 'rock', label: 'Rock', icon: Music2 },
  { id: 'electronic', label: 'Electronic', icon: Grid },
];

export function DiscoverPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('hot');
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const currentPost = MOCK_POSTS[currentPostIndex];

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
  const lastScrollTime = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return; // Throttling (1s)

      if (Math.abs(e.deltaY) > 50) {
        lastScrollTime.current = now;
        if (e.deltaY > 0) {
          // Scroll Down
          setCurrentPostIndex(prev => (prev === MOCK_POSTS.length - 1 ? 0 : prev + 1));
        } else {
          // Scroll Up
          setCurrentPostIndex(prev => (prev === 0 ? MOCK_POSTS.length - 1 : prev - 1));
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden selection:bg-white/20">
      
      {/* Shared Header */}
      <div className="w-full mx-auto px-6 md:px-12 py-5 flex justify-between items-center z-[100] fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-xl border-b border-white/5 flex-wrap gap-4 transition-all duration-300">
         <div className="flex items-center">
             <img 
                 src="/cypherlogo 1.svg" 
                 alt="Cypher Connect" 
                 className="w-12 h-12 md:w-14 md:h-14 object-contain grayscale brightness-[5] contrast-[1.2] drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all cursor-pointer hover:scale-105" 
             />
         </div>
         
         <div className="hidden lg:flex items-center justify-center flex-1">
            <LimelightNav items={navItems} defaultActiveIndex={2} />
         </div>

         <div className="flex items-center gap-4">
             <div className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all backdrop-blur-md group">
                <Mic2 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
             </div>
         </div>
      </div>

      <main className="flex flex-1 overflow-hidden pt-28">
        {/* Sidebar */}
        <div className="w-64 hidden md:flex flex-col gap-4 p-6 border-r border-white/5 h-full bg-black/20">
          <div className="flex flex-col gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  activeCategory === cat.id 
                    ? "bg-white text-black font-semibold shadow-lg shadow-white/10" 
                    : "text-zinc-500 hover:bg-white/5 hover:text-white"
                )}
              >
                <cat.icon size={20} className={cn(activeCategory === cat.id ? "text-black" : "text-zinc-500 group-hover:text-white")} />
                <span className="text-sm">{cat.label}</span>
              </button>
            ))}
          </div>
          
          <button className="mt-4 flex items-center justify-center gap-2 bg-white text-black py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors text-sm">
            <Plus size={18} />
            <span>New Post</span>
          </button>
        </div>
        
        {/* Main Feed Content */}
        <div className="flex-1 flex overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPost.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="flex-1 flex flex-col lg:flex-row overflow-hidden"
            >
              {/* Feed Item */}
              <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden h-full">
                {/* Blurred Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-[100px] opacity-20 scale-110 pointer-events-none"
                  style={{ backgroundImage: `url(${currentPost.coverArt})` }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-lg px-4">
                  <motion.div 
                    layoutId={`art-${currentPost.id}`}
                    className="relative aspect-square w-full max-w-[380px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 group"
                  >
                    <img src={currentPost.coverArt} alt={currentPost.title} className="w-full h-full object-cover" />
                    
                    {/* Visualizer bars replaced with interactive player */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
                      <AudioPlayer 
                        src="https://ui.webmakers.studio/audio/ncs.mp3"
                        cover={currentPost.coverArt}
                        title={currentPost.title}
                      />
                    </div>
                  </motion.div>

                  <div className="text-center space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase leading-tight">{currentPost.title}</h2>
                    <div className="flex items-center justify-center gap-2 text-zinc-400">
                      <span className="font-bold text-white text-sm">{currentPost.artist}</span>
                      <CheckCircle2 size={14} className="text-blue-400 fill-blue-400/20" />
                      <span className="text-xs opacity-30">|</span>
                      <span className="text-xs flex items-center gap-1 font-medium tracking-wider">
                        <Music2 size={12} /> {currentPost.genre.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Local Nav Arrows */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                  <button 
                    onClick={() => setCurrentPostIndex(prev => (prev === 0 ? MOCK_POSTS.length - 1 : prev - 1))}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors backdrop-blur-md"
                  >
                    <ChevronUp size={24} />
                  </button>
                  <button 
                    onClick={() => setCurrentPostIndex(prev => (prev === MOCK_POSTS.length - 1 ? 0 : prev + 1))}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors backdrop-blur-md"
                  >
                    <ChevronDown size={24} />
                  </button>
                </div>
              </div>

              {/* Interaction Panel */}
              <div className="w-full lg:w-96 flex flex-col bg-zinc-950/50 backdrop-blur-xl border-l border-white/5 h-full overflow-hidden">
                <div className="p-6 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                      <img src={currentPost.artistAvatar} alt={currentPost.artist} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-sm font-bold truncate max-w-[120px]">
                        {currentPost.artist}
                        <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" />
                      </div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">PRO ARTIST</span>
                    </div>
                  </div>
                  <button className="bg-white text-black px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider hover:bg-zinc-200 transition-all">
                    Follow
                  </button>
                </div>

                <div className="p-6 border-b border-white/5 bg-white/5">
                  <p className="text-xs leading-relaxed text-zinc-400 font-medium italic">
                    "{currentPost.caption}"
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Heart size={16} className="text-red-500 fill-red-500" />
                      <span className="text-xs font-bold">{currentPost.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <MessageCircle size={16} />
                      <span className="text-xs font-bold">{currentPost.commentsCount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar custom-scrollbar">
                  {currentPost.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 group">
                      <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full object-cover grayscale hover:grayscale-0 transition-all" />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-200">{comment.user}</span>
                          <span className="text-[10px] text-zinc-600 uppercase font-bold">{comment.time}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">{comment.text}</p>
                        <div className="flex items-center gap-4 pt-1">
                          <button className="text-[10px] font-bold text-zinc-600 hover:text-white transition-colors">Reply</button>
                          <button className="text-[10px] font-bold text-zinc-600 hover:text-red-400 flex items-center gap-1 transition-colors">
                            <Heart size={10} /> {comment.likes}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-white/5 bg-black/80 backdrop-blur-md">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Show your support..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-white/20 transition-all"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 lg:right-104 flex flex-col gap-3 z-30 pointer-events-auto">
        <button className="p-4 rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/10 hover:border-white/20 hover:scale-105 transition-all group relative">
          <Heart size={20} className="group-hover:text-red-500 transition-colors" />
          <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-black px-1.5 rounded-full border border-black">{currentPost.likes}</span>
        </button>
        <button className="p-4 rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/10 hover:border-white/20 hover:scale-105 transition-all group">
          <MessageCircle size={20} className="group-hover:text-blue-400 transition-colors" />
        </button>
        <button className="p-4 rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/10 hover:border-white/20 hover:scale-105 transition-all group">
          <Share2 size={20} />
        </button>
        <button className="p-4 rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/10 hover:border-white/20 hover:scale-105 transition-all group">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}
