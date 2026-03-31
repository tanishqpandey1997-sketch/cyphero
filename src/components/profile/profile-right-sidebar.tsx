import { RefreshCw, UserPlus, Music2, CheckCircle2 } from "lucide-react"

export function ProfileRightSidebar() {
  const suggestedUsers = [
    { name: 'josie', followers: '348', avatar: 'https://picsum.photos/seed/josie/100/100', verified: true },
    { name: 'BandLab', followers: '9.91L', avatar: 'https://picsum.photos/seed/bandlab/100/100', verified: true },
    { name: 'LILEMUSIC@.COM', followers: '1.29K', avatar: 'https://picsum.photos/seed/lile/100/100', verified: false },
    { name: 'KASH HMHENT', followers: '6.51K', avatar: 'https://picsum.photos/seed/kash/100/100', verified: false },
    { name: 'ArtshezyShortzyandSMG4', followers: '50', avatar: 'https://picsum.photos/seed/art/100/100', verified: false },
  ];

  return (
    <div className="w-full space-y-6">
      {/* People to Follow Widget */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden group">
        <div className="p-6 flex items-center justify-between border-b border-white/5">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">People to Follow</h3>
           <button className="text-zinc-600 hover:text-white transition-colors flex items-center gap-2 group/refresh">
              <span className="text-[8px] font-bold uppercase tracking-widest group-hover/refresh:scale-105 transition-transform">Refresh</span>
              <RefreshCw size={12} className="group-hover/refresh:rotate-180 transition-transform duration-500" />
           </button>
        </div>
        
        <div className="divide-y divide-white/5">
           {suggestedUsers.map((user, i) => (
             <div key={i} className="p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer group/user">
                <div className="relative shrink-0">
                   <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden grayscale brightness-110 group-hover/user:grayscale-0 transition-all duration-300">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                   </div>
                </div>
                
                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-1">
                      <span className="text-[10px] font-black text-white hover:underline transition-all block truncate uppercase tracking-widest">{user.name}</span>
                      {user.verified && <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0" />}
                   </div>
                   <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{user.followers} Followers</p>
                </div>
                
                <button className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all group/follow shrink-0">
                   <UserPlus size={14} />
                </button>
             </div>
           ))}
        </div>
        
        <div className="px-6 py-4 bg-white/[0.01] text-center border-t border-white/5">
           <button className="text-[8px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">See more people</button>
        </div>
      </div>

      {/* Discover widget */}
      <div className="bg-[#0a0a0a]/50 p-6 rounded-3xl border border-white/5 space-y-4 group">
        <div className="flex items-center gap-3">
          <Music2 size={14} className="text-white animate-bounce" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Inspired by you</span>
        </div>
        <p className="text-[9px] font-medium text-zinc-500 leading-relaxed uppercase tracking-wider">Discover artists and communities that match your style.</p>
        <button className="w-full py-4 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_10px_20px_rgba(255,255,255,0.05)]">
           Start Discovering
        </button>
      </div>
    </div>
  );
}
