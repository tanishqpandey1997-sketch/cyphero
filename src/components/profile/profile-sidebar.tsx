import { Users, Play, Heart, Star, Info } from "lucide-react"

export function ProfileSidebar() {
  const stats = [
    { label: 'Followers', value: '0', icon: Users },
    { label: 'Following', value: '0', icon: Users },
    { label: 'Plays', value: '0', icon: Play },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Mobile-only name section */}
      <div className="md:hidden pt-20 flex flex-col items-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Tanishq Pandey</h1>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mt-1">@user9105764362164916</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-xl">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center py-4 rounded-xl hover:bg-white/[0.03] transition-colors group">
            <span className="text-lg font-black text-white group-hover:scale-110 transition-transform">{stat.value}</span>
            <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Profile Insight Card */}
      <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl space-y-4 group">
        <div className="flex items-center gap-3 text-orange-500">
          <Star size={14} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Profile Insights</span>
        </div>
        <p className="text-[11px] font-medium text-zinc-400 leading-relaxed uppercase tracking-wider">Check out who's viewed your profile recently.</p>
        <button className="w-full py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
           View Insights
        </button>
      </div>

      {/* Inspired By Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Inspired By</h3>
           <Info size={12} className="text-zinc-700" />
        </div>
        <div className="flex flex-wrap gap-2">
           {['Trap', 'Sufi Soul', 'Cyberpunk Beats', 'Old School'].map((genre) => (
             <span key={genre} className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full text-[9px] font-bold text-white/50 uppercase tracking-widest hover:text-white hover:border-white/20 transition-all cursor-pointer">
               {genre}
             </span>
           ))}
        </div>
      </div>

      {/* Quick Links / Badges */}
      <div className="pt-4 border-t border-white/5">
        <div className="flex items-center gap-4 text-zinc-600">
           <Heart size={16} className="hover:text-red-500 transition-colors cursor-pointer" />
           <Star size={16} className="hover:text-yellow-500 transition-colors cursor-pointer" />
           <Info size={16} className="hover:text-white transition-colors cursor-pointer ml-auto" />
        </div>
      </div>
    </div>
  );
}
