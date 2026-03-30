import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { MinimalAuthPage } from "@/components/ui/minimal-auth-page";
import { DashboardPage } from "@/pages/DashboardPage";
import { AboutUsPage } from "@/pages/AboutUsPage";

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<BackgroundPaths title="CypherConnect" />} />
          <Route path="/sign-in" element={<MinimalAuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
