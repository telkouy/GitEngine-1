import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { NextSteps } from "@/components/dashboard/next-steps";
import { CommitsTable } from "@/components/dashboard/commits-table";
import { DocumentationHub } from "@/components/dashboard/documentation-hub";
import { AIInsights } from "@/components/dashboard/ai-insights";
import { OKRsSection } from "@/components/dashboard/okrs-section";
import { Achievements } from "@/components/dashboard/achievements";
import { SettingsProfile } from "@/components/dashboard/settings-profile";
import type { User, DailyStats, Commit, Insight, Documentation, OKR, Achievement, Integration, NextStep } from "@shared/schema";

interface DashboardData {
  dailyStats?: DailyStats;
  commits?: Commit[];
  insights?: Insight[];
  documentation?: Documentation[];
  okrs?: OKR[];
  achievements?: Achievement[];
  integrations?: Integration[];
  nextSteps?: NextStep[];
}

export default function Dashboard() {
  // For demo purposes, using a fixed user ID
  const userId = "demo-user";
  const [isCompactMode, setIsCompactMode] = useState(false);
  
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user/camila"],
  });

  const { data: dashboardData, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard", userId],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent-violet/10 to-accent-cyan/20 animate-gradient" />
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-accent-cyan rounded-full animate-spin animate-reverse" style={{ animationDuration: '1.5s' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-2 h-2 bg-primary/40 rounded-full animate-float" />
      <div className="fixed top-40 right-20 w-1 h-1 bg-accent-cyan/60 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="fixed bottom-40 left-20 w-3 h-3 bg-accent-emerald/30 rounded-full animate-float" style={{ animationDelay: '4s' }} />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-glass-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan p-[2px]">
                  <div className="w-full h-full rounded-[14px] bg-background flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary animate-pulse-glow" />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan opacity-20 blur-md" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Vibe Coder</h1>
                <p className="text-sm text-muted-foreground font-medium">Force of Nature - Command Center</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCompactMode(!isCompactMode)}
                className="text-muted-foreground hover:text-foreground"
              >
                {isCompactMode ? "Expandir" : "Compacto"}
              </Button>
              <ThemeToggle />
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-emerald via-accent-cyan to-primary p-[2px]">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-accent-emerald/20 to-primary/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-emerald via-accent-cyan to-primary opacity-40 blur-md animate-pulse-glow" />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Welcome Section */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="neo-card p-8 relative overflow-hidden holographic">
            <div className="relative z-10">
              <motion.h2 
                className="text-4xl md:text-5xl font-black gradient-text mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Welcome back, {user?.name || 'Camila'}!
              </motion.h2>
              <motion.p 
                className="text-xl text-muted-foreground italic font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                "Move fast, learn faster. - Susan"
              </motion.p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent-cyan/20 to-transparent rounded-full blur-3xl" />
          </div>
        </motion.div>

        {/* Stats Cards */}
        <StatsCards data={dashboardData?.dailyStats} />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-8 space-y-8">
            <NextSteps data={dashboardData?.nextSteps} />
            <CommitsTable data={dashboardData?.commits} />
            <DocumentationHub data={dashboardData?.documentation} userId={userId} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="xl:col-span-4 space-y-8">
            <AIInsights data={dashboardData?.insights} userId={userId} />
            <OKRsSection data={dashboardData?.okrs} />
            <Achievements data={dashboardData?.achievements} />
            <SettingsProfile 
              user={user} 
              integrations={dashboardData?.integrations} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
