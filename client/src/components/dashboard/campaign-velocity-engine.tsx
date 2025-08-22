
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Clock, 
  TrendingUp, 
  Target, 
  Rocket, 
  CheckCircle, 
  AlertCircle, 
  PlayCircle,
  Settings,
  BarChart3,
  Timer,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface Campaign {
  id: string;
  name: string;
  stage: 'concept' | 'prototype' | 'test' | 'launch';
  progress: number;
  timeInStage: number; // hours
  totalTime: number; // hours
  priority: 'high' | 'medium' | 'low';
  type: 'feature' | 'marketing' | 'optimization';
  estimatedCompletion: number; // hours remaining
}

interface VelocityMetrics {
  averageConceptToLaunch: number; // hours
  industryAverage: number; // hours
  velocityScore: number; // 0-100
  activeCampaigns: number;
  completedThisWeek: number;
  averageStageTime: {
    concept: number;
    prototype: number;
    test: number;
    launch: number;
  };
}

export function CampaignVelocityEngine() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'AI Dashboard Analytics',
      stage: 'test',
      progress: 85,
      timeInStage: 2,
      totalTime: 14,
      priority: 'high',
      type: 'feature',
      estimatedCompletion: 3
    },
    {
      id: '2',
      name: 'User Onboarding Flow',
      stage: 'prototype',
      progress: 60,
      timeInStage: 4,
      totalTime: 8,
      priority: 'high',
      type: 'optimization',
      estimatedCompletion: 6
    },
    {
      id: '3',
      name: 'Performance Monitoring',
      stage: 'concept',
      progress: 25,
      timeInStage: 1,
      totalTime: 1,
      priority: 'medium',
      type: 'feature',
      estimatedCompletion: 12
    },
    {
      id: '4',
      name: 'Marketing Automation',
      stage: 'launch',
      progress: 100,
      timeInStage: 1,
      totalTime: 18,
      priority: 'high',
      type: 'marketing',
      estimatedCompletion: 0
    }
  ]);

  const velocityMetrics: VelocityMetrics = useMemo(() => {
    const completedCampaigns = campaigns.filter(c => c.stage === 'launch');
    const avgTime = completedCampaigns.length > 0 
      ? completedCampaigns.reduce((sum, c) => sum + c.totalTime, 0) / completedCampaigns.length 
      : 18;

    return {
      averageConceptToLaunch: avgTime,
      industryAverage: 1008, // 6 weeks = 42 days * 24 hours
      velocityScore: Math.min(Math.round((1008 / avgTime) * 10), 100),
      activeCampaigns: campaigns.filter(c => c.stage !== 'launch').length,
      completedThisWeek: completedCampaigns.length,
      averageStageTime: {
        concept: 3,
        prototype: 8,
        test: 4,
        launch: 3
      }
    };
  }, [campaigns]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCampaigns(prev => prev.map(campaign => {
        if (campaign.stage === 'launch') return campaign;

        const newTimeInStage = campaign.timeInStage + 0.1;
        let newProgress = campaign.progress;
        let newStage = campaign.stage;

        // Progress simulation based on stage
        if (campaign.stage === 'concept' && newProgress < 100) {
          newProgress = Math.min(campaign.progress + 2, 100);
        } else if (campaign.stage === 'prototype' && newProgress < 100) {
          newProgress = Math.min(campaign.progress + 1.5, 100);
        } else if (campaign.stage === 'test' && newProgress < 100) {
          newProgress = Math.min(campaign.progress + 1, 100);
        }

        // Stage progression
        if (newProgress >= 100) {
          switch (campaign.stage) {
            case 'concept':
              newStage = 'prototype';
              newProgress = 20;
              break;
            case 'prototype':
              newStage = 'test';
              newProgress = 30;
              break;
            case 'test':
              newStage = 'launch';
              newProgress = 100;
              break;
          }
        }

        return {
          ...campaign,
          progress: newProgress,
          stage: newStage,
          timeInStage: newStage === campaign.stage ? newTimeInStage : 0,
          totalTime: campaign.totalTime + 0.1
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStageIcon = (stage: Campaign['stage']) => {
    switch (stage) {
      case 'concept': return <Settings className="w-4 h-4" />;
      case 'prototype': return <PlayCircle className="w-4 h-4" />;
      case 'test': return <Activity className="w-4 h-4" />;
      case 'launch': return <Rocket className="w-4 h-4" />;
    }
  };

  const getStageColor = (stage: Campaign['stage']) => {
    switch (stage) {
      case 'concept': return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      case 'prototype': return 'bg-purple-500/20 border-purple-500/30 text-purple-400';
      case 'test': return 'bg-amber-500/20 border-amber-500/30 text-amber-400';
      case 'launch': return 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400';
    }
  };

  const getPriorityColor = (priority: Campaign['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Velocity Metrics Header */}
      <Card className="neo-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary animate-pulse" />
            Campaign Velocity Engine
          </CardTitle>
          <CardDescription>
            Lightning-fast concept to launch tracking - Force of Nature methodology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Speed Comparison */}
            <div className="text-center">
              <div className="relative">
                <div className="text-3xl font-bold gradient-text mb-1">
                  {velocityMetrics.averageConceptToLaunch.toFixed(1)}h
                </div>
                <div className="text-xs text-muted-foreground mb-2">Our Average</div>
                <div className="text-lg text-muted-foreground">vs</div>
                <div className="text-2xl font-medium text-muted-foreground mt-2">
                  {Math.round(velocityMetrics.industryAverage / 24)}d
                </div>
                <div className="text-xs text-muted-foreground">Industry Average</div>
              </div>
            </div>

            {/* Velocity Score */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-muted-foreground/20"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke="url(#velocityGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 30}`}
                    strokeDashoffset={`${2 * Math.PI * 30 * (1 - velocityMetrics.velocityScore / 100)}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="velocityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold gradient-text">{velocityMetrics.velocityScore}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Marketing Velocity Score</div>
            </div>

            {/* Active Campaigns */}
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {velocityMetrics.activeCampaigns}
              </div>
              <div className="text-xs text-muted-foreground mb-2">Active Campaigns</div>
              <div className="flex items-center justify-center gap-1">
                <Activity className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs text-primary">Live Tracking</span>
              </div>
            </div>

            {/* Weekly Completion */}
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">
                {velocityMetrics.completedThisWeek}
              </div>
              <div className="text-xs text-muted-foreground mb-2">Completed This Week</div>
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-400">+{((velocityMetrics.completedThisWeek / 4) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Campaign Pipeline */}
      <Card className="neo-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Live Campaign Pipeline
          </CardTitle>
          <CardDescription>
            Real-time tracking of campaigns through the Force of Nature methodology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {campaigns.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative"
                >
                  <div className="flex items-center space-x-4 p-4 rounded-lg border bg-gradient-to-r from-background to-accent/5">
                    {/* Campaign Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <Badge className={`text-xs ${getPriorityColor(campaign.priority)}`}>
                          {campaign.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {campaign.type}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {campaign.totalTime.toFixed(1)}h total
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {campaign.timeInStage.toFixed(1)}h in stage
                          </span>
                        </div>
                        {campaign.estimatedCompletion > 0 && (
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-400" />
                            <span className="text-sm text-amber-400">
                              {campaign.estimatedCompletion}h remaining
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium">{campaign.progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={campaign.progress} className="h-2" />
                      </div>

                      {/* Stage Pipeline */}
                      <div className="flex items-center space-x-2">
                        {(['concept', 'prototype', 'test', 'launch'] as const).map((stage, index) => (
                          <div key={stage} className="flex items-center">
                            <div className={`
                              flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all
                              ${campaign.stage === stage 
                                ? getStageColor(stage) + ' animate-pulse' 
                                : index < (['concept', 'prototype', 'test', 'launch'].indexOf(campaign.stage)) 
                                  ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                                  : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                              }
                            `}>
                              {index < (['concept', 'prototype', 'test', 'launch'].indexOf(campaign.stage)) ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                getStageIcon(stage)
                              )}
                            </div>
                            {index < 3 && (
                              <div className={`w-8 h-[2px] transition-all ${
                                index < (['concept', 'prototype', 'test', 'launch'].indexOf(campaign.stage)) 
                                  ? 'bg-emerald-400' 
                                  : 'bg-muted-foreground/30'
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Real-time indicator */}
                    {campaign.stage !== 'launch' && (
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse mb-2" />
                        <span className="text-xs text-primary font-medium">LIVE</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Stage Performance Analytics */}
      <Card className="neo-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Stage Performance Analytics
          </CardTitle>
          <CardDescription>
            Average time spent in each development stage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(velocityMetrics.averageStageTime).map(([stage, hours]) => (
              <div key={stage} className="text-center p-4 rounded-lg border bg-gradient-to-br from-background to-accent/5">
                <div className="mb-2">
                  {getStageIcon(stage as Campaign['stage'])}
                </div>
                <div className="text-2xl font-bold mb-1">{hours}h</div>
                <div className="text-xs text-muted-foreground capitalize">{stage}</div>
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000"
                    style={{ width: `${(hours / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
