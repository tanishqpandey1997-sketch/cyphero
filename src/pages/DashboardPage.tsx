import { LimelightNav } from "@/components/ui/limelight-nav"
import { 
  UploadCloud,
  Users,
  Mic2,
  TrendingUp,
  Music
} from "lucide-react"

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

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col items-center overflow-x-hidden pb-32 selection:bg-white/20">
      
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
             <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all">
                <Mic2 className="w-5 h-5 text-white/80" />
             </div>
         </div>
      </div>
      
      {/* Mainstage Area */}
      <main className="w-full max-w-[1400px] mx-auto p-6 md:px-12 pt-10">
        <header className="mb-14">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">The Cypher Mainstage</h1>
          <p className="text-white/50 mt-4 text-lg md:text-xl tracking-wide font-medium">Connect, collaborate, and define the sound of the streets.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* CypherConnect Platform Feature Snippets */}
          <div className="p-8 rounded-[1.5rem] border border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.08] to-transparent backdrop-blur-lg hover:border-white/30 transition-all duration-300 group cursor-pointer relative overflow-hidden shadow-2xl">
              <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 scale-150 rotate-12">
                  <Music className="w-48 h-48" />
              </div>
              <h3 className="font-bold text-2xl flex items-center gap-3 text-white tracking-tight"><UploadCloud className="w-6 h-6 text-white"/> Fresh Drops</h3>
              <p className="text-white/60 text-base mt-4 leading-relaxed font-medium">Listen to the latest lo-fi Ghazals and underground Sufi beats uploaded by community artists today.</p>
          </div>
          
          <div className="p-8 rounded-[1.5rem] border border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.08] to-transparent backdrop-blur-lg hover:border-white/30 transition-all duration-300 group cursor-pointer relative overflow-hidden shadow-2xl">
              <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 scale-150 -rotate-12">
                  <Users className="w-48 h-48" />
              </div>
              <h3 className="font-bold text-2xl flex items-center gap-3 text-white tracking-tight"><Users className="w-6 h-6 text-white"/> Collab Radar</h3>
              <p className="text-white/60 text-base mt-4 leading-relaxed font-medium">4 top-tier producers are actively seeking playback vocalists to collaborate on a new mainstream album.</p>
          </div>
          
          <div className="p-8 rounded-[1.5rem] border border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.08] to-transparent backdrop-blur-lg hover:border-white/30 transition-all duration-300 group cursor-pointer relative overflow-hidden shadow-2xl">
               <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 scale-150 rotate-45">
                  <Mic2 className="w-48 h-48" />
              </div>
              <h3 className="font-bold text-2xl flex items-center gap-3 text-white tracking-tight"><Mic2 className="w-6 h-6 text-white"/> Open Mics</h3>
              <p className="text-white/60 text-base mt-4 leading-relaxed font-medium">Local Cypher session kicking off in Bandra this weekend. Reserve your performing slot to showcase your flow.</p>
          </div>
        </div>

        {/* Trending Feed Placeholder */}
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] overflow-hidden relative shadow-2xl backdrop-blur-lg">
          <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-bold tracking-tight flex items-center gap-2"><TrendingUp className="w-5 h-5 text-white/50"/> Trending in Community</h3>
              <button className="text-sm font-semibold text-white hover:text-white/70 tracking-wide transition-colors uppercase">View All</button>
          </div>
          
          <div className="divide-y divide-white/5">
              {[1, 2, 3].map((item) => (
                  <div key={item} className="p-6 md:p-8 flex items-center gap-5 hover:bg-white/[0.03] transition-colors cursor-pointer group">
                      <div className="w-14 h-14 bg-white/10 rounded-full flex-shrink-0 group-hover:scale-105 transition-transform" />
                      <div className="flex-1">
                          <h4 className="font-bold text-lg tracking-wide text-white/90 group-hover:text-white transition-colors">Project File: 'Midnight Sufi Elements'</h4>
                          <p className="text-white/50 text-sm mt-1 font-medium">Uploaded by ProducerXYZ • 2.4k downloads</p>
                      </div>
                      <div className="hidden sm:flex text-sm font-bold tracking-wide px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all">
                          Listen
                      </div>
                  </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}
