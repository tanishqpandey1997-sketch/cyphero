import { LimelightNav } from "@/components/ui/limelight-nav"
import { 
  Mic2
} from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Minimal clean labels for the Limelight nav layout based on user's exact sequence
const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'about-us', label: 'About Us' },
  { id: 'discover', label: 'Discover' },
  { id: 'open-mics', label: 'Open Mics' },
  { id: 'communities', label: 'Communities' },
  { id: 'song-feed', label: 'Song Feed' },
  { id: 'beat-market', label: 'Beat Market' },
  { id: 'my-studio', label: 'My Studio' },
];

const slideData = [
  { left: "CLASSIC", right: "SILENCE", center: "GHAZALSOUL" },
  { left: "URBAN", right: "RHYTHM", center: "STREETFLOW" },
  { left: "SPIRITUAL", right: "VIBE", center: "SOUL CHANT" },
  { left: "MODERN", right: "FEEL", center: "SYNTHWAVE" }
];

export function DashboardPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-screen w-full bg-black text-white relative flex flex-col items-center overflow-x-hidden overflow-y-auto pb-32 selection:bg-white/20">
      
      {/* Background Video Overlay to match the hood reference */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10"></div>
        <video 
            src="/overview1.mov" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-100"
        />
      </div>
      
      {/* Top Header / Logo Bar */}
      <div className="w-full mx-auto px-6 md:px-12 py-4 flex justify-between items-center z-10 sticky top-0 bg-transparent flex-wrap gap-4">
         <div className="flex items-center">
             <img 
                 src="/cypherlogo 1.svg" 
                 alt="Cypher Connect" 
                 className="w-8 h-8 md:w-10 md:h-10 object-contain grayscale brightness-[5] contrast-[2] drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
             />
         </div>
         
         <div className="hidden lg:flex items-center justify-center flex-1">
            <LimelightNav items={navItems} />
         </div>

         <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all backdrop-blur-md">
                <Mic2 className="w-5 h-5 text-white/80" />
             </div>
         </div>
      </div>
      
      {/* Hero / Overview Mainstage */}
      <main id="dashboard-main" className="flex-1 w-full relative z-10 flex flex-col">
          <div className="relative h-[85vh] w-full px-4">
            
            {/* Top Text - CYPHER CONNECT */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 text-center w-full z-10 flex flex-col items-center">
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-white tracking-widest mb-3 drop-shadow-2xl">
                CYPHER CONNECT
              </h1>
              <p className="text-white/60 tracking-[0.3em] font-medium uppercase text-xs md:text-sm">
                Explore the Spectrum
              </p>
            </div>

            {/* Dynamic Genre Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none z-10 overflow-hidden h-[20vw] items-center">
              <AnimatePresence mode="popLayout">
                 <motion.span 
                    key={activeIndex}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[12vw] md:text-[8vw] lg:text-[9vw] font-black text-white whitespace-nowrap leading-none select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.5)] absolute"
                 >
                    {slideData[activeIndex].center}
                 </motion.span>
              </AnimatePresence>
            </div>
            
            {/* Left Floating Tags (Scroll / Click controlled) */}
            <div className="absolute left-6 md:left-12 lg:left-24 top-1/2 hidden md:flex flex-col z-20 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                 style={{ transform: `translateY(calc(-50% - ${activeIndex * 40}px))` }}>
                {slideData.map((item, idx) => (
                   <div 
                      key={`left-${idx}`} 
                      onClick={() => setActiveIndex(idx)}
                      className={`h-[40px] flex items-center gap-3 cursor-pointer transition-all duration-500 font-bold tracking-[0.1em] text-lg lg:text-2xl ${
                          activeIndex === idx ? "text-white scale-100" : "text-white/40 hover:text-white/60 scale-95 origin-left"
                      }`}
                   >
                      {activeIndex === idx && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] shrink-0"></span>} 
                      {item.left}
                   </div>
                ))}
            </div>

            {/* Right Floating Tags (Scroll / Click controlled) */}
            <div className="absolute right-6 md:right-12 lg:right-24 top-1/2 hidden md:flex flex-col text-right items-end z-20 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                 style={{ transform: `translateY(calc(-50% - ${activeIndex * 40}px))` }}>
                {slideData.map((item, idx) => (
                   <div 
                      key={`right-${idx}`} 
                      onClick={() => setActiveIndex(idx)}
                      className={`h-[40px] flex items-center justify-end gap-3 cursor-pointer transition-all duration-500 font-bold tracking-[0.1em] text-lg lg:text-2xl ${
                          activeIndex === idx ? "text-white scale-100" : "text-white/40 hover:text-white/60 scale-95 origin-right"
                      }`}
                   >
                      {item.right}
                      {activeIndex === idx && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] shrink-0"></span>} 
                   </div>
                ))}
            </div>

          </div>
      </main>

      {/* Footer extracted fully */}
      <footer className="mt-auto pt-24 pb-12 px-8 border-t border-white/5 bg-black/40 backdrop-blur-lg w-full z-10">
        <div className="flex flex-col items-center space-y-12 max-w-5xl mx-auto">
          {/* Branding & Info */}
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight flex items-center justify-center gap-3">
               <img src="/cypherlogo 1.svg" alt="Cypher Logo" className="w-8 h-8 grayscale brightness-[5]" />
               CypherConnect
            </h3>
            <p className="text-zinc-400 max-w-lg mx-auto leading-relaxed text-sm md:text-base font-medium">
              Built for the voices that don't get heard. Uniting artists, fans, and creators into one diverse, culture-driven ecosystem.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6 md:space-x-8">
            <a href="#" className="text-zinc-500 hover:text-white transition-all duration-300 p-2 hover:bg-white/10 rounded-full font-semibold uppercase tracking-wider text-sm">
              Instagram
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition-all duration-300 p-2 hover:bg-white/10 rounded-full font-semibold uppercase tracking-wider text-sm">
              Twitter
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition-all duration-300 p-2 hover:bg-white/10 rounded-full font-semibold uppercase tracking-wider text-sm">
              YouTube
            </a>
          </div>

          {/* Footer Navigation */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs md:text-sm text-zinc-500 font-bold tracking-widest uppercase">
            <a href="#" className="hover:text-white duration-300 transition-all">Community</a>
            <a href="#" className="hover:text-white duration-300 transition-all">Discover Artists</a>
            <a href="#" className="hover:text-white duration-300 transition-all">About Us</a>
            <a href="#" className="hover:text-white duration-300 transition-all">Contact</a>
          </div>

          {/* Copyright */}
          <div className="text-zinc-600 text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase mt-8 pt-8 border-t border-white/5 w-full text-center">
            © 2026 CypherConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
