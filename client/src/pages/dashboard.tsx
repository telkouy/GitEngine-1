import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { NextSteps } from "@/components/dashboard/next-steps";
import { CommitsTable } from "@/components/dashboard/commits-table";
import { DocumentationHub } from "@/components/dashboard/documentation-hub";
import { AIInsights } from "@/components/dashboard/ai-insights";
import { OKRsSection } from "@/components/dashboard/okrs-section";
import { Achievements } from "@/components/dashboard/achievements";
import { SettingsProfile } from "@/components/dashboard/settings-profile";

export default function Dashboard() {
  // For demo purposes, using a fixed user ID
  const userId = "demo-user";
  
  const { data: user } = useQuery({
    queryKey: ["/api/user/camila"],
  });

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard", userId],
  });

  const userData = user as any;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold gradient-text">Vibe Coder</h1>
                  <p className="text-xs text-muted-foreground">Command Center</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <div className="w-8 h-8 bg-gradient-to-r from-accent-emerald to-accent-cyan rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-xs">C</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back, {userData?.name || 'Camila'}!
            </h2>
            <div className="text-sm text-muted-foreground">
              Force of Nature - Vibe Coder Command Center
            </div>
          </div>
          <p className="text-muted-foreground italic text-sm">
            "Move fast, learn faster. - Susan"
          </p>
        </motion.div>

        {/* Stats Cards */}
        <StatsCards data={(dashboardData as any)?.dailyStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <NextSteps data={(dashboardData as any)?.nextSteps} />
            <CommitsTable data={(dashboardData as any)?.commits} />
            <DocumentationHub data={(dashboardData as any)?.documentation} userId={userId} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <AIInsights data={(dashboardData as any)?.insights} userId={userId} />
            <OKRsSection data={(dashboardData as any)?.okrs} />
            <Achievements data={(dashboardData as any)?.achievements} />
            <SettingsProfile 
              user={userData} 
              integrations={(dashboardData as any)?.integrations} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
