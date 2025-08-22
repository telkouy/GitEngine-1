
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { CommandPalette } from "@/components/ui/command-palette";
import Dashboard from "@/pages/dashboard";
import Analytics from "@/pages/analytics";
import Projects from "@/pages/projects";
import ActiveProjects from "@/pages/projects/active";
import ProjectArchive from "@/pages/projects/archive";
import ProjectTemplates from "@/pages/projects/templates";
import CodeReviews from "@/pages/code-reviews";
import GitIntegration from "@/pages/git-integration";
import OKRs from "@/pages/okrs";
import Achievements from "@/pages/achievements";
import Documentation from "@/pages/documentation";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vibe-coder-theme">
        <TooltipProvider>
          <CommandPalette />
          <Toaster />
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/active" element={<ActiveProjects />} />
              <Route path="/projects/archive" element={<ProjectArchive />} />
              <Route path="/projects/templates" element={<ProjectTemplates />} />
              <Route path="/reviews" element={<CodeReviews />} />
              <Route path="/git" element={<GitIntegration />} />
              <Route path="/okrs" element={<OKRs />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
