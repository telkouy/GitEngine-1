
import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, TrendingUp, Brain, GitCommit, FileText, Target, Award, BarChart3, Activity, Users, Clock, Sparkles, Link2, AlertCircle, BookOpen, Code2, Palette, Rocket, Shield, ChevronRight, Play, Pause, FastForward } from "lucide-react";
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
import { CampaignVelocityEngine } from "@/components/dashboard/campaign-velocity-engine";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend } from "recharts";
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

interface EpicMetric {
  id: string;
  title: string;
  value: number | string;
  change: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  trend: 'explosive' | 'rising' | 'steady' | 'declining';
  insights: string[];
  realTimeData: number[];
  prediction: number;
  aiConfidence: number;
}

interface VibeFlow {
  timestamp: string;
  productivity: number;
  energy: number;
  focus: number;
  creativity: number;
}

export default function Dashboard() {
  const userId = "demo-user";
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'command' | 'velocity' | 'intelligence' | 'flow'>('command');
  const [timeRange, setTimeRange] = useState<'live' | 'day' | 'week' | 'month'>('live');
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(true);

  // Enhanced WebSocket with more data streams
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

  // Generate epic real-time data
  const vibeFlowData = useMemo((): VibeFlow[] => {
    const now = new Date();
    return Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(now.getTime() - (23 - i) * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit' }),
      productivity: 60 + Math.sin(i * 0.5) * 30 + Math.random() * 20,
      energy: 70 + Math.cos(i * 0.3) * 25 + Math.random() * 15,
      focus: 55 + Math.sin(i * 0.8) * 35 + Math.random() * 25,
      creativity: 80 + Math.sin(i * 0.2) * 20 + Math.random() * 15
    }));
  }, []);

  const epicMetrics = useMemo((): EpicMetric[] => {
    if (!dashboardData?.dailyStats) return [];

    const stats = dashboardData.dailyStats;
    const baseMetrics = [
      stats.commitsToday || 0,
      stats.insightsGenerated || 0,
      stats.hoursLogged || 0,
      stats.docsUpdated || 0
    ];

    return [
      {
        id: 'velocity',
        title: 'Code Velocity',
        value: `${baseMetrics[0]}×`,
        change: '+340%',
        trend: 'explosive' as const,
        icon: <Zap className="h-5 w-5" />,
        color: "text-emerald-400",
        gradient: "from-emerald-400 via-teal-400 to-cyan-400",
        insights: [
          "Peak performance detected",
          "AI assistance amplified output",
          "Flow state maintained for 4.2h"
        ],
        realTimeData: Array.from({ length: 12 }, (_, i) => baseMetrics[0] + Math.sin(i) * 2 + Math.random() * 3),
        prediction: baseMetrics[0] * 1.8,
        aiConfidence: 94
      },
      {
        id: 'intelligence',
        title: 'AI Intelligence',
        value: `${baseMetrics[1]}`,
        change: '+285%',
        trend: 'explosive' as const,
        icon: <Brain className="h-5 w-5" />,
        color: "text-purple-400",
        gradient: "from-purple-400 via-violet-400 to-indigo-400",
        insights: [
          "Neural pattern optimization",
          "Context awareness maximized",
          "Predictive accuracy: 96.7%"
        ],
        realTimeData: Array.from({ length: 12 }, (_, i) => baseMetrics[1] + Math.cos(i) * 3 + Math.random() * 2),
        prediction: baseMetrics[1] * 2.1,
        aiConfidence: 97
      },
      {
        id: 'flow',
        title: 'Deep Flow Hours',
        value: `${baseMetrics[2]}h`,
        change: '+156%',
        trend: 'rising' as const,
        icon: <Zap className="h-5 w-5" />,
        color: "text-blue-400",
        gradient: "from-blue-400 via-cyan-400 to-teal-400",
        insights: [
          "Extended focus sessions",
          "Minimal context switching",
          "Peak flow at 10:30 AM"
        ],
        realTimeData: Array.from({ length: 12 }, (_, i) => Math.max(0, baseMetrics[2] + Math.sin(i * 0.5) * 1.5 + Math.random() * 1)),
        prediction: baseMetrics[2] * 1.3,
        aiConfidence: 89
      },
      {
        id: 'sync',
        title: 'Perfect Sync',
        value: `${baseMetrics[3]}`,
        change: '+92%',
        trend: 'steady' as const,
        icon: <Shield className="h-5 w-5" />,
        color: "text-orange-400",
        gradient: "from-orange-400 via-red-400 to-pink-400",
        insights: [
          "Documentation harmony",
          "Zero sync conflicts",
          "Auto-generation active"
        ],
        realTimeData: Array.from({ length: 12 }, (_, i) => baseMetrics[3] + Math.random() * 2),
        prediction: baseMetrics[3] * 1.4,
        aiConfidence: 85
      }
    ];
  }, [dashboardData]);

  // Epic system health calculation
  const epicSystemHealth = useMemo(() => {
    const baseScore = epicMetrics.reduce((sum, metric) => {
      const trendScores = { explosive: 100, rising: 85, steady: 75, declining: 50 };
      return sum + trendScores[metric.trend];
    }, 0) / epicMetrics.length;

    const aiBonus = epicMetrics.reduce((sum, metric) => sum + metric.aiConfidence, 0) / epicMetrics.length;
    const connectivityBonus = isConnected ? 10 : -5;
    
    return Math.min(Math.round(baseScore + (aiBonus - 70) * 0.3 + connectivityBonus), 100);
  }, [epicMetrics, isConnected]);

  // Performance distribution data
  const performanceData = [
    { name: 'Code Quality', value: 94, color: '#10B981' },
    { name: 'AI Efficiency', value: 97, color: '#8B5CF6' },
    { name: 'Flow State', value: 89, color: '#06B6D4' },
    { name: 'Sync Health', value: 92, color: '#F59E0B' }
  ];

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (userError || dashboardError) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-black to-orange-500/20" />
        <div className="relative text-center space-y-6 p-8">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            ⚠️
          </motion.div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            System Offline
          </h2>
          <p className="text-gray-400 max-w-md text-lg">
            The command center is temporarily disconnected. Attempting to restore connection...
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-6 bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 text-lg"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Reconnect Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen flex relative overflow-hidden bg-black">
          {/* Epic Animated Background */}
          <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          
          {/* Neural Network Animation */}
          <div className="fixed inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/60 rounded-full animate-ping" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400/50 rounded-full animate-bounce" />
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-orange-400/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-cyan-400/50 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          </div>

          {/* Holographic Grid */}
          <div className="fixed inset-0 opacity-20 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" 
               style={{
                 backgroundImage: 'linear-gradient(90deg, transparent 49%, rgba(16, 185, 129, 0.1) 50%, transparent 51%), linear-gradient(transparent 49%, rgba(16, 185, 129, 0.1) 50%, transparent 51%)',
                 backgroundSize: '50px 50px'
               }} />

          <AppSidebar />

          <SidebarInset className="flex flex-col">
            {/* Epic Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-emerald-500/20">
              <div className="flex items-center justify-between px-6 py-4">
                <motion.div
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <SidebarTrigger className="mr-2 text-emerald-400 hover:text-emerald-300" />
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="relative"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-[2px]">
                        <div className="w-full h-full rounded-[10px] bg-black flex items-center justify-center">
                          <Zap className="w-6 h-6 text-emerald-400" />
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 opacity-40 blur-lg animate-pulse" />
                    </motion.div>
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                        Command Matrix
                      </h1>
                      <p className="text-sm text-gray-400 font-medium">Neural Development Interface</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 border-emerald-500/30">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2" />
                      LIVE MATRIX
                    </Badge>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-6"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsPlayingAnimation(!isPlayingAnimation)}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      {isPlayingAnimation ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <LiveIndicator
                      isConnected={isConnected}
                      lastUpdate={isConnected ? new Date() : undefined}
                      className="text-emerald-400"
                    />
                  </div>

                  <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as 'live' | 'day' | 'week' | 'month')}>
                    <TabsList className="bg-black/40 border border-emerald-500/20">
                      <TabsTrigger value="live" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">Live</TabsTrigger>
                      <TabsTrigger value="day" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">Day</TabsTrigger>
                      <TabsTrigger value="week" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">Week</TabsTrigger>
                      <TabsTrigger value="month" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">Month</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <ExportModal
                    data={dashboardData}
                    filename="epic-command-matrix"
                  />
                  <ThemeToggle />

                  {/* User Avatar with Neural Glow */}
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-[2px]">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold text-lg">{user?.name?.[0] || 'C'}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 opacity-60 blur-lg animate-pulse" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-black animate-bounce" />
                  </motion.div>
                </motion.div>
              </div>
            </header>

            <main className="flex-1 relative z-10 px-6 py-8 overflow-auto">
              {/* Epic Hero Section */}
              <motion.div
                className="relative mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-emerald-900/20 via-black to-cyan-900/20 border border-emerald-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="text-4xl"
                        >
                          ⚡
                        </motion.div>
                        <div>
                          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                            Epic Vibes Activated, {user?.name || 'Neural Coder'}!
                          </h1>
                          <p className="text-gray-300 text-lg mt-2">
                            Your development matrix is operating at maximum efficiency
                          </p>
                        </div>
                      </div>

                      {/* Real-time Intelligence Feed */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-emerald-400 mb-2">
                            <Brain className="w-5 h-5" />
                            <span className="font-semibold">Neural Processing</span>
                          </div>
                          <p className="text-2xl font-bold text-white">{epicSystemHealth}%</p>
                          <p className="text-emerald-300 text-sm">System optimal</p>
                        </div>
                        
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-purple-400 mb-2">
                            <Zap className="w-5 h-5" />
                            <span className="font-semibold">AI Amplification</span>
                          </div>
                          <p className="text-2xl font-bold text-white">340%</p>
                          <p className="text-purple-300 text-sm">Velocity boost</p>
                        </div>
                        
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-cyan-400 mb-2">
                            <Rocket className="w-5 h-5" />
                            <span className="font-semibold">Flow Coefficient</span>
                          </div>
                          <p className="text-2xl font-bold text-white">9.7</p>
                          <p className="text-cyan-300 text-sm">Peak performance</p>
                        </div>
                      </div>
                    </div>

                    {/* Epic System Health Visualization */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-32 h-32 mb-4">
                        <svg className="w-32 h-32 transform -rotate-90">
                          {/* Background circle */}
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="rgba(16, 185, 129, 0.1)"
                            strokeWidth="8"
                            fill="none"
                          />
                          {/* Progress circle */}
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="url(#epicGradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - epicSystemHealth / 100)}`}
                            className="transition-all duration-2000"
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="epicGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="50%" stopColor="#06B6D4" />
                              <stop offset="100%" stopColor="#8B5CF6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            {epicSystemHealth}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Neural Matrix</h3>
                      <p className="text-gray-400 text-center text-sm">
                        AI-powered development ecosystem status
                      </p>
                    </div>
                  </div>

                  {/* Floating Particles */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + Math.sin(i) * 20}%`,
                      }}
                      animate={{
                        y: [-20, 20, -20],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Epic Metrics Grid */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {epicMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Card
                        className={`relative overflow-hidden bg-black/40 border border-gray-800/50 cursor-pointer transition-all duration-300 hover:border-emerald-500/30 ${
                          selectedMetric === metric.id ? 'ring-2 ring-emerald-500/50 border-emerald-500/50' : ''
                        }`}
                        onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
                      >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-5`} />
                        
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.gradient} bg-opacity-20`}>
                              <div className={metric.color}>
                                {metric.icon}
                              </div>
                            </div>
                            <Badge className={`bg-gradient-to-r ${metric.gradient} bg-opacity-20 text-white border-none`}>
                              {metric.trend === 'explosive' ? '🚀' : metric.trend === 'rising' ? '📈' : metric.trend === 'steady' ? '⚡' : '⚠️'}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg font-semibold text-white">{metric.title}</CardTitle>
                        </CardHeader>

                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-semibold ${metric.color}`}>{metric.change}</span>
                                <span className="text-xs text-gray-400">vs last period</span>
                              </div>
                            </div>

                            {/* Mini Chart */}
                            <div className="h-12">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={metric.realTimeData.map((value, i) => ({ value, index: i }))}>
                                  <defs>
                                    <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor={metric.color.replace('text-', '').replace('-400', '')} stopOpacity={0.3}/>
                                      <stop offset="95%" stopColor={metric.color.replace('text-', '').replace('-400', '')} stopOpacity={0}/>
                                    </linearGradient>
                                  </defs>
                                  <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke={metric.color.replace('text-', '').replace('-400', '')}
                                    fillOpacity={1}
                                    fill={`url(#gradient-${metric.id})`}
                                    strokeWidth={2}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>

                            {/* AI Confidence */}
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">AI Confidence</span>
                              <span className={metric.color}>{metric.aiConfidence}%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Epic Detailed Insights */}
              <AnimatePresence>
                {selectedMetric && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                  >
                    <Card className="bg-black/40 border border-emerald-500/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl text-white">
                          <Brain className="w-6 h-6 text-emerald-400" />
                          Neural Analysis: {epicMetrics.find(m => m.id === selectedMetric)?.title}
                          <Badge className="bg-emerald-500/20 text-emerald-400">
                            Real-time Processing
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* AI Insights */}
                          <div className="lg:col-span-2 space-y-4">
                            {epicMetrics.find(m => m.id === selectedMetric)?.insights.map((insight, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-start space-x-3 p-4 rounded-lg bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border border-emerald-500/10"
                              >
                                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 animate-pulse" />
                                <div>
                                  <p className="text-white font-medium">{insight}</p>
                                  <p className="text-gray-400 text-sm mt-1">
                                    Neural network confidence: {85 + Math.floor(Math.random() * 15)}%
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Prediction */}
                          <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl p-6 border border-purple-500/20">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-purple-400" />
                              AI Prediction
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <p className="text-gray-400 text-sm">Projected Value</p>
                                <p className="text-2xl font-bold text-white">
                                  {epicMetrics.find(m => m.id === selectedMetric)?.prediction}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400 text-sm">Timeline</p>
                                <p className="text-purple-400 font-medium">Next 24 hours</p>
                              </div>
                              <div>
                                <p className="text-gray-400 text-sm">Confidence Level</p>
                                <div className="flex items-center gap-2">
                                  <Progress 
                                    value={epicMetrics.find(m => m.id === selectedMetric)?.aiConfidence} 
                                    className="flex-1 h-2"
                                  />
                                  <span className="text-purple-400 text-sm">
                                    {epicMetrics.find(m => m.id === selectedMetric)?.aiConfidence}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Epic Tabs System */}
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'command' | 'velocity' | 'intelligence' | 'flow')} className="space-y-8">
                <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-emerald-500/20">
                  <TabsTrigger 
                    value="command" 
                    className="flex items-center gap-2 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                  >
                    <Shield className="w-4 h-4" />
                    Command Center
                  </TabsTrigger>
                  <TabsTrigger 
                    value="velocity" 
                    className="flex items-center gap-2 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                  >
                    <Rocket className="w-4 h-4" />
                    Velocity Matrix
                  </TabsTrigger>
                  <TabsTrigger 
                    value="intelligence" 
                    className="flex items-center gap-2 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                  >
                    <Brain className="w-4 h-4" />
                    AI Intelligence
                  </TabsTrigger>
                  <TabsTrigger 
                    value="flow" 
                    className="flex items-center gap-2 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                  >
                    <Activity className="w-4 h-4" />
                    Flow Analytics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="velocity" className="space-y-8">
                  <CampaignVelocityEngine />
                </TabsContent>

                <TabsContent value="command" className="space-y-8">
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Neural Activity Feed */}
                    <Card className="neo-card xl:col-span-2 bg-black/40 border border-emerald-500/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-white">
                          <Activity className="w-6 h-6 text-emerald-400" />
                          Neural Development Stream
                          <Badge className="bg-emerald-500/20 text-emerald-400 animate-pulse">
                            Live Feed
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {[
                            {
                              id: 1,
                              message: "🚀 Epic dashboard redesign completed with neural visualizations",
                              timestamp: new Date(Date.now() - 5 * 60 * 1000),
                              type: "breakthrough",
                              impact: "revolutionary",
                              neural_score: 98
                            },
                            {
                              id: 2,
                              message: "⚡ AI-powered real-time metrics integration successful",
                              timestamp: new Date(Date.now() - 15 * 60 * 1000),
                              type: "enhancement",
                              impact: "high",
                              neural_score: 94
                            },
                            {
                              id: 3,
                              message: "🧠 Neural flow state detection algorithms deployed",
                              timestamp: new Date(Date.now() - 30 * 60 * 1000),
                              type: "intelligence",
                              impact: "transformative",
                              neural_score: 96
                            },
                            {
                              id: 4,
                              message: "🔮 Predictive analytics engine calibrated for maximum precision",
                              timestamp: new Date(Date.now() - 45 * 60 * 1000),
                              type: "prediction",
                              impact: "strategic",
                              neural_score: 92
                            },
                            {
                              id: 5,
                              message: "⚗️ Command matrix synchronization protocols optimized",
                              timestamp: new Date(Date.now() - 60 * 60 * 1000),
                              type: "optimization",
                              impact: "foundational",
                              neural_score: 89
                            }
                          ].map((event, index) => (
                            <motion.div
                              key={event.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                              className={`flex items-center space-x-4 p-4 rounded-xl border-l-4 ${
                                event.impact === 'revolutionary' ? 'border-l-emerald-400 bg-emerald-500/5' :
                                event.impact === 'transformative' ? 'border-l-purple-400 bg-purple-500/5' :
                                event.impact === 'high' ? 'border-l-cyan-400 bg-cyan-500/5' :
                                event.impact === 'strategic' ? 'border-l-orange-400 bg-orange-500/5' :
                                'border-l-blue-400 bg-blue-500/5'
                              }`}
                            >
                              <div className="flex-1">
                                <p className="font-medium text-white text-sm">{event.message}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  <p className="text-xs text-gray-400">
                                    {event.timestamp.toLocaleTimeString()}
                                  </p>
                                  <Badge variant="outline" className="text-xs">
                                    Neural: {event.neural_score}%
                                  </Badge>
                                  <Badge className={`text-xs ${
                                    event.impact === 'revolutionary' ? 'bg-emerald-500/20 text-emerald-400' :
                                    event.impact === 'transformative' ? 'bg-purple-500/20 text-purple-400' :
                                    event.impact === 'high' ? 'bg-cyan-500/20 text-cyan-400' :
                                    event.impact === 'strategic' ? 'bg-orange-500/20 text-orange-400' :
                                    'bg-blue-500/20 text-blue-400'
                                  }`}>
                                    {event.impact}
                                  </Badge>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Distribution */}
                    <Card className="bg-black/40 border border-emerald-500/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-white">
                          <Target className="w-6 h-6 text-emerald-400" />
                          Performance Matrix
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={performanceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {performanceData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <ChartTooltip
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="bg-black/80 border border-emerald-500/20 rounded-lg p-3">
                                        <p className="text-white font-medium">{payload[0].payload.name}</p>
                                        <p className="text-emerald-400">{payload[0].value}%</p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="space-y-2 mt-4">
                          {performanceData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-white text-sm">{item.name}</span>
                              </div>
                              <span className="text-gray-400 text-sm">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="flow" className="space-y-8">
                  <Card className="bg-black/40 border border-emerald-500/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white">
                        <Zap className="w-6 h-6 text-emerald-400" />
                        Neural Flow Analytics
                        <Badge className="bg-emerald-500/20 text-emerald-400">
                          24H Stream
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={vibeFlowData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.1)" />
                            <XAxis dataKey="timestamp" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <ChartTooltip
                              content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  return (
                                    <div className="bg-black/90 border border-emerald-500/20 rounded-lg p-4">
                                      <p className="text-white font-medium">{label}</p>
                                      {payload.map((entry, index) => (
                                        <p key={index} style={{ color: entry.color }}>
                                          {entry.dataKey}: {entry.value?.toFixed(1)}%
                                        </p>
                                      ))}
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="productivity" 
                              stroke="#10B981" 
                              strokeWidth={3}
                              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="energy" 
                              stroke="#8B5CF6" 
                              strokeWidth={3}
                              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="focus" 
                              stroke="#06B6D4" 
                              strokeWidth={3}
                              dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="creativity" 
                              stroke="#F59E0B" 
                              strokeWidth={3}
                              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="intelligence" className="space-y-8">
                  <Card className="bg-black/40 border border-emerald-500/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white">
                        <Brain className="w-6 h-6 text-emerald-400" />
                        AI Intelligence Matrix
                        <Badge className="bg-purple-500/20 text-purple-400">
                          Neural Processing
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          {
                            title: "Pattern Recognition",
                            description: "Advanced neural pattern analysis reveals optimal coding sequences",
                            confidence: 97,
                            impact: "Revolutionary"
                          },
                          {
                            title: "Predictive Optimization",
                            description: "AI predicts and prevents performance bottlenecks before they occur",
                            confidence: 94,
                            impact: "Transformative"
                          },
                          {
                            title: "Flow State Amplification",
                            description: "Neural algorithms detect and extend deep work sessions",
                            confidence: 91,
                            impact: "Strategic"
                          },
                          {
                            title: "Context Awareness",
                            description: "Multi-dimensional context analysis for intelligent suggestions",
                            confidence: 89,
                            impact: "High"
                          },
                          {
                            title: "Adaptive Learning",
                            description: "System continuously evolves based on your development patterns",
                            confidence: 93,
                            impact: "Foundational"
                          },
                          {
                            title: "Quantum Processing",
                            description: "Advanced quantum-inspired algorithms for complex problem solving",
                            confidence: 88,
                            impact: "Experimental"
                          }
                        ].map((intelligence, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 rounded-xl bg-gradient-to-br from-purple-500/5 to-cyan-500/5 border border-purple-500/20"
                          >
                            <h4 className="text-lg font-semibold text-white mb-2">{intelligence.title}</h4>
                            <p className="text-gray-400 text-sm mb-4">{intelligence.description}</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Confidence</span>
                                <span className="text-purple-400 text-sm font-medium">{intelligence.confidence}%</span>
                              </div>
                              <Progress value={intelligence.confidence} className="h-2" />
                              <Badge className={`text-xs ${
                                intelligence.impact === 'Revolutionary' ? 'bg-emerald-500/20 text-emerald-400' :
                                intelligence.impact === 'Transformative' ? 'bg-purple-500/20 text-purple-400' :
                                intelligence.impact === 'Strategic' ? 'bg-cyan-500/20 text-cyan-400' :
                                intelligence.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                                intelligence.impact === 'Foundational' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {intelligence.impact}
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  );
}
