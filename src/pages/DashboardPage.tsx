import { 
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { 
  Home,
  Compass,
  Music,
  TrendingUp,
  UploadCloud,
  Users,
  MessageSquare,
  Mic2,
  User,
  ChevronsUpDown
} from "lucide-react"

// Menu items mapped directly to CypherConnect Web App Features
const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Explore", url: "#", icon: Compass },
  { title: "Beat Market", url: "#", icon: Music },
  { title: "Trending", url: "#", icon: TrendingUp },
  { title: "Upload Song", url: "#", icon: UploadCloud },
  { title: "Collabs", url: "#", icon: Users },
  { title: "DMs", url: "#", icon: MessageSquare },
  { title: "Open Mics", url: "#", icon: Mic2 },
  { title: "Profile", url: "#", icon: User },
]

export function DashboardPage() {
  return (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" className="border-r border-white/10 bg-black dark shadow-xl z-50">
        <SidebarContent className="bg-black">
          <SidebarGroup className="pt-6">
            <div className="flex items-center gap-3 px-4 mb-6">
                <img 
                    src="/cypherlogo 1.svg" 
                    alt="CypherConnect Logo" 
                    className="w-10 h-10 object-contain grayscale brightness-[5] contrast-[2]" 
                />
                <h2 className="text-white font-bold tracking-wider text-xl">CYPHER</h2>
            </div>
            
            <SidebarGroupLabel className="text-white/40 mb-2 px-4 text-xs font-semibold uppercase tracking-widest">Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-white/10 text-white/80 hover:text-white transition-all duration-200 group py-5 rounded-xl">
                      <a href={item.url}>
                        <item.icon className="h-5 w-5 mr-1 group-hover:text-white transition-colors" />
                        <span className="text-[15px] font-medium tracking-wide">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="bg-black/50 border-t border-white/5 p-4">
          <SidebarGroup className="p-0">
            <SidebarMenuButton className="w-full justify-between gap-3 h-auto py-3 px-3 hover:bg-white/10 text-white rounded-xl transition-all border border-transparent hover:border-white/10">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full border border-white/10">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[14px] font-semibold tracking-wide">Underground Artist</span>
                  <span className="text-[11px] text-white/50 tracking-wider uppercase font-medium mt-0.5">Pro Member</span>
                </div>
              </div>
              <ChevronsUpDown className="h-4 w-4 text-white/40" />
            </SidebarMenuButton>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 min-w-0 bg-black text-white min-h-screen border-l border-white/5 relative overflow-x-hidden">
        {/* Mobile Sidebar Trigger - Hidden on larger screens via CSS applied in sidebar trigger automatically but we float it here */}
        <div className="md:hidden p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-40">
           <SidebarTrigger className="h-10 w-10 bg-white/5 border border-white/10 text-white rounded-full flex items-center justify-center p-0" />
           <img src="/cypherlogo 1.svg" alt="Cypher" className="w-8 h-8 object-contain grayscale brightness-[5]" />
           <div className="w-10"></div> {/* Spacer for centering */}
        </div>
        
        <div className="max-w-[1400px] mx-auto p-6 md:p-12">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">The Cypher Mainstage</h1>
            <p className="text-white/50 mt-3 text-lg tracking-wide">Connect, collaborate, and define the sound of the streets.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* CypherConnect Platform Feature Snippets */}
            <div className="p-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-lg hover:border-white/20 transition-colors group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Music className="w-24 h-24" />
                </div>
                <h3 className="font-bold text-xl flex items-center gap-3 text-white tracking-wide"><UploadCloud className="w-6 h-6 text-white/70"/> Fresh Drops</h3>
                <p className="text-white/50 text-base mt-4 leading-relaxed">Listen to the latest lo-fi Ghazals and underground Sufi beats uploaded by community artists today.</p>
            </div>
            
            <div className="p-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-lg hover:border-white/20 transition-colors group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Users className="w-24 h-24" />
                </div>
                <h3 className="font-bold text-xl flex items-center gap-3 text-white tracking-wide"><Users className="w-6 h-6 text-white/70"/> Collab Radar</h3>
                <p className="text-white/50 text-base mt-4 leading-relaxed">4 top-tier producers are actively seeking playback vocalists to collaborate on a new mainstream album.</p>
            </div>
            
            <div className="p-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-lg hover:border-white/20 transition-colors group cursor-pointer relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Mic2 className="w-24 h-24" />
                </div>
                <h3 className="font-bold text-xl flex items-center gap-3 text-white tracking-wide"><Mic2 className="w-6 h-6 text-white/70"/> Open Mics</h3>
                <p className="text-white/50 text-base mt-4 leading-relaxed">Local Cypher session kicking off in Bandra this weekend. Reserve your performing slot to showcase your flow.</p>
            </div>
          </div>

          {/* Trending Feed Placeholder */}
          <div className="rounded-[1.5rem] border border-white/10 bg-black overflow-hidden relative">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <h3 className="text-lg font-bold tracking-wide flex items-center gap-2"><TrendingUp className="w-5 h-5"/> Trending in Community</h3>
                <button className="text-sm font-medium text-white/50 hover:text-white transition-colors">View All</button>
            </div>
            
            <div className="divide-y divide-white/5">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="p-6 flex items-center gap-4 hover:bg-white/[0.03] transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex-shrink-0" />
                        <div className="flex-1">
                            <h4 className="font-bold">Project File: 'Midnight Sufi Elements'</h4>
                            <p className="text-white/50 text-sm mt-1">Uploaded by ProducerXYZ • 2.4k downloads</p>
                        </div>
                        <div className="hidden sm:flex text-sm font-semibold px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                            Listen
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}
