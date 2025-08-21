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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 glass-effect border-b border-gray-200/20 dark:border-gray-700/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Vibe Coder</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI Product Builder</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="w-10 h-10 bg-gradient-to-r from-accent-emerald to-accent-cyan rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">C</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div 
          className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Welcome back, {user?.name || 'Camila'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Here's your development overview for today
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <StatsCards data={dashboardData?.dailyStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <NextSteps data={dashboardData?.nextSteps} />
            <CommitsTable data={dashboardData?.commits} />
            <DocumentationHub data={dashboardData?.documentation} userId={userId} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
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