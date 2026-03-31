import { motion } from "framer-motion"
import { Camera, Zap, Edit2 } from "lucide-react"

export function ProfileHero() {
  return (
    <div className="relative w-full">
      {/* Cover Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/5 group">
        <img 
          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2940&auto=format&fit=crop" 
          alt="Profile Cover" 
          className="w-full h-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        
        {/* Cover Action Button */}
        <button className="absolute bottom-6 right-8 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 group/btn">
          <Camera size={14} className="group-hover/btn:scale-110 transition-transform" />
          <span>Edit Cover</span>
        </button>
      </div>

      {/* Avatar Container (Overlapping) */}
      <div className="absolute -bottom-16 left-12 flex items-end gap-8">
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black bg-[#111] overflow-hidden shadow-2xl">
            <img 
              src="/travis-scott.jpg" 
              alt="Tanishq Pandey" 
              className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-500 scale-110"
            />
          </div>
          {/* Avatar Edit Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full cursor-pointer backdrop-blur-sm">
             <Camera className="text-white w-8 h-8" />
          </div>
        </div>

        {/* Quick Info (Desktop only, positioned next to avatar) */}
        <div className="mb-4 hidden md:block">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tighter uppercase text-white mb-2"
          >
            Tanishq Pandey
          </motion.h1>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">@user9105764362164916</p>
        </div>
      </div>
      
      {/* Action Buttons (Desktop only, top right of main content area) */}
      <div className="absolute -bottom-12 right-0 flex items-center gap-3">
        <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
           <Zap size={14} />
           <span>Boost</span>
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-white/[0.03] border border-white/10 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
           <Edit2 size={14} />
           <span>Edit Profile</span>
        </button>
      </div>
    </div>
  );
}
