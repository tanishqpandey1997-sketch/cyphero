import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { MinimalAuthPage } from "@/components/ui/minimal-auth-page";
import { DashboardPage } from "@/pages/DashboardPage";
import { AboutUsPage } from "@/pages/AboutUsPage";
import { DiscoverPage } from "@/pages/DiscoverPage";
import { OpenMicsPage } from "@/pages/OpenMicsPage";
import { CommunitiesPage } from "@/pages/CommunitiesPage";

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<BackgroundPaths title="CypherConnect" />} />
          <Route path="/sign-in" element={<MinimalAuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/open-mics" element={<OpenMicsPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
