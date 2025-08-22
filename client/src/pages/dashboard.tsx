
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Zap, TrendingUp, Brain, GitCommit, FileText, Target, Award, BarChart3 } from "lucide-react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { DashboardSkeleton } from "@/components/ui/skeleton-components";
import { LiveIndicator } from "@/components/ui/live-indicator";
import { ExportModal } from "@/components/ui/export-modal";
import { useWebSocket } from "@/hooks/use-websocket";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { NextSteps } from "@/components/dashboard/next-steps";
import { CommitsTable } from "@/components/dashboard/commits-table";
import { DocumentationHub } from "@/components/dashboard/documentation-hub";
import { AIInsights } from "@/components/dashboard/ai-insights";
import { OKRsSection } from "@/components/dashboard/okrs-section";
import { Achievements } from "@/components/dashboard/achievements";
import { SettingsProfile } from "@/components/dashboard/settings-profile";
import { AIAutoDocs } from "@/components/dashboard/ai-auto-docs";
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

interface DataRelationship {
  source: string;
  target: string;
  strength: number;
  description: string;
}

export default function Dashboard() {
  // For demo purposes, using a fixed user ID
  const userId = "demo-user";
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // WebSocket connection for real-time updates
  const { isConnected } = useWebSocket({
    url: 'ws://localhost:5000',
    onMessage: (message) => {
      console.log('WebSocket message:', message);
    },
    onConnect: () => {
      console.log('WebSocket connected');
    },
    onDisconnect: () => {
      console.log('WebSocket disconnected');
    }
  });

  const { data: user, error: userError } = useQuery<User>({
    queryKey: ["/api/user/demo"],
    retry: 3,
    retryDelay: 1000,
  });

  const { data: dashboardData, isLoading, error: dashboardError } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard", userId],
    retry: 3,
    retryDelay: 1000,
  });

  // Calculate data relationships and insights
  const calculateDataRelationships = (): DataRelationship[] => {
    if (!dashboardData) return [];

    const relationships: DataRelationship[] = [];
    
    // Commits to AI Insights correlation
    const commitCount = dashboardData.commits?.length || 0;
    const insightCount = dashboardData.insights?.length || 0;
    if (commitCount > 0 && insightCount > 0) {
      relationships.push({
        source: "commits",
        target: "insights",
        strength: Math.min(insightCount / commitCount, 1),
        description: `${insightCount} AI insights generated from ${commitCount} commits`
      });
    }

    // Documentation to Commits relationship
    const docCount = dashboardData.documentation?.length || 0;
    if (commitCount > 0 && docCount > 0) {
      relationships.push({
        source: "commits",
        target: "documentation", 
        strength: Math.min(docCount / (commitCount * 0.3), 1),
        description: `${docCount} docs updated from recent development activity`
      });
    }

    // OKRs to Achievements correlation
    const okrCount = dashboardData.okrs?.length || 0;
    const achievementCount = dashboardData.achievements?.length || 0;
    if (okrCount > 0 && achievementCount > 0) {
      relationships.push({
        source: "okrs",
        target: "achievements",
        strength: achievementCount / (okrCount * 2),
        description: `${achievementCount} achievements unlocked towards ${okrCount} OKRs`
      });
    }

    return relationships;
  };

  const dataRelationships = calculateDataRelationships();

  // Calculate productivity score based on interconnected data
  const calculateProductivityScore = (): number => {
    if (!dashboardData?.dailyStats) return 0;
    
    const stats = dashboardData.dailyStats;
    const baseScore = (stats.commitsToday * 10) + (stats.insightsGenerated * 5) + (stats.hoursLogged * 2) + (stats.docsUpdated * 8);
    const relationshipBonus = dataRelationships.reduce((acc, rel) => acc + (rel.strength * 10), 0);
    
    return Math.min(Math.round(baseScore + relationshipBonus), 100);
  };

  const productivityScore = calculateProductivityScore();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (userError || dashboardError) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent-violet/10 to-accent-cyan/20" />
        <div className="relative text-center space-y-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-foreground">Connection Error</h2>
          <p className="text-muted-foreground max-w-md">
            Unable to load dashboard data. Please check your connection and try again.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-gradient-to-r from-primary to-accent-violet text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen flex relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

        {/* Floating Elements */}
        <div className="fixed top-20 left-10 w-2 h-2 bg-primary/40 rounded-full animate-float" />
        <div className="fixed top-40 right-20 w-1 h-1 bg-accent-cyan/60 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="fixed bottom-40 left-20 w-3 h-3 bg-accent-emerald/30 rounded-full animate-float" style={{ animationDelay: '4s' }} />

        {/* Sidebar */}
        <AppSidebar />

        <SidebarInset className="flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-glass-dark border-b border-white/10">
            <div className="flex items-center justify-between px-6 py-4">
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <SidebarTrigger className="mr-2" />
                <div className="relative lg:hidden">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan p-[2px]">
                    <div className="w-full h-full rounded-[8px] bg-background flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary animate-pulse-glow" />
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan opacity-20 blur-sm" />
                </div>
                <div className="lg:hidden">
                  <h1 className="text-xl font-bold gradient-text">Vibe Coder</h1>
                  <p className="text-xs text-muted-foreground font-medium">Data-Driven Command Center</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <LiveIndicator 
                  isConnected={isConnected} 
                  lastUpdate={isConnected ? new Date() : undefined}
                  className="hidden sm:flex" 
                />
                <ExportModal 
                  data={dashboardData} 
                  filename="vibe-coder-dashboard"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCompactMode(!isCompactMode)}
                  className="text-muted-foreground hover:text-foreground hidden sm:flex"
                >
                  {isCompactMode ? "Expand" : "Compact"}
                </Button>
                <ThemeToggle />
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-emerald via-accent-cyan to-primary p-[2px]">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-accent-emerald/20 to-primary/20 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-bold text-sm">C</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-emerald via-accent-cyan to-primary opacity-40 blur-sm animate-pulse-glow" />
                </div>
              </motion.div>
            </div>
          </header>

          <main className="flex-1 relative z-10 px-6 py-8 overflow-auto">
        {/* Hero Welcome Section with Productivity Score */}
        <motion.div 
          className="relative mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="neo-card p-8 relative overflow-hidden holographic">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <motion.h2 
                  className="text-4xl md:text-5xl font-black gradient-text mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Welcome back, {user?.name || 'Developer'}!
                </motion.h2>
                <motion.p 
                  className="text-xl text-muted-foreground italic font-medium mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  "Data-driven development, AI-powered insights"
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {dataRelationships.map((rel, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {rel.description}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted-foreground/20"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - productivityScore / 100)}`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold gradient-text">{productivityScore}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">Productivity Score</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Based on your commits, insights, and documentation
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent-cyan/20 to-transparent rounded-full blur-3xl" />
          </div>
        </motion.div>

        {/* Enhanced Stats Cards with Data Relationships */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card 
              className={`neo-card cursor-pointer transition-all ${selectedMetric === 'commits' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedMetric(selectedMetric === 'commits' ? null : 'commits')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commits Today</CardTitle>
                <GitCommit className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.dailyStats?.commitsToday || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Generated {dashboardData?.insights?.length || 0} insights
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`neo-card cursor-pointer transition-all ${selectedMetric === 'insights' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedMetric(selectedMetric === 'insights' ? null : 'insights')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
                <Brain className="h-4 w-4 text-accent-violet" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.dailyStats?.insightsGenerated || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData?.insights?.filter(i => i.priority === 'high').length || 0} high priority
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`neo-card cursor-pointer transition-all ${selectedMetric === 'docs' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedMetric(selectedMetric === 'docs' ? null : 'docs')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Docs Updated</CardTitle>
                <FileText className="h-4 w-4 text-accent-emerald" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.dailyStats?.docsUpdated || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData?.documentation?.length || 0} total documents
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`neo-card cursor-pointer transition-all ${selectedMetric === 'hours' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedMetric(selectedMetric === 'hours' ? null : 'hours')}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
                <BarChart3 className="h-4 w-4 text-accent-cyan" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.dailyStats?.hoursLogged || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Efficiency: {Math.round(((dashboardData?.dailyStats?.commitsToday || 0) / Math.max(dashboardData?.dailyStats?.hoursLogged || 1, 1)) * 10) / 10} commits/hr
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Data Relationship Visualization */}
        {selectedMetric && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <Card className="neo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Data Relationships for {selectedMetric}
                </CardTitle>
                <CardDescription>
                  How this metric connects with other data in your development flow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataRelationships
                    .filter(rel => rel.source === selectedMetric || rel.target === selectedMetric)
                    .map((rel, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{rel.source}</Badge>
                          <span className="text-muted-foreground">→</span>
                          <Badge variant="outline">{rel.target}</Badge>
                          <Badge variant={rel.strength > 0.7 ? "default" : rel.strength > 0.4 ? "secondary" : "outline"}>
                            {Math.round(rel.strength * 100)}% correlation
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{rel.description}</p>
                        <Progress value={rel.strength * 100} className="mt-2 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column - AI-Powered Content */}
          <div className="xl:col-span-8 space-y-8">
            {/* AI Auto-Generated Documentation */}
            <AIAutoDocs userId={userId} />

            {/* AI Insights with Data Context */}
            <Card className="neo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Insights Dashboard
                </CardTitle>
                <CardDescription>
                  Intelligent analysis of your development patterns and code quality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIInsights data={dashboardData?.insights} userId={userId} />
              </CardContent>
            </Card>

            {/* Enhanced Documentation Hub */}
            <DocumentationHub data={dashboardData?.documentation} userId={userId} />
          </div>

          {/* Right Column - Context & Actions */}
          <div className="xl:col-span-4 space-y-8">
            {/* Next Steps with Smart Prioritization */}
            <Card className="neo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent-emerald" />
                  Smart Action Items
                </CardTitle>
                <CardDescription>
                  AI-prioritized next steps based on your current progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NextSteps data={dashboardData?.nextSteps} userId={userId} />
              </CardContent>
            </Card>

            {/* OKRs with Progress Context */}
            <OKRsSection data={dashboardData?.okrs} />
            
            {/* Achievements with Milestones */}
            <Achievements data={dashboardData?.achievements} />
            
            {/* Recent Commits with Insights */}
            <Card className="neo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitCommit className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest commits with AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommitsTable data={dashboardData?.commits} />
              </CardContent>
            </Card>

            {/* Profile & Integrations */}
            <SettingsProfile 
              user={user} 
              integrations={dashboardData?.integrations} 
            />
          </div>
        </div>
        </main>
      </SidebarInset>
      </div>
    </SidebarProvider>
    </ErrorBoundary>
  );
}
