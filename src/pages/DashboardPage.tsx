import { SharedHeader } from "@/components/ui/shared-header"
import { SharedFooter } from "@/components/ui/shared-footer"
import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero"
import { useAuth } from "@/context/AuthContext"

export function DashboardPage() {
  const { user } = useAuth();

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
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-300 to-zinc-700">{user?.displayName?.split(' ')[0] || "Artist"}</span>
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto font-medium tracking-tight">
              The underground is waiting. Your next rhythm starts here. CypherConnect is your frequency, your movement, your stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Discover Talent</h3>
              <p className="text-zinc-400">Find emerging artists, explore new sounds, and stay connected to what’s happening in your local music scene.</p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Collaborate & Perform</h3>
              <p className="text-zinc-400">Connect with artists, build collaborations, and get access to open mics and live performance opportunities.</p>
            </div>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* Footer extracted fully */}
      <SharedFooter />
    </div>
  )
}
