import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { MinimalAuthPage } from "@/components/ui/minimal-auth-page";
import { DashboardPage } from "@/pages/DashboardPage";

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<BackgroundPaths title="CypherConnect" />} />
          <Route path="/sign-in" element={<MinimalAuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
