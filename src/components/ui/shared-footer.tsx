import { Link } from "react-router-dom";

export function SharedFooter() {
  return (
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
          <Link to="/communities" className="hover:text-white duration-300 transition-all">Community</Link>
          <Link to="/discover" className="hover:text-white duration-300 transition-all">Discover Artists</Link>
          <Link to="/about" className="hover:text-white duration-300 transition-all">About Us</Link>
          <Link to="/" className="hover:text-white duration-300 transition-all">Contact</Link>
        </div>

        {/* Copyright */}
        <div className="text-zinc-600 text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase mt-8 pt-8 border-t border-white/5 w-full text-center">
          © 2026 CypherConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
