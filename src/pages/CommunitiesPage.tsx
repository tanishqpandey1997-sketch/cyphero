import { 
  Users,
  MessageCircle,
  Heart,
  Share2,
  MoreHorizontal,
  Plus,
  Play,
  Music,
  CheckCircle2,
  Flame,
  LayoutGrid,
  UserPlus,
  Mic,
  Piano,
  Guitar,
  SlidersHorizontal,
  Send
} from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { SharedHeader } from "@/components/ui/shared-header"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, getDocs } from "firebase/firestore"
import { useAuth } from "@/context/AuthContext"

export function CommunitiesPage() {
  const [activeTab, setActiveTab] = useState('communities');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
      setLoading(false);
      
      // Seed data if empty
      if (postsData.length === 0) {
        seedInitialData();
      }
    });

    return unsubscribe;
  }, []);

  const seedInitialData = async () => {
     const postsRef = collection(db, "posts");
     const existingPosts = await getDocs(postsRef);
     if (existingPosts.empty) {
        await addDoc(postsRef, {
            community: 'Hardcore Cypher',
            communityHandle: '@hcc-pro',
            communityAvatar: 'https://images.unsplash.com/photo-1514525253361-bee8a187c473?q=80&w=2864&auto=format&fit=crop',
            content: "Just dropped a new preset for the vocal chain. Perfect for that underground 90's vibe. Check it out and let us know! #rap #underground #cypher",
            likes: 154,
            comments: 23,
            createdAt: serverTimestamp(),
            media: {
                type: 'audio',
                title: 'VINTAGE VOCALS PRESET',
                artist: 'PRODUCER_X',
                cover: 'https://images.unsplash.com/photo-1514525253361-bee8a187c473?q=80&w=2864&auto=format&fit=crop'
            }
        });
     }
  }

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !user) return;

    try {
        await addDoc(collection(db, "posts"), {
            community: user.displayName || "Anonymous",
            communityHandle: `@${user.displayName?.toLowerCase().replace(/\s+/g, '') || 'artist'}`,
            communityAvatar: user.photoURL || "https://images.unsplash.com/photo-1511367461989-f85a21fda181?q=80&w=2864&auto=format&fit=crop",
            content: newPostContent,
            likes: 0,
            comments: 0,
            createdAt: serverTimestamp(),
            media: {
                type: 'audio',
                title: 'FRESH WAVE',
                artist: user.displayName || "Anonymous",
                cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2940&auto=format&fit=crop"
            }
        });
        setNewPostContent("");
    } catch (error) {
        console.error("Error creating post:", error);
    }
  };

  const TRENDING = [
    { id: '1', name: 'Rap Promos', icon: <Mic size={20} />, members: '12K' },
    { id: '2', name: 'Beat Market', icon: <Piano size={20} />, members: '8.5K' },
    { id: '3', name: 'Gazal Nights', icon: <Guitar size={20} />, members: '5K' },
    { id: '4', name: 'Preset Sharing', icon: <SlidersHorizontal size={20} />, members: '15K' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-white/20">
      
      <SharedHeader activeIndex={4}>
          <div className="relative group w-full max-w-md ml-8 hidden xl:block">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
               <Music size={16} className="text-zinc-500 group-focus-within:text-white transition-colors" />
            </div>
            <input 
               type="text" 
               placeholder="Search communities, posts, or artists..." 
               className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-white/20 focus:bg-white/10 transition-all font-mono placeholder:text-zinc-700"
            />
         </div>
      </SharedHeader>

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-32 pb-20 flex gap-12 items-start">
        
        {/* Left Sidebar */}
        <div className="w-64 hidden xl:block sticky top-32 h-fit space-y-8">
           <div className="space-y-2">
              <h2 className="px-4 text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em] mb-4">Feed</h2>
              {[
                { id: 'trending', label: 'Trending', icon: Flame },
                { id: 'following', label: 'Following', icon: Users },
                { id: 'communities', label: 'Communities', icon: LayoutGrid },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all duration-300 font-bold uppercase tracking-widest text-[10px]",
                    activeTab === item.id 
                      ? "bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.1)]" 
                      : "text-zinc-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
           </div>

           <div className="pt-8 border-t border-white/5">
              <button className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all group">
                 <Plus size={18} />
                 <span className="text-[11px] font-black uppercase tracking-widest">Create Community</span>
              </button>
           </div>
        </div>

        {/* Center Feed */}
        <div className="flex-1 max-w-2xl space-y-10">
            {/* Create Post Section */}
            <div className="p-8 bg-zinc-950/40 backdrop-blur-3xl border border-white/5 rounded-[40px] space-y-6">
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                    <img 
                      src={user?.photoURL || "https://images.unsplash.com/photo-1511367461989-f85a21fda181?q=80&w=2864&auto=format&fit=crop"} 
                      alt="User" 
                      className="w-full h-full object-cover" 
                    />
                 </div>
                 <textarea 
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share your latest vibe or preset..." 
                    className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold placeholder:text-zinc-700 resize-none pt-3"
                    rows={2}
                 />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                 <div className="flex gap-4">
                    <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                       <Plus size={18} className="text-zinc-500" />
                    </button>
                    <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                       <Music size={18} className="text-zinc-500" />
                    </button>
                 </div>
                 <button 
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim()}
                    className="px-8 py-3 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-3 group"
                 >
                    Post <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </button>
              </div>
           </div>

           <div className="space-y-10">
              {loading ? (
                 <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-8 h-8 border-4 border-white/10 border-t-white rounded-full animate-spin" />
                    <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Tuning the Feed...</span>
                 </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {posts.map((post) => (
                    <motion.div 
                      key={post.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-8 bg-zinc-950/40 backdrop-blur-2xl border border-white/5 rounded-[48px] space-y-6 group hover:border-white/10 transition-all duration-500"
                    >
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
                               <span className="text-[10px] text-zinc-600 font-bold tracking-widest">{post.communityHandle}</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <button className="px-5 py-2.5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">Join</button>
                            <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                               <MoreHorizontal size={18} className="text-zinc-400" />
                            </button>
                         </div>
                      </div>

                      <p className="text-zinc-400 text-sm leading-relaxed tracking-tight group-hover:text-zinc-200 transition-colors">{post.content}</p>

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
                             </div>
                          </div>
                      </div>

                      <div className="flex items-center gap-6 pt-2 border-t border-white/5">
                          <button className="flex items-center gap-2 group/btn">
                             <div className="p-3 rounded-full bg-white/5 group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                                <Heart size={18} />
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
                </AnimatePresence>
              )}
           </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 hidden lg:block sticky top-32 h-fit space-y-8">
           <div className="p-8 bg-zinc-950/40 backdrop-blur-2xl border border-white/5 rounded-[40px] space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-xs font-black uppercase tracking-[0.2em]">Trending</h2>
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
        </div>
      </main>
    </div>
  );
}
