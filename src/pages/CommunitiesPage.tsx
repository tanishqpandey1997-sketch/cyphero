import { LimelightNav } from "@/components/ui/limelight-nav"
import { 
  Users,
  Flame,
  LayoutGrid,
  Search,
  MessageCircle,
  Heart,
  Share2,
  MoreHorizontal,
  Plus,
  TrendingUp,
  UserPlus,
  Play,
  Globe,
  Music,
  CheckCircle2,
  Mic2
} from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

// --- Mock Data ---

const POSTS = [
  {
    id: '1',
    community: 'Hardcore Cypher',
    communityHandle: '@hcc-pro',
    communityAvatar: 'https://picsum.photos/seed/hcc/100/100',
    content: "Just dropped a new preset for the vocal chain. Perfect for that underground 90's vibe. Check it out and let us know! #rap #underground #cypher",
    likes: 154,
    comments: 23,
    time: '2h ago',
    media: {
      type: 'audio',
      title: 'VINTAGE VOCALS PRESET',
      artist: 'PRODUCER_X',
      cover: 'https://images.unsplash.com/photo-1514525253361-bee8a187c473?q=80&w=2864&auto=format&fit=crop'
    }
  },
  {
    id: '2',
    community: 'Sufi Soul',
    communityHandle: '@sufisoul',
    communityAvatar: 'https://picsum.photos/seed/sufi/100/100',
    content: "Evening sessions at the Virtual Stage 3. Connecting hearts through melody. Join us for the live stream tomorrow. ✨ #sufi #peace #melody",
    likes: 850,
    comments: 112,
    time: '5h ago',
    media: {
      type: 'audio',
      title: 'BEYOND THE VEIL',
      artist: 'ALIF',
      cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2940&auto=format&fit=crop'
    }
  }
];

const TRENDING = [
  { id: '1', name: 'Rap Promos', icon: '🎤', members: '12K' },
  { id: '2', name: 'Beat Market', icon: '🎹', members: '8.5K' },
  { id: '3', name: 'Gazal Nights', icon: '🎻', members: '5K' },
  { id: '4', name: 'Preset Sharing', icon: '🎚️', members: '15K' }
];

export function CommunitiesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('communities');

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
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-white/20">
      
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
            <LimelightNav items={navItems} defaultActiveIndex={4} />
         </div>

         <div className="flex items-center gap-4">
             <div className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all backdrop-blur-md group">
                <Mic2 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
             </div>
         </div>
      </div>

      <main className="flex w-full max-w-7xl mx-auto pt-32 px-6 gap-10">
        
        {/* Left Sidebar (Nav) */}
        <div className="w-64 hidden xl:block sticky top-32 h-fit space-y-6">
           <div className="flex flex-col gap-2 p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px]">
              {[
                  { id: 'trending', label: 'Trending', icon: TrendingUp },
                  { id: 'following', label: 'Following', icon: UserPlus },
                  { id: 'communities', label: 'Communities', icon: Users }
              ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                        "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all uppercase text-[10px] tracking-[0.2em] font-black",
                        activeTab === item.id 
                            ? "bg-white text-black shadow-lg" 
                            : "text-zinc-500 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
              ))}
           </div>
           
           <button className="w-full bg-white text-black py-5 rounded-[24px] font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
              <Plus size={18} />
              Create Post
           </button>
        </div>

        {/* Center Feed */}
        <div className="flex-1 max-w-[680px] space-y-8 pb-20">
           {POSTS.map((post) => (
               <motion.div 
                 key={post.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="p-8 bg-zinc-950/40 backdrop-blur-2xl border border-white/5 rounded-[40px] space-y-6 group hover:border-white/10 transition-colors"
               >
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10">
                           <img src={post.communityAvatar} alt={post.community} className="w-full h-full object-cover" />
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                               <h3 className="text-sm font-black uppercase tracking-widest">{post.community}</h3>
                               <CheckCircle2 size={14} className="text-blue-400" />
                           </div>
                           <span className="text-[10px] text-zinc-600 font-bold tracking-widest">{post.communityHandle} • {post.time}</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <button className="px-5 py-2.5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Join</button>
                        <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                           <MoreHorizontal size={18} className="text-zinc-400" />
                        </button>
                     </div>
                  </div>

                  {/* Body Content */}
                  <p className="text-zinc-400 text-sm leading-relaxed tracking-tight group-hover:text-zinc-200 transition-colors">{post.content}</p>

                  {/* Embedded Media (Glass Player Idea) */}
                  <div className="relative rounded-[32px] overflow-hidden border border-white/10 group/player cursor-pointer">
                      <div className="absolute inset-0 bg-black/60 group-hover/player:bg-black/40 transition-colors z-10" />
                      <img src={post.media.cover} alt={post.media.title} className="w-full h-56 object-cover grayscale group-hover/player:grayscale-0 group-hover/player:scale-105 transition-all duration-1000" />
                      
                      <div className="absolute inset-0 z-20 flex items-center p-8 gap-6">
                         <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover/player:scale-110 transition-transform">
                            <Play fill="black" size={24} className="ml-1" />
                         </div>
                         <div className="flex-1">
                            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-black block mb-1">{post.media.artist}</span>
                            <h4 className="text-2xl font-black italic uppercase tracking-tighter leading-none">{post.media.title}</h4>
                            <div className="flex items-center gap-1 mt-3">
                               {[...Array(40)].map((_, i) => (
                                   <div key={i} className="w-1 bg-white/20 rounded-full" style={{ height: `${Math.random() * 20 + 4}px` }} />
                               ))}
                            </div>
                         </div>
                      </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center gap-6 pt-2 border-t border-white/5">
                      <button className="flex items-center gap-2 group/btn">
                         <div className="p-3 rounded-full bg-white/5 group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                            <Heart size={18} fill={post.likes > 500 ? "currentColor" : "none"} />
                         </div>
                         <span className="text-[11px] font-black tracking-widest">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 group/btn">
                         <div className="p-3 rounded-full bg-white/5 group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                            <MessageCircle size={18} />
                         </div>
                         <span className="text-[11px] font-black tracking-widest">{post.comments}</span>
                      </button>
                      <button className="ml-auto p-3 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all">
                         <Share2 size={18} />
                      </button>
                  </div>
               </motion.div>
           ))}
        </div>

        {/* Right Sidebar (Widgets) */}
        <div className="w-80 hidden lg:block sticky top-32 h-fit space-y-8">
           {/* Trending Communities */}
           <div className="p-8 bg-zinc-950/40 backdrop-blur-2xl border border-white/5 rounded-[40px] space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-xs font-black uppercase tracking-[0.2em]">Trending</h2>
                 <button className="text-[9px] text-zinc-600 font-black hover:text-white transition-colors uppercase">Refresh</button>
              </div>
              <div className="space-y-4">
                 {TRENDING.map((item) => (
                    <div key={item.id} className="flex items-center justify-between group cursor-pointer">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl border border-white/10 group-hover:bg-white group-hover:text-black transition-all">{item.icon}</div>
                          <div>
                             <h4 className="text-[11px] font-black uppercase tracking-widest">{item.name}</h4>
                             <span className="text-[9px] text-zinc-600 font-bold">{item.members} members</span>
                          </div>
                       </div>
                       <button className="p-2 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                          <UserPlus size={14} />
                       </button>
                    </div>
                 ))}
              </div>
           </div>

           {/* Distribution Promo Card */}
           <div className="relative p-10 rounded-[48px] overflow-hidden border border-white/10 group cursor-pointer bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xl -z-10" />
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                 <div className="relative w-24 h-24">
                    <Globe className="w-full h-full text-white/20 animate-[spin_10s_linear_infinite]" />
                    <Music className="absolute inset-0 m-auto w-8 h-8 text-white scale-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
                 </div>
                 <div className="space-y-3">
                    <h2 className="text-xl font-black italic uppercase leading-none tracking-tighter">Your music on the global stage</h2>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold leading-relaxed px-2">Distribute your music to all major platforms with Cypher Pro.</p>
                 </div>
                 <button className="w-full py-4 rounded-3xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                    Get Started
                 </button>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}
