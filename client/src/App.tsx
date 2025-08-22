import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { CommandPalette } from '@/components/ui/command-palette';
import Dashboard from '@/pages/dashboard';
import Analytics from '@/pages/analytics';
import Projects from '@/pages/projects';
import ActiveProjects from '@/pages/projects/active';
import ArchivedProjects from '@/pages/projects/archive';
import ProjectTemplates from '@/pages/projects/templates';
import CodeReviews from '@/pages/code-reviews';
import GitIntegration from '@/pages/git-integration';
import OKRs from '@/pages/okrs';
import Achievements from '@/pages/achievements';
import Documentation from '@/pages/documentation';
import AIAutoDocsPage from '@/pages/ai-auto-docs';
import AIInsightsPage from '@/pages/ai-insights';
import AIReviewsPage from '@/pages/ai-reviews';
import AIPerformancePage from '@/pages/ai-performance';
import Settings from '@/pages/settings';
import NotFound from '@/pages/not-found';

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  // Prevent the default browser behavior
  event.preventDefault();
  // Silently handle the error without logging to console
});

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
              <Route path="/ai-auto-docs" element={<AIAutoDocsPage />} />
              <Route path="/ai-insights" element={<AIInsightsPage />} />
              <Route path="/ai-reviews" element={<AIReviewsPage />} />
              <Route path="/ai-performance" element={<AIPerformancePage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/active" element={<ActiveProjects />} />
              <Route path="/projects/archive" element={<ArchivedProjects />} />
              <Route path="/projects/templates" element={<ProjectTemplates />} />
              <Route path="/reviews" element={<CodeReviews />} />
              <Route path="/git" element={<GitIntegration />} />
              <Route path="/okrs" element={<OKRs />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/documentation" element={<Documentation />} />
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