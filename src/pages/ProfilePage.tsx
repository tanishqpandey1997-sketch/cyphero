import { SharedHeader } from "@/components/ui/shared-header"
import { ProfileHero } from "@/components/profile/profile-hero"
import { ProfileSidebar } from "@/components/profile/profile-sidebar"
import { ProfileContent } from "@/components/profile/profile-content"
import { ProfileRightSidebar } from "@/components/profile/profile-right-sidebar"
import { motion } from "framer-motion"

export function ProfilePage() {


  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20 relative">
      
      <SharedHeader activeIndex={-1} />

      {/* Main Content Area */}
      <main className="pt-32 pb-20 w-full max-w-[1400px] mx-auto px-6 space-y-16">
        {/* Profile Hero (Banner + Name Header) */}
        <ProfileHero />

        {/* 3-Column Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 pt-8">
           
           {/* Left Sidebar */}
           <aside className="w-full lg:w-80 shrink-0 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ProfileSidebar />
              </motion.div>
           </aside>

           {/* Main Feed/Content Column */}
           <section className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ProfileContent />
              </motion.div>
           </section>

           {/* Right Recommendations Sidebar */}
           <aside className="w-full lg:w-80 shrink-0 hidden xl:block">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <ProfileRightSidebar />
              </motion.div>
           </aside>

        </div>
      </main>

      {/* Mobile Right Sidebar (Shown at bottom on smaller screens if needed) */}
      <div className="xl:hidden px-6 pb-20 max-w-[1400px] mx-auto">
         <ProfileRightSidebar />
      </div>

    </div>
  );
}
