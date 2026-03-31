import { SharedHeader } from "@/components/ui/shared-header"
import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero"

export function DashboardPage() {

  return (
    <div className="min-h-screen w-full bg-black text-white relative selection:bg-white/20">
      
      <SharedHeader activeIndex={0} />
      
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/overview1.mov"
        bgImageSrc="/over.png"
        title="CYPHER CONNECT"
        date="EXPLORE SPECTRUM"
        scrollToExpand="Scroll to Expand"
        textBlend
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              The Evolution of Sound
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Welcome to the underground rhythm. CypherConnect is more than a platform; it's a movement where every voice finds its frequency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Discover Talent</h3>
              <p className="text-zinc-400">Find artists pushing boundaries and breaking genres in real-time.</p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Your Studio</h3>
              <p className="text-zinc-400">A professional suite of tools designed for the modern creator.</p>
            </div>
          </div>
        </div>
      </ScrollExpandMedia>

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
