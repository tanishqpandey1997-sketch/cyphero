import { SharedHeader } from "@/components/ui/shared-header"
import { CypherParticleText } from "@/components/ui/particle-text-effect"

export function AboutUsPage() {


  return (
    <div className="min-h-screen w-full bg-black text-white relative selection:bg-white/20 flex flex-col">
      
      {/* Top Header / Logo Bar */}
      <SharedHeader activeIndex={1} />
      
      <main className="flex-1 w-full relative">
        {/* Full-Screen Hero Section */}
        <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
             <CypherParticleText words={["THE SPECTRUM", "CYPHER", "IDENTITY", "FUTURE"]} />
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
             <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
          </div>
        </section>

        {/* Immersive Narrative Sections */}
        <section className="w-full bg-black/60 backdrop-blur-3xl border-t border-white/5 relative z-20 py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                   Breaking the <span className="text-zinc-600 italic">Frame</span>
                </h2>
                <div className="h-1 w-20 bg-white"></div>
                <p className="text-xl md:text-2xl font-medium text-zinc-300 leading-relaxed uppercase tracking-wide">
                   Cypher Connect is an experimental platform built for the voices that refuse to be silent. 
                   We bridge the gap between raw talent and the global stage.
                </p>
             </div>
             
             <div className="grid grid-cols-1 gap-12">
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                   <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-4 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-white group-hover:scale-150 transition-transform"></span>
                      Vision
                   </h4>
                   <p className="text-zinc-500 text-sm leading-relaxed uppercase tracking-wider">Redefining the digital music landscape through community-first ecosystems.</p>
                </div>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                   <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-4 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-white group-hover:scale-150 transition-transform"></span>
                      Mission
                   </h4>
                   <p className="text-zinc-500 text-sm leading-relaxed uppercase tracking-wider">Empowering independent artists with professional studio-grade tools.</p>
                </div>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                   <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-4 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-white group-hover:scale-150 transition-transform"></span>
                      Culture
                   </h4>
                   <p className="text-zinc-500 text-sm leading-relaxed uppercase tracking-wider">Rooted in the underground, built for the future of global sound.</p>
                </div>
             </div>
          </div>
        </section>
      </main>

      {/* Footer (Same as Dashboard) */}
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
