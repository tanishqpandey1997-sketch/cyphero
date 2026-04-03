import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { MinimalAuthPage } from "@/components/ui/minimal-auth-page";
import { DashboardPage } from "@/pages/DashboardPage";
import { AboutUsPage } from "@/pages/AboutUsPage";
import { DiscoverPage } from "@/pages/DiscoverPage";
import { OpenMicsPage } from "@/pages/OpenMicsPage";
import { CommunitiesPage } from "@/pages/CommunitiesPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { BeatMarketPage } from "@/pages/BeatMarketPage";
import { CypherBotProvider, useCypherBot } from "@/context/CypherBotContext";
import { CypherBotPanel, CypherBotFAB } from "@/components/cypher-bot/cypher-bot-panel";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/protected-route";

function CypherBotWrapper() {
  const { toggleBot } = useCypherBot();
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <>
      <CypherBotPanel />
      <CypherBotFAB onClick={toggleBot} />
    </>
  );
}

function App() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CypherBotProvider>
          <main className="min-h-screen bg-black text-white selection:bg-white/20">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<BackgroundPaths title="CypherConnect" />} />
              <Route path="/sign-in" element={<MinimalAuthPage />} />
              
              {/* Protected App Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/about" element={<ProtectedRoute><AboutUsPage /></ProtectedRoute>} />
              <Route path="/discover" element={<ProtectedRoute><DiscoverPage /></ProtectedRoute>} />
              <Route path="/open-mics" element={<ProtectedRoute><OpenMicsPage /></ProtectedRoute>} />
              <Route path="/communities" element={<ProtectedRoute><CommunitiesPage /></ProtectedRoute>} />
              <Route path="/beat-market" element={<ProtectedRoute><BeatMarketPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/sign-in" replace />} />
            </Routes>
            <CypherBotWrapper />
          </main>
        </CypherBotProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
