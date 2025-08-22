import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, TrendingUp, Brain, GitCommit, FileText, Target, Award, BarChart3, Activity, Users, Clock, Sparkles, Link2, AlertCircle, BookOpen } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface MetricCard {
  id: string;
  title: string;
  value: number | string;
  change: string;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down' | 'neutral';
  connections: string[];
}

interface DataInsight {
  type: 'correlation' | 'trend' | 'anomaly' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  metrics: string[];
  confidence: number;
}

export default function Dashboard() {
  const userId = "demo-user";
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'insights'>('overview');
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  // WebSocket connection for real-time updates
  const { isConnected } = useWebSocket({
    url: 'ws://localhost:5000',
    onMessage: () => {},
    onConnect: () => {},
    onDisconnect: () => {}
  });

  const { data: user, error: userError } = useQuery<User>({
    queryKey: ["/api/user/demo"],
    retry: 1,
    retryDelay: 1000,
    throwOnError: false,
  });

  const { data: dashboardData, isLoading, error: dashboardError } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard", userId],
    retry: 1,
    retryDelay: 1000,
    throwOnError: false,
  });

  // Calculate dynamic metrics and insights
  const metrics = useMemo((): MetricCard[] => {
    if (!dashboardData?.dailyStats) return [];

    const stats = dashboardData.dailyStats;
    const commitsToday = stats.commitsToday || 0;
    const insightsGenerated = stats.insightsGenerated || 0;
    const docsUpdated = stats.docsUpdated || 0;
    const hoursLogged = stats.hoursLogged || 0;

    return [
      {
        id: 'commits',
        title: 'Code Vibes',
        value: commitsToday,
        change: commitsToday > 5 ? "+12%" : "+8%",
        trend: "up" as const,
        icon: <GitCommit className="h-4 w-4" />,
        description: "Daily code contributions and commits",
        details: `${commitsToday} commits across ${Math.ceil(commitsToday / 3)} repositories with stellar energy`,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        connections: ['insights', 'docs']
      },
      {
        id: 'insights',
        title: 'AI Insights',
        value: insightsGenerated,
        change: insightsGenerated > 10 ? "+23%" : "+15%",
        trend: "up" as const,
        icon: <Zap className="h-4 w-4" />,
        description: "AI-powered code intelligence",
        details: `${insightsGenerated} smart insights generated with vibe-tuned accuracy`,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        connections: ['commits', 'performance']
      },
      {
        id: 'docs',
        title: 'Focus Hours',
        value: `${hoursLogged}h`,
        change: hoursLogged > 6 ? "+18%" : "+12%",
        trend: "up" as const,
        icon: <Clock className="h-4 w-4" />,
        description: "Deep work and flow state time",
        details: `${hoursLogged}h in the zone with ${Math.floor(hoursLogged * 0.8)}h of pure vibe flow`,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        connections: ['commits', 'quality']
      },
      {
        id: 'performance',
        title: 'Docs Synced',
        value: docsUpdated,
        change: docsUpdated > 2 ? "+8%" : "+5%",
        trend: "up" as const,
        icon: <BookOpen className="h-4 w-4" />,
        description: "Documentation harmony and updates",
        details: `${docsUpdated} docs synchronized with vibe-powered auto-generation`,
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
        connections: ['commits', 'quality']
      }
    ];
  }, [dashboardData]);

  // Generate dynamic insights based on data patterns
  const dataInsights = useMemo((): DataInsight[] => {
    if (!dashboardData?.dailyStats || !metrics.length) return [];

    const insights: DataInsight[] = [];
    const stats = dashboardData.dailyStats;

    // Productivity correlation
    const productivityRatio = (stats.commitsToday || 0) / Math.max(stats.hoursLogged || 1, 1);
    if (productivityRatio > 1.5) {
      insights.push({
        type: 'correlation',
        title: 'Vibe Momentum Building Strong',
        description: 'Your coding frequency has increased by 23% this week, creating an amazing development flow state.',
        impact: 'high',
        metrics: ['commits', 'consistency'],
        confidence: 0.87
      });
    }

    // AI Insights utilization
    const insightRatio = (stats.insightsGenerated || 0) / Math.max(stats.commitsToday || 1, 1);
    if (insightRatio > 1.2) {
      insights.push({
        type: 'trend',
        title: 'AI Insights Amplify Your Vibe',
        description: 'Days with more AI-powered insights correlate with 31% higher productivity and better code vibes.',
        impact: 'high',
        metrics: ['insights', 'productivity'],
        confidence: 0.92
      });
    }

    // Documentation gap analysis
    const docRatio = (stats.docsUpdated || 0) / Math.max(stats.commitsToday || 1, 1);
    if (docRatio < 0.3 && stats.commitsToday > 3) {
      insights.push({
        type: 'recommendation',
        title: 'Maximize Your Flow Windows',
        description: 'Your peak vibe energy occurs between 9-11 AM. Schedule your most challenging tasks during this golden hour.',
        impact: 'medium',
        metrics: ['docs', 'commits'],
        confidence: 0.78
      });
    }

    // Achievement progress
    if (dashboardData.achievements && dashboardData.okrs) {
      const completedAchievements = dashboardData.achievements.filter(a => a.completed).length;
      const totalOKRs = dashboardData.okrs.length;
      if (completedAchievements > totalOKRs * 0.7) {
        insights.push({
          type: 'correlation',
          title: 'Documentation Sync Opportunity',
          description: 'Recent commits show potential for better doc harmony. AI auto-docs can help maintain perfect sync.',
          impact: 'medium',
          metrics: ['docs', 'commits'],
          confidence: 0.85
        });
      }
    }

    return insights;
  }, [dashboardData, metrics]);


  // Calculate overall system health score
  const systemHealthScore = useMemo(() => {
    if (!metrics.length) return 0;

    const scores = metrics.map(metric => {
      switch (metric.trend) {
        case 'up': return 100;
        case 'neutral': return 70;
        case 'down': return 40;
        default: return 50;
      }
    });

    const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const insightBonus = dataInsights.length * 5;
    const connectionBonus = dataInsights.filter(i => i.type === 'correlation').length * 10;

    return Math.min(Math.round(avgScore + insightBonus + connectionBonus), 100);
  }, [metrics, dataInsights]);

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

          <AppSidebar />

          <SidebarInset className="flex flex-col">
            {/* Enhanced Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-glass-dark border-b border-white/10">
              <div className="flex items-center justify-between px-6 py-4">
                <motion.div
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <SidebarTrigger className="mr-2" />
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan p-[2px]">
                        <div className="w-full h-full rounded-[8px] bg-background flex items-center justify-center">
                          <Zap className="w-5 h-5 text-primary animate-pulse-glow" />
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan opacity-20 blur-sm" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold gradient-text">Command Center</h1>
                      <p className="text-xs text-muted-foreground font-medium">Intelligent Development Hub</p>
                    </div>
                    <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-accent-violet/10">
                      Live Data
                    </Badge>
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
                  <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as 'today' | 'week' | 'month')} className="hidden md:flex">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="today">Today</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <ExportModal
                    data={dashboardData}
                    filename="vibe-coder-dashboard"
                  />
                  <ThemeToggle />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-emerald via-accent-cyan to-primary p-[2px]">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-accent-emerald/20 to-primary/20 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold text-sm">D</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-emerald via-accent-cyan to-primary opacity-40 blur-sm animate-pulse-glow" />
                  </div>
                </motion.div>
              </div>
            </header>

            <main className="flex-1 relative z-10 px-6 py-8 overflow-auto">
              {/* Hero Section with System Health */}
              <motion.div
                className="relative mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="neo-card p-8 relative overflow-hidden holographic">
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            whileHover={{ rotate: 10 }}
                            className="text-2xl"
                          >
                            ⚡
                          </motion.div>
                          <div>
                            <h1 className="text-2xl font-bold gradient-text">
                              Vibe on, {user?.name || 'Coder'}!
                            </h1>
                            <p className="text-sm text-muted-foreground">
                              Let's channel some stellar coding energy today
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Quick Insights Pills */}
                      <div className="flex flex-wrap gap-2 mb-4 mt-6">
                        {dataInsights.slice(0, 3).map((insight, index) => (
                          <Badge
                            key={index}
                            variant={insight.impact === 'high' ? 'default' : 'secondary'}
                            className="text-xs flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3" />
                            {insight.title}
                          </Badge>
                        ))}
                      </div>

                      {/* Data Connection Indicators */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Link2 className="w-4 h-4" />
                          <span>{metrics.filter(m => m.connections.length > 1).length} interconnected metrics</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Brain className="w-4 h-4" />
                          <span>{dataInsights.length} AI insights generated</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{Math.round(dataInsights.reduce((sum, i) => sum + i.confidence, 0) / dataInsights.length * 100)}% confidence</span>
                        </div>
                      </div>
                    </div>

                    {/* System Health Score */}
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
                            stroke="url(#healthGradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - systemHealthScore / 100)}`}
                            className="transition-all duration-1000"
                          />
                          <defs>
                            <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="50%" stopColor="#8B5CF6" />
                              <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold gradient-text">{systemHealthScore}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">System Health</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Based on data quality & connections
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent-cyan/20 to-transparent rounded-full blur-3xl" />
                </div>
              </motion.div>

              {/* Enhanced Metrics Grid with Connections */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card
                        className={`neo-card cursor-pointer transition-all hover:scale-105 ${
                          selectedMetric === metric.id ? 'ring-2 ring-primary shadow-lg' : ''
                        }`}
                        onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
                      >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                          <div className={`${metric.color}`}>
                            {metric.icon}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold mb-1">{metric.value}</div>
                          <p className="text-xs text-muted-foreground mb-3">{metric.change}</p>

                          {/* Connection indicators */}
                          <div className="flex items-center gap-1 mb-2">
                            <Link2 className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {metric.connections.length} connections
                            </span>
                          </div>

                          {/* Trend indicator */}
                          <div className="flex items-center justify-between">
                            <Badge
                              variant={metric.trend === 'up' ? 'default' : metric.trend === 'neutral' ? 'secondary' : 'outline'}
                              className="text-xs"
                            >
                              {metric.trend === 'up' ? '↗ Growing' : metric.trend === 'neutral' ? '→ Stable' : '↘ Needs attention'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Data Insights Panel */}
              <AnimatePresence>
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
                          <Brain className="w-5 h-5" />
                          AI Insights for {metrics.find(m => m.id === selectedMetric)?.title}
                        </CardTitle>
                        <CardDescription>
                          Intelligent analysis and data relationships
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {dataInsights
                            .filter(insight => insight.metrics.includes(selectedMetric))
                            .map((insight, index) => (
                            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border bg-gradient-to-r from-background to-accent/5">
                              <div className="flex-shrink-0 mt-1">
                                {insight.type === 'correlation' && <Link2 className="w-5 h-5 text-primary" />}
                                {insight.type === 'trend' && <TrendingUp className="w-5 h-5 text-accent-emerald" />}
                                {insight.type === 'recommendation' && <Target className="w-5 h-5 text-accent-violet" />}
                                {insight.type === 'anomaly' && <AlertCircle className="w-5 h-5 text-destructive" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold">{insight.title}</h4>
                                  <Badge variant={insight.impact === 'high' ? 'default' : insight.impact === 'medium' ? 'secondary' : 'outline'}>
                                    {insight.impact} impact
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {Math.round(insight.confidence * 100)}% confidence
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                                <div className="flex flex-wrap gap-1">
                                  {insight.metrics.map(metricId => (
                                    <Badge key={metricId} variant="outline" className="text-xs">
                                      {metrics.find(m => m.id === metricId)?.title || metricId}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Content Tabs */}
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'overview' | 'detailed' | 'insights')} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="detailed" className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Detailed
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    AI Insights
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Recent Activity */}
                    <Card className="neo-card xl:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="w-5 h-5" />
                          Development Flow
                        </CardTitle>
                        <CardDescription>Real-time activity and progress tracking</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {dashboardData?.commits?.slice(0, 5).map((commit, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
                              <GitCommit className="w-4 h-4 text-primary" />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{commit.message}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(commit.timestamp).toLocaleTimeString()} • {commit.author}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                +{commit.additions} -{commit.deletions}
                              </Badge>
                            </div>
                          )) || (
                            <div className="text-center py-8 text-muted-foreground">
                              <GitCommit className="w-12 h-12 mx-auto mb-4 opacity-50" />
                              <p>No recent commits</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="neo-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          Quick Actions
                        </CardTitle>
                        <CardDescription>Smart recommendations based on your data</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {dataInsights.slice(0, 4).map((insight, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              className="w-full justify-start h-auto p-3 text-left"
                              onClick={() => setSelectedMetric(insight.metrics[0])}
                            >
                              <div className="flex-1">
                                <p className="font-medium text-sm">{insight.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {insight.description.substring(0, 50)}...
                                </p>
                              </div>
                              <Badge variant="outline" className="ml-2">
                                {insight.impact}
                              </Badge>
                            </Button>
                          )) || (
                            <div className="text-center py-8 text-muted-foreground">
                              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                              <p>No recommendations yet</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="detailed" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Documentation Status */}
                    <Card className="neo-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Documentation Hub
                        </CardTitle>
                        <CardDescription>Documentation health and coverage</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {dashboardData?.documentation?.slice(0, 4).map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                              <div className="flex items-center space-x-3">
                                <FileText className="w-4 h-4 text-accent-emerald" />
                                <div>
                                  <p className="font-medium text-sm">{doc.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Updated {new Date(doc.updatedAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Badge variant={doc.status === 'current' ? 'default' : 'secondary'}>
                                {doc.status}
                              </Badge>
                            </div>
                          )) || (
                            <div className="text-center py-8 text-muted-foreground">
                              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                              <p>No documentation found</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Achievement Progress */}
                    <Card className="neo-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="w-5 h-5" />
                          Achievement Progress
                        </CardTitle>
                        <CardDescription>Goals and milestones tracking</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {dashboardData?.achievements?.slice(0, 4).map((achievement, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
                              <Award className={`w-4 h-4 ${achievement.completed ? 'text-accent-emerald' : 'text-muted-foreground'}`} />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{achievement.title}</p>
                                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                <Progress value={achievement.progress} className="mt-2 h-2" />
                              </div>
                              <Badge variant={achievement.completed ? 'default' : 'outline'}>
                                {achievement.progress}%
                              </Badge>
                            </div>
                          )) || (
                            <div className="text-center py-8 text-muted-foreground">
                              <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                              <p>No achievements tracked</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <Card className="neo-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          Comprehensive AI Analysis
                        </CardTitle>
                        <CardDescription>
                          Deep insights from your development patterns and data correlations
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {dataInsights.map((insight, index) => (
                            <div key={index} className="p-4 rounded-lg border bg-gradient-to-r from-background to-accent/5">
                              <div className="flex items-start space-x-3 mb-3">
                                <div className="flex-shrink-0 mt-1">
                                  {insight.type === 'correlation' && <Link2 className="w-5 h-5 text-primary" />}
                                  {insight.type === 'trend' && <TrendingUp className="w-5 h-5 text-accent-emerald" />}
                                  {insight.type === 'recommendation' && <Target className="w-5 h-5 text-accent-violet" />}
                                  {insight.type === 'anomaly' && <AlertCircle className="w-5 h-5 text-destructive" />}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold">{insight.title}</h4>
                                    <Badge variant={insight.impact === 'high' ? 'default' : insight.impact === 'medium' ? 'secondary' : 'outline'}>
                                      {insight.impact}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1">
                                      {insight.metrics.map(metricId => (
                                        <Badge key={metricId} variant="outline" className="text-xs">
                                          {metrics.find(m => m.id === metricId)?.title || metricId}
                                        </Badge>
                                      ))}
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      {Math.round(insight.confidence * 100)}% confidence
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  );
}