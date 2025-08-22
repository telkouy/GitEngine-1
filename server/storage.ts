import { type User, type InsertUser, type Commit, type InsertCommit, type Insight, type InsertInsight, type Documentation, type InsertDocumentation, type OKR, type InsertOKR, type Achievement, type InsertAchievement, type Integration, type InsertIntegration, type NextStep, type InsertNextStep, type DailyStats, type InsertDailyStats } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Dashboard data
  getDailyStats(userId: string): Promise<DailyStats | undefined>;
  getCommits(userId: string): Promise<Commit[]>;
  getInsights(userId: string): Promise<Insight[]>;
  getDocumentation(userId: string): Promise<Documentation[]>;
  getOKRs(userId: string): Promise<OKR[]>;
  getAchievements(userId: string): Promise<Achievement[]>;
  getIntegrations(userId: string): Promise<Integration[]>;
  getNextSteps(userId: string): Promise<NextStep[]>;

  // Create methods
  createCommit(commit: InsertCommit): Promise<Commit>;
  createInsight(insight: InsertInsight): Promise<Insight>;
  createDocumentation(doc: InsertDocumentation): Promise<Documentation>;
  createOKR(okr: InsertOKR): Promise<OKR>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  createIntegration(integration: InsertIntegration): Promise<Integration>;
  createNextStep(nextStep: InsertNextStep): Promise<NextStep>;
  updateDailyStats(userId: string, stats: Partial<InsertDailyStats>): Promise<DailyStats>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private commits: Map<string, Commit>;
  private insights: Map<string, Insight>;
  private documentation: Map<string, Documentation>;
  private okrs: Map<string, OKR>;
  private achievements: Map<string, Achievement>;
  private integrations: Map<string, Integration>;
  private nextSteps: Map<string, NextStep>;
  private dailyStats: Map<string, DailyStats>;

  constructor() {
    this.users = new Map();
    this.commits = new Map();
    this.insights = new Map();
    this.documentation = new Map();
    this.okrs = new Map();
    this.achievements = new Map();
    this.integrations = new Map();
    this.nextSteps = new Map();
    this.dailyStats = new Map();

    this.seedData();
  }

  private seedData() {
    // Create demo user
    const userId = "demo-user";
    const user: User = {
      id: userId,
      username: "demo",
      password: "password",
      name: "Camila Pisano",
      email: "camila@vibecoders.dev",
      timezone: "America/New_York",
      theme: "auto",
      createdAt: new Date(),
    };
    this.users.set(userId, user);

    // Daily stats with realistic variations
    const dailyStats: DailyStats = {
      id: randomUUID(),
      commitsToday: 12,
      insightsGenerated: 8,
      hoursLogged: 7.5,
      docsUpdated: 4,
      userId,
      date: new Date(),
    };
    this.dailyStats.set(userId, dailyStats);

    // Extended commits data with more variety
    const commits: Commit[] = [
      {
        id: randomUUID(),
        hash: "a1b2c3d",
        message: "feat: Add Vibelytics API integration for client dashboard",
        project: "Vibe Analytics Dashboard", 
        impact: "Revenue Attribution",
        valueScore: 9,
        userId,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
      {
        id: randomUUID(),
        hash: "e4f5g6h",
        message: "feat: Implement real-time campaign performance tracking",
        project: "VibeMotors CRM",
        impact: "Campaign Optimization",
        valueScore: 8,
        userId,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "i7j8k9l",
        message: "fix: Resolve async communication bug in notification system",
        project: "Internal Tools",
        impact: "Team Productivity",
        valueScore: 7,
        userId,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "m3n4o5p",
        message: "refactor: Add TypeScript interfaces for data models",
        project: "VibeForce Platform",
        impact: "Code Quality",
        valueScore: 6,
        userId,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "q6r7s8t",
        message: "perf: Optimize database queries for user analytics",
        project: "Vibe Analytics Dashboard",
        impact: "Performance",
        valueScore: 9,
        userId,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "u9v0w1x",
        message: "feat: Create responsive mobile layout for dashboard",
        project: "VibeMotors CRM",
        impact: "User Experience",
        valueScore: 8,
        userId,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "y2z3a4b",
        message: "test: Implement automated testing suite",
        project: "Internal Tools",
        impact: "Code Quality",
        valueScore: 7,
        userId,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "c5d6e7f",
        message: "feat: Add multi-language support for client portals",
        project: "VibeForce Platform",
        impact: "Internationalization",
        valueScore: 8,
        userId,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "g8h9i0j",
        message: "feat: Integrate Stripe payment processing",
        project: "Vibe Analytics Dashboard",
        impact: "Revenue Features",
        valueScore: 9,
        userId,
        createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "k1l2m3n",
        message: "ci: Setup CI/CD pipeline with GitHub Actions",
        project: "VibeMotors CRM",
        impact: "DevOps",
        valueScore: 7,
        userId,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "o4p5q6r",
        message: "feat: Add WebSocket support for real-time updates",
        project: "Internal Tools",
        impact: "Real-time Features",
        valueScore: 8,
        userId,
        createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "s7t8u9v",
        message: "feat: Create admin dashboard for user management",
        project: "VibeForce Platform",
        impact: "Admin Tools",
        valueScore: 6,
        userId,
        createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
      },
      // Additional commits for more realistic data
      {
        id: randomUUID(),
        hash: "z9x8v7w",
        message: "fix: Handle edge case in email validation",
        project: "Vibe Analytics Dashboard",
        impact: "Bug Fix",
        valueScore: 5,
        userId,
        createdAt: new Date(Date.now() - 42 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "n5m6l7k",
        message: "docs: Update API documentation with examples",
        project: "VibeForce Platform",
        impact: "Documentation",
        valueScore: 4,
        userId,
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "p2q3r4s",
        message: "style: Improve dark mode contrast ratios",
        project: "VibeMotors CRM",
        impact: "Accessibility",
        valueScore: 6,
        userId,
        createdAt: new Date(Date.now() - 54 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "t8u9v0w",
        message: "feat: Add export functionality for reports",
        project: "Vibe Analytics Dashboard",
        impact: "Feature Enhancement",
        valueScore: 7,
        userId,
        createdAt: new Date(Date.now() - 60 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "b4c5d6e",
        message: "refactor: Extract reusable chart components",
        project: "Internal Tools",
        impact: "Code Reusability",
        valueScore: 6,
        userId,
        createdAt: new Date(Date.now() - 66 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "f1g2h3i",
        message: "security: Update dependencies and fix vulnerabilities",
        project: "VibeForce Platform",
        impact: "Security",
        valueScore: 8,
        userId,
        createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "j7k8l9m",
        message: "perf: Implement lazy loading for dashboard widgets",
        project: "VibeMotors CRM",
        impact: "Performance",
        valueScore: 7,
        userId,
        createdAt: new Date(Date.now() - 78 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "x3y4z5a",
        message: "feat: Add data filtering and search capabilities",
        project: "Vibe Analytics Dashboard",
        impact: "User Experience",
        valueScore: 8,
        userId,
        createdAt: new Date(Date.now() - 84 * 60 * 60 * 1000),
      },
    ];
    commits.forEach(commit => this.commits.set(commit.id, commit));

    // Extended mock insights data with more variety for all categories
    const insights: Insight[] = [
      {
        id: randomUUID(),
        title: "Peak Productivity Pattern Detected",
        description: "Your commits between 6-10 AM have 40% higher business impact scores",
        category: "Performance",
        impact: "High Impact",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Documentation Debt Alert",
        description: "3 new functions added without docstrings in client projects",
        category: "Code Quality",
        impact: "Medium Impact",
        userId,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Client Communication Excellence",
        description: "Your technical translations helped close $50K renewal with VibeRing",
        category: "Business Impact",
        impact: "High Impact",
        userId,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "API Response Time Optimization",
        description: "Database query improvements reduced API response time by 35%",
        category: "Performance",
        impact: "High Impact",
        userId,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Mobile User Experience Boost",
        description: "Responsive design changes increased mobile engagement by 22%",
        category: "User Experience",
        impact: "Medium Impact",
        userId,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Code Coverage Milestone",
        description: "Test suite coverage reached 85% across all critical modules",
        category: "Code Quality",
        impact: "Medium Impact",
        userId,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Deployment Frequency Increase",
        description: "CI/CD improvements enabled 3x faster deployment cycles",
        category: "DevOps",
        impact: "High Impact",
        userId,
        createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Security Vulnerability Prevention",
        description: "Proactive code review caught 5 potential security issues",
        category: "Security",
        impact: "High Impact",
        userId,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Cross-Team Knowledge Transfer",
        description: "Documentation efforts reduced onboarding time by 40%",
        category: "Team Collaboration",
        impact: "Medium Impact",
        userId,
        createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Revenue Feature Launch Success",
        description: "Payment integration generated $25K in first week",
        category: "Business Impact",
        impact: "High Impact",
        userId,
        createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
      },
      // Additional insights for more variety
      {
        id: randomUUID(),
        title: "Technical Debt Reduction Opportunity",
        description: "Legacy components in dashboard could be modernized to improve maintainability",
        category: "Code Quality",
        impact: "Medium Impact",
        userId,
        createdAt: new Date(Date.now() - 42 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "User Engagement Analytics",
        description: "New dashboard features show 35% increase in daily active users",
        category: "Analytics",
        impact: "High Impact",
        userId,
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Error Handling Enhancement",
        description: "Improved error boundaries reduced client-side crashes by 60%",
        category: "User Experience",
        impact: "High Impact",
        userId,
        createdAt: new Date(Date.now() - 54 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Performance Budget Alert",
        description: "Bundle size increased by 15% - consider code splitting strategies",
        category: "Performance",
        impact: "Medium Impact",
        userId,
        createdAt: new Date(Date.now() - 60 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Accessibility Compliance Achievement",
        description: "Recent updates brought WCAG compliance to 98% across all pages",
        category: "Accessibility",
        impact: "Medium Impact",
        userId,
        createdAt: new Date(Date.now() - 66 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "API Rate Limit Optimization",
        description: "Smart caching reduced external API calls by 45%",
        category: "Performance",
        impact: "High Impact",
        userId,
        createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Team Velocity Improvement",
        description: "Sprint completion rate increased to 95% after workflow optimization",
        category: "Team Collaboration",
        impact: "High Impact",
        userId,
        createdAt: new Date(Date.now() - 78 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Data Visualization Enhancement",
        description: "Interactive charts improved user data comprehension by 40%",
        category: "User Experience",
        impact: "Medium Impact",
        userId,
        createdAt: new Date(Date.now() - 84 * 60 * 60 * 1000),
      },
    ];
    insights.forEach(insight => this.insights.set(insight.id, insight));

    // Extended documentation data
    const docs: Documentation[] = [
      {
        id: randomUUID(),
        title: "Vibelytics API Integration Guide",
        type: "Technical Spec",
        status: "Complete",
        isAutoGenerated: true,
        userId,
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "VibeForce Onboarding Playbook",
        type: "Process Documentation",
        status: "In Progress",
        isAutoGenerated: false,
        userId,
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Vibe Analytics Dashboard Architecture",
        type: "System Design",
        status: "Complete",
        isAutoGenerated: true,
        userId,
        updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "VibeMotors CRM User Manual",
        type: "User Guide",
        status: "Complete",
        isAutoGenerated: false,
        userId,
        updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Database Schema Documentation",
        type: "Technical Spec",
        status: "Complete",
        isAutoGenerated: true,
        userId,
        updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Payment Processing Implementation",
        type: "Technical Spec",
        status: "In Progress",
        isAutoGenerated: false,
        userId,
        updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Mobile App Development Standards",
        type: "Process Documentation",
        status: "Complete",
        isAutoGenerated: false,
        userId,
        updatedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "CI/CD Pipeline Configuration",
        type: "DevOps Guide",
        status: "Complete",
        isAutoGenerated: true,
        userId,
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Security Best Practices Guide",
        type: "Security Documentation",
        status: "In Progress",
        isAutoGenerated: false,
        userId,
        updatedAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "WebSocket Real-time Features",
        type: "Technical Spec",
        status: "Complete",
        isAutoGenerated: true,
        userId,
        updatedAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
      },
    ];
    docs.forEach(doc => this.documentation.set(doc.id, doc));

    // Extended OKRs data
    const okrsList: OKR[] = [
      {
        id: randomUUID(),
        title: "Master Vibelytics API Integration",
        category: "Technical Skills",
        progress: 95,
        target: "End of Month",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Complete VibeForce Onboarding",
        category: "Company Integration",
        progress: 85,
        target: "This Week",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Launch Attribution Dashboard MVP",
        category: "Product Delivery",
        progress: 90,
        target: "Next Week",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Establish Strategic Client Partnerships",
        category: "Leadership Growth",
        progress: 65,
        target: "End of Quarter",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Implement CI/CD Best Practices",
        category: "DevOps Excellence",
        progress: 78,
        target: "Next Month",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Achieve 90% Test Coverage",
        category: "Code Quality",
        progress: 85,
        target: "End of Sprint",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Optimize Database Performance",
        category: "Technical Excellence",
        progress: 70,
        target: "Next Quarter",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Lead Junior Developer Mentoring",
        category: "Leadership Growth",
        progress: 45,
        target: "Ongoing",
        userId,
        createdAt: new Date(),
      },
    ];
    okrsList.forEach(okr => this.okrs.set(okr.id, okr));

    // Extended achievements data
    const achievementsList: Achievement[] = [
      {
        id: randomUUID(),
        title: "Code Quality Champion",
        description: "Maintained 95%+ code quality score for 7 days",
        icon: "🏆",
        unlockedAt: new Date(),
        userId,
      },
      {
        id: randomUUID(),
        title: "Documentation Master",
        description: "Auto-generated docs for 5 consecutive projects",
        icon: "📚",
        unlockedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        userId,
      },
      {
        id: randomUUID(),
        title: "Performance Optimizer",
        description: "Improved API response times by 35%",
        icon: "⚡",
        unlockedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        userId,
      },
      {
        id: randomUUID(),
        title: "Revenue Generator",
        description: "Features launched generated $50K+ in revenue",
        icon: "💰",
        unlockedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        userId,
      },
      {
        id: randomUUID(),
        title: "Security Guardian",
        description: "Prevented 5 potential security vulnerabilities",
        icon: "🛡️",
        unlockedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
        userId,
      },
      {
        id: randomUUID(),
        title: "DevOps Ninja",
        description: "Setup automated deployment pipeline",
        icon: "🥷",
        unlockedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        userId,
      },
      {
        id: randomUUID(),
        title: "Team Collaborator",
        description: "Mentored 3 junior developers this month",
        icon: "🤝",
        unlockedAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
        userId,
      },
      {
        id: randomUUID(),
        title: "Innovation Driver",
        description: "Proposed and implemented 3 new features",
        icon: "💡",
        unlockedAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
        userId,
      },
    ];
    achievementsList.forEach(achievement => this.achievements.set(achievement.id, achievement));

    // Extended integrations data with more services
    const integrationsList: Integration[] = [
      {
        id: randomUUID(),
        name: "GitHub",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "Slack",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "Notion",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "Linear",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "Vibelytics",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "Stripe",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "Sentry",
        status: "Needs Auth",
        userId,
      },
      {
        id: randomUUID(),
        name: "Vercel",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "OpenAI",
        status: "Needs Auth",
        userId,
      },
      {
        id: randomUUID(),
        name: "Discord",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "Figma",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "Jira",
        status: "Disconnected",
        userId,
      },
      {
        id: randomUUID(),
        name: "AWS",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "Docker Hub",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "MongoDB Atlas",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "PostHog",
        status: "Needs Auth",
        userId,
      },
      {
        id: randomUUID(),
        name: "Mixpanel",
        status: "Disconnected",
        userId,
      },
      {
        id: randomUUID(),
        name: "Zapier",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "Supabase",
        status: "Connected",
        userId,
      },
      {
        id: randomUUID(),
        name: "Tailwind UI",
        status: "Connected",
        userId,
      },
    ];
    integrationsList.forEach(integration => this.integrations.set(integration.id, integration));

    // Extended next steps data
    const nextStepsList: NextStep[] = [
      {
        id: randomUUID(),
        title: "Review VibeMotors campaign performance data",
        priority: "High Priority",
        estimatedTime: "Est. 2 hours",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Update API documentation for new endpoints",
        priority: "Medium Priority",
        estimatedTime: "Est. 1 hour",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Prepare weekly sync update for leadership team",
        priority: "High Priority",
        estimatedTime: "Est. 30 minutes",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Optimize database queries for Vibe Analytics",
        priority: "High Priority",
        estimatedTime: "Est. 3 hours",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Implement unit tests for payment processing",
        priority: "Medium Priority",
        estimatedTime: "Est. 4 hours",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Set up monitoring for production deployment",
        priority: "High Priority",
        estimatedTime: "Est. 2.5 hours",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Create mobile responsive layouts",
        priority: "Medium Priority",
        estimatedTime: "Est. 6 hours",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Research AI integration opportunities",
        priority: "Low Priority",
        estimatedTime: "Est. 1.5 hours",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Conduct code review for junior developer PRs",
        priority: "Medium Priority",
        estimatedTime: "Est. 45 minutes",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Update security dependencies",
        priority: "High Priority",
        estimatedTime: "Est. 1 hour",
        userId,
        createdAt: new Date(),
      },
    ];
    nextStepsList.forEach(nextStep => this.nextSteps.set(nextStep.id, nextStep));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getDailyStats(userId: string): Promise<DailyStats | undefined> {
    return this.dailyStats.get(userId);
  }

  async getCommits(userId: string): Promise<Commit[]> {
    return Array.from(this.commits.values()).filter(commit => commit.userId === userId);
  }

  async getInsights(userId: string): Promise<Insight[]> {
    return Array.from(this.insights.values()).filter(insight => insight.userId === userId);
  }

  async getDocumentation(userId: string): Promise<Documentation[]> {
    return Array.from(this.documentation.values()).filter(doc => doc.userId === userId);
  }

  async getOKRs(userId: string): Promise<OKR[]> {
    return Array.from(this.okrs.values()).filter(okr => okr.userId === userId);
  }

  async getAchievements(userId: string): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(achievement => achievement.userId === userId);
  }

  async getIntegrations(userId: string): Promise<Integration[]> {
    return Array.from(this.integrations.values()).filter(integration => integration.userId === userId);
  }

  async getNextSteps(userId: string): Promise<NextStep[]> {
    return Array.from(this.nextSteps.values()).filter(nextStep => nextStep.userId === userId);
  }

  async createCommit(insertCommit: InsertCommit): Promise<Commit> {
    const id = randomUUID();
    const commit: Commit = { ...insertCommit, id, createdAt: new Date() };
    this.commits.set(id, commit);
    return commit;
  }

  async createInsight(insertInsight: InsertInsight): Promise<Insight> {
    const id = randomUUID();
    const insight: Insight = { ...insertInsight, id, createdAt: new Date() };
    this.insights.set(id, insight);
    return insight;
  }

  async createDocumentation(insertDoc: InsertDocumentation): Promise<Documentation> {
    const id = randomUUID();
    const doc: Documentation = { ...insertDoc, id, updatedAt: new Date() };
    this.documentation.set(id, doc);
    return doc;
  }

  async createOKR(insertOkr: InsertOKR): Promise<OKR> {
    const id = randomUUID();
    const okr: OKR = { ...insertOkr, id, createdAt: new Date() };
    this.okrs.set(id, okr);
    return okr;
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = randomUUID();
    const achievement: Achievement = { ...insertAchievement, id, unlockedAt: new Date() };
    this.achievements.set(id, achievement);
    return achievement;
  }

  async createIntegration(insertIntegration: InsertIntegration): Promise<Integration> {
    const id = randomUUID();
    const integration: Integration = { ...insertIntegration, id };
    this.integrations.set(id, integration);
    return integration;
  }

  async createNextStep(insertNextStep: InsertNextStep): Promise<NextStep> {
    const id = randomUUID();
    const nextStep: NextStep = { ...insertNextStep, id, createdAt: new Date() };
    this.nextSteps.set(id, nextStep);
    return nextStep;
  }

  async updateDailyStats(userId: string, statsUpdate: Partial<InsertDailyStats>): Promise<DailyStats> {
    const existing = this.dailyStats.get(userId);
    const updated: DailyStats = {
      id: existing?.id || randomUUID(),
      commitsToday: statsUpdate.commitsToday || existing?.commitsToday || 0,
      insightsGenerated: statsUpdate.insightsGenerated || existing?.insightsGenerated || 0,
      hoursLogged: statsUpdate.hoursLogged || existing?.hoursLogged || 0,
      docsUpdated: statsUpdate.docsUpdated || existing?.docsUpdated || 0,
      userId,
      date: new Date(),
    };
    this.dailyStats.set(userId, updated);
    return updated;
  }

  // AI Auto-generated Documentation Methods
  async getAutoGeneratedDocs(userId: string): Promise<Documentation[]> {
    return Array.from(this.documentation.values())
      .filter(doc => doc.userId === userId && doc.isAutoGenerated)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async generateUserStoryFromCommits(userId: string, projectName: string): Promise<Documentation> {
    const projectCommits = Array.from(this.commits.values())
      .filter(commit => commit.userId === userId && commit.project === projectName)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const storyContent = this.buildUserStoryFromCommits(projectCommits);
    
    const userStory: Documentation = {
      id: randomUUID(),
      title: `Historia de Usuario: ${projectName}`,
      type: "User Story",
      status: "Complete",
      isAutoGenerated: true,
      userId,
      updatedAt: new Date(),
      content: storyContent,
    };

    this.documentation.set(userStory.id, userStory);
    return userStory;
  }

  async generateTechnicalDocFromCommits(userId: string, projectName: string): Promise<Documentation> {
    const projectCommits = Array.from(this.commits.values())
      .filter(commit => commit.userId === userId && commit.project === projectName)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const techContent = this.buildTechnicalDocFromCommits(projectCommits);
    
    const techDoc: Documentation = {
      id: randomUUID(),
      title: `Documentación Técnica: ${projectName}`,
      type: "Technical Documentation",
      status: "Complete",
      isAutoGenerated: true,
      userId,
      updatedAt: new Date(),
      content: techContent,
    };

    this.documentation.set(techDoc.id, techDoc);
    return techDoc;
  }

  private buildUserStoryFromCommits(commits: Commit[]): string {
    const features = commits.filter(c => c.message.startsWith('feat:'));
    const fixes = commits.filter(c => c.message.startsWith('fix:'));
    const improvements = commits.filter(c => c.message.startsWith('refactor:') || c.message.startsWith('perf:'));

    return `# Historia del Desarrollo

## 🎯 Evolución del Producto

### Características Principales Desarrolladas
${features.map(commit => `- **${commit.message.replace('feat: ', '')}**
  - Impacto: ${commit.impact}
  - Valor de Negocio: ${commit.valueScore}/10
  - Fecha: ${commit.createdAt.toLocaleDateString()}`).join('\n\n')}

### Problemas Resueltos
${fixes.map(commit => `- **${commit.message.replace('fix: ', '')}**
  - Impacto: ${commit.impact}
  - Fecha: ${commit.createdAt.toLocaleDateString()}`).join('\n\n')}

### Optimizaciones Implementadas
${improvements.map(commit => `- **${commit.message.replace(/^(refactor|perf): /, '')}**
  - Impacto: ${commit.impact}
  - Fecha: ${commit.createdAt.toLocaleDateString()}`).join('\n\n')}

## 📊 Métricas de Desarrollo
- **Total de commits**: ${commits.length}
- **Valor promedio**: ${(commits.reduce((sum, c) => sum + c.valueScore, 0) / commits.length).toFixed(1)}/10
- **Período de desarrollo**: ${commits[0]?.createdAt.toLocaleDateString()} - ${commits[commits.length - 1]?.createdAt.toLocaleDateString()}

*Documentación generada automáticamente por VibeAI*`;
  }

  private buildTechnicalDocFromCommits(commits: Commit[]): string {
    const featureCommits = commits.filter(c => c.message.startsWith('feat:'));
    const refactorCommits = commits.filter(c => c.message.startsWith('refactor:'));
    const testCommits = commits.filter(c => c.message.startsWith('test:'));
    const styleCommits = commits.filter(c => c.message.startsWith('style:'));

    return `# Documentación Técnica

## 🏗️ Arquitectura y Componentes

### Nuevas Funcionalidades
${featureCommits.map(commit => `#### ${commit.message.replace('feat: ', '')}
- **Hash**: \`${commit.hash}\`
- **Impacto Técnico**: ${commit.impact}
- **Valor de Implementación**: ${commit.valueScore}/10
- **Fecha**: ${commit.createdAt.toLocaleDateString()}
`).join('\n')}

### Refactorizaciones y Optimizaciones
${refactorCommits.map(commit => `#### ${commit.message.replace('refactor: ', '')}
- **Hash**: \`${commit.hash}\`
- **Tipo de Mejora**: ${commit.impact}
- **Fecha**: ${commit.createdAt.toLocaleDateString()}
`).join('\n')}

### Testing y Calidad
${testCommits.map(commit => `#### ${commit.message.replace('test: ', '')}
- **Hash**: \`${commit.hash}\`
- **Cobertura**: ${commit.impact}
- **Fecha**: ${commit.createdAt.toLocaleDateString()}
`).join('\n')}

## 🎨 Mejoras de UI/UX
${styleCommits.map(commit => `#### ${commit.message.replace('style: ', '')}
- **Hash**: \`${commit.hash}\`
- **Tipo**: ${commit.impact}
- **Fecha**: ${commit.createdAt.toLocaleDateString()}
`).join('\n')}

## 📈 Estadísticas del Proyecto
- **Commits totales**: ${commits.length}
- **Score promedio de valor**: ${(commits.reduce((sum, c) => sum + c.valueScore, 0) / commits.length).toFixed(1)}/10
- **Commits de alto impacto**: ${commits.filter(c => c.valueScore >= 8).length}

*Generado automáticamente por VibeAI Analysis Engine*`;
  }
}

export const storage = new MemStorage();


// Mock data storage
const mockUser = {
  id: "71717f70-547f-41e7-9a17-071e3e4694f1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  role: "Senior Full-Stack Developer",
  timezone: "America/New_York",
  theme: "dark",
  joinedAt: "2023-01-15",
  settings: {
    notifications: true,
    compactMode: false,
    autoSave: true
  }
};

// Extended mock insights data
const mockInsights = [
  {
    id: "insight-1",
    category: "Performance",
    title: "Database Query Optimization Opportunity",
    content: "Your recent user authentication queries could be optimized by adding an index on the email field. This could reduce query time by up to 60%.",
    priority: "high",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    tags: ["database", "performance", "optimization"],
    impact: "High",
    estimatedSavings: "200ms per query"
  },
  {
    id: "insight-2", 
    category: "Code Quality",
    title: "Component Reusability Pattern Detected",
    content: "You've created similar button components in 3 different files. Consider extracting this into a shared component library to improve maintainability.",
    priority: "medium",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    tags: ["refactoring", "components", "DRY"],
    impact: "Medium",
    estimatedSavings: "15 minutes per new button implementation"
  },
  {
    id: "insight-3",
    category: "Business Impact", 
    title: "User Engagement Spike Correlation",
    content: "The new dashboard features released last week correlate with a 23% increase in user engagement. Consider similar patterns for future releases.",
    priority: "low",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    tags: ["analytics", "user-engagement", "features"],
    impact: "High",
    estimatedSavings: "Potential 25% revenue increase"
  },
  {
    id: "insight-4",
    category: "Performance",
    title: "Memory Usage Optimization",
    content: "Your React components are holding onto unnecessary state. Implementing useCallback and useMemo could reduce memory usage by 30%.",
    priority: "high",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    tags: ["react", "memory", "hooks"],
    impact: "Medium",
    estimatedSavings: "Improved app responsiveness"
  },
  {
    id: "insight-5",
    category: "Code Quality",
    title: "TypeScript Coverage Analysis",
    content: "Current TypeScript coverage is at 78%. Adding type definitions to 5 more files would bring you to the target 85% coverage.",
    priority: "medium",
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
    tags: ["typescript", "coverage", "quality"],
    impact: "Medium",
    estimatedSavings: "Reduced runtime errors"
  },
  {
    id: "insight-6",
    category: "Business Impact",
    title: "API Response Time Impact Analysis",
    content: "Your recent API optimizations resulted in 40% faster response times, directly correlating with 18% reduction in user bounce rate.",
    priority: "low",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    tags: ["api", "performance", "user-experience"],
    impact: "High",
    estimatedSavings: "Better user retention"
  }
];

// Extended mock commits data
const mockCommits = [
  {
    id: "commit-1",
    hash: "a7b3d4e",
    message: "feat: implement advanced dashboard analytics",
    author: "Alex Johnson",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    branch: "feature/analytics-dashboard",
    files: ["src/components/analytics.tsx", "src/lib/analytics-utils.ts"],
    additions: 234,
    deletions: 12,
    impact: "high"
  },
  {
    id: "commit-2", 
    hash: "f9c2a1b",
    message: "fix: resolve WebSocket connection stability issues",
    author: "Alex Johnson",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    branch: "bugfix/websocket-stability",
    files: ["server/websocket.ts", "client/hooks/use-websocket.ts"],
    additions: 67,
    deletions: 45,
    impact: "critical"
  },
  {
    id: "commit-3",
    hash: "e5d8c7a",
    message: "refactor: optimize database query performance",
    author: "Alex Johnson", 
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    branch: "refactor/db-optimization",
    files: ["server/db/queries.ts", "server/routes/users.ts"],
    additions: 89,
    deletions: 156,
    impact: "medium"
  },
  {
    id: "commit-4",
    hash: "b4f6e9d",
    message: "feat: add real-time notification system",
    author: "Alex Johnson",
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
    branch: "feature/notifications",
    files: ["src/components/ui/notification-center.tsx", "server/events/notifications.ts"],
    additions: 445,
    deletions: 23,
    impact: "high"
  },
  {
    id: "commit-5",
    hash: "c8a3b7f",
    message: "docs: update API documentation with new endpoints",
    author: "Alex Johnson",
    timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000),
    branch: "docs/api-updates",
    files: ["docs/api.md", "docs/examples.md"],
    additions: 178,
    deletions: 34,
    impact: "low"
  },
  {
    id: "commit-6",
    hash: "d2e5f8c",
    message: "test: add comprehensive unit tests for auth module",
    author: "Alex Johnson",
    timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000),
    branch: "test/auth-coverage",
    files: ["tests/auth.test.ts", "tests/helpers/auth-mocks.ts"],
    additions: 267,
    deletions: 8,
    impact: "medium"
  },
  {
    id: "commit-7",
    hash: "g7h4k9n",
    message: "style: implement dark mode theme consistency",
    author: "Alex Johnson",
    timestamp: new Date(Date.now() - 13 * 60 * 60 * 1000),
    branch: "style/dark-mode",
    files: ["src/styles/themes.css", "src/components/ui/theme-provider.tsx"],
    additions: 123,
    deletions: 67,
    impact: "low"
  }
];

// Extended mock documents data  
const mockDocuments = [
  {
    id: "doc-1",
    title: "API Integration Guide",
    type: "guide",
    status: "updated",
    lastModified: new Date(Date.now() - 30 * 60 * 1000),
    author: "Alex Johnson",
    content: "Comprehensive guide for integrating with our REST API endpoints...",
    tags: ["api", "integration", "documentation"],
    version: "2.1.0"
  },
  {
    id: "doc-2",
    title: "Database Schema Documentation", 
    type: "technical",
    status: "new",
    lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000),
    author: "Alex Johnson",
    content: "Detailed documentation of the current database schema and relationships...",
    tags: ["database", "schema", "technical"],
    version: "1.0.0"
  },
  {
    id: "doc-3",
    title: "Component Library Reference",
    type: "reference",
    status: "updated",
    lastModified: new Date(Date.now() - 4 * 60 * 60 * 1000),
    author: "Alex Johnson",
    content: "Reference documentation for all UI components in the design system...",
    tags: ["components", "ui", "reference"],
    version: "1.3.2"
  },
  {
    id: "doc-4",
    title: "Deployment and CI/CD Pipeline",
    type: "guide",
    status: "updated",
    lastModified: new Date(Date.now() - 6 * 60 * 60 * 1000),
    author: "Alex Johnson", 
    content: "Step-by-step guide for deployment procedures and CI/CD setup...",
    tags: ["deployment", "cicd", "devops"],
    version: "1.2.1"
  }
];

// Extended achievements data
const mockAchievements = [
  {
    id: "achievement-1",
    title: "Code Quality Champion",
    description: "Maintained 90%+ code quality score for 30 days",
    icon: "🏆",
    unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    category: "quality",
    rarity: "gold"
  },
  {
    id: "achievement-2",
    title: "Speed Demon",
    description: "Completed 50 commits in a single day", 
    icon: "⚡",
    unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    category: "productivity",
    rarity: "silver"
  },
  {
    id: "achievement-3",
    title: "Documentation Master",
    description: "Created comprehensive documentation for 10+ features",
    icon: "📚",
    unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    category: "documentation", 
    rarity: "bronze"
  },
  {
    id: "achievement-4",
    title: "Bug Squasher",
    description: "Fixed 100 critical bugs",
    icon: "🐛",
    unlockedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    category: "debugging",
    rarity: "gold"
  },
  {
    id: "achievement-5",
    title: "Team Player",
    description: "Helped review 50+ pull requests",
    icon: "🤝",
    unlockedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    category: "collaboration",
    rarity: "silver"
  }
];

// Extended OKRs (Objectives and Key Results)
const mockOkrs = [
  {
    id: "okr-1",
    objective: "Improve Application Performance",
    progress: 75,
    target: 100,
    keyResults: [
      { description: "Reduce API response time by 50%", progress: 85, target: 100 },
      { description: "Achieve 95+ Lighthouse score", progress: 78, target: 100 },
      { description: "Optimize bundle size by 30%", progress: 62, target: 100 }
    ],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    category: "performance"
  },
  {
    id: "okr-2", 
    objective: "Enhance Code Quality Standards",
    progress: 88,
    target: 100,
    keyResults: [
      { description: "Achieve 90% test coverage", progress: 92, target: 100 },
      { description: "Reduce technical debt by 40%", progress: 76, target: 100 },
      { description: "Implement automated code review", progress: 95, target: 100 }
    ],
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    category: "quality"
  },
  {
    id: "okr-3",
    objective: "Accelerate Development Velocity", 
    progress: 65,
    target: 100,
    keyResults: [
      { description: "Reduce deployment time by 60%", progress: 70, target: 100 },
      { description: "Increase feature delivery by 25%", progress: 55, target: 100 },
      { description: "Implement automated testing pipeline", progress: 80, target: 100 }
    ],
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    category: "velocity"
  }
];

// Analytics data for charts
const mockAnalyticsData = {
  commitActivity: {
    daily: [
      { date: "2024-01-15", commits: 5, additions: 234, deletions: 67 },
      { date: "2024-01-16", commits: 8, additions: 456, deletions: 123 },
      { date: "2024-01-17", commits: 3, additions: 189, deletions: 45 },
      { date: "2024-01-18", commits: 12, additions: 678, deletions: 234 },
      { date: "2024-01-19", commits: 7, additions: 345, deletions: 89 },
      { date: "2024-01-20", commits: 9, additions: 567, deletions: 156 },
      { date: "2024-01-21", commits: 6, additions: 298, deletions: 78 }
    ],
    weekly: [
      { week: "Week 1", commits: 28, productivity: 85 },
      { week: "Week 2", commits: 34, productivity: 92 },
      { week: "Week 3", commits: 25, productivity: 78 },
      { week: "Week 4", commits: 31, productivity: 88 }
    ]
  },
  performanceMetrics: {
    codeQuality: [
      { month: "Oct", score: 82 },
      { month: "Nov", score: 85 },
      { month: "Dec", score: 87 },
      { month: "Jan", score: 89 }
    ],
    buildTimes: [
      { date: "2024-01-15", buildTime: 45 },
      { date: "2024-01-16", buildTime: 38 },
      { date: "2024-01-17", buildTime: 42 },
      { date: "2024-01-18", buildTime: 35 },
      { date: "2024-01-19", buildTime: 40 },
      { date: "2024-01-20", buildTime: 33 },
      { date: "2024-01-21", buildTime: 36 }
    ]
  }
};

// Projects data
const mockProjects = [
  {
    id: "project-1",
    name: "E-commerce Platform",
    description: "Modern React-based e-commerce solution with advanced analytics",
    status: "active",
    progress: 78,
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    team: ["Alex Johnson", "Sarah Chen", "Mike Rodriguez"],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    commits: 145,
    issues: { open: 8, closed: 67 }
  },
  {
    id: "project-2",
    name: "Mobile App API",
    description: "RESTful API backend for mobile application with real-time features",
    status: "active", 
    progress: 92,
    lastActivity: new Date(Date.now() - 30 * 60 * 1000),
    team: ["Alex Johnson", "David Kim"],
    technologies: ["Express", "Socket.io", "Redis", "MongoDB"],
    commits: 89,
    issues: { open: 3, closed: 45 }
  },
  {
    id: "project-3",
    name: "Analytics Dashboard",
    description: "Real-time analytics and reporting dashboard",
    status: "completed",
    progress: 100,
    lastActivity: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    team: ["Alex Johnson", "Emma Wilson", "Tom Zhang"],
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
    commits: 234,
    issues: { open: 0, closed: 112 }
  }
];

const mockDashboardData = {
  dailyStats: {
    commitsToday: 7,
    insightsGenerated: 12,
    hoursLogged: 8,
    docsUpdated: 3
  },
  weeklyStats: {
    commits: 45,
    linesAdded: 2340,
    linesRemoved: 890,
    filesChanged: 67
  },
  performanceMetrics: {
    codeQualityScore: 87,
    asyncMastery: 94,
    bestCodingTime: "2:00 PM - 4:00 PM"
  },
  insights: mockInsights,
  recentCommits: mockCommits,
  documents: mockDocuments,
  achievements: mockAchievements,
  okrs: mockOkrs,
  analytics: mockAnalyticsData,
  projects: mockProjects
};

export const getUser = (userId: string) => {
  return userId === "demo" ? mockUser : null;
};

export const getDashboardData = (userId: string) => {
  return userId === "demo-user" ? mockDashboardData : null;
};

export const getInsights = (userId: string, filters?: string[]) => {
  if (userId !== "demo-user") return [];

  let filteredInsights = [...mockInsights];

  if (filters && filters.length > 0) {
    filteredInsights = filteredInsights.filter(insight => 
      filters.includes(insight.category)
    );
  }

  return filteredInsights.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const getCommits = (userId: string, limit?: number) => {
  if (userId !== "demo-user") return [];

  const commits = [...mockCommits].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  return limit ? commits.slice(0, limit) : commits;
};

export const getDocuments = (userId: string) => {
  return userId === "demo-user" ? mockDocuments : [];
};

export const getAchievements = (userId: string) => {
  return userId === "demo-user" ? mockAchievements : [];
};

export const getOkrs = (userId: string) => {
  return userId === "demo-user" ? mockOkrs : [];
};

export const getProjects = (userId: string) => {
  return userId === "demo-user" ? mockProjects : [];
};

export const getAnalytics = (userId: string, timeRange?: string) => {
  if (userId !== "demo-user") return null;

  // Could filter analytics data based on timeRange if needed
  return mockAnalyticsData;
};

export const generateInsight = () => {
  const categories = ["Performance", "Code Quality", "Business Impact"];
  const titles = [
    "Optimization Opportunity Detected",
    "Code Pattern Analysis Complete", 
    "Performance Metrics Updated",
    "Quality Score Improvement Suggested",
    "Memory Usage Optimization Available",
    "API Response Time Improvement Detected",
    "Code Duplication Pattern Found",
    "User Experience Enhancement Opportunity"
  ];

  const contents = [
    "Your recent changes show potential for optimization in the main rendering loop.",
    "Similar patterns detected across multiple components suggest refactoring opportunities.",
    "Recent performance improvements have resulted in 15% better load times.",
    "Code quality metrics suggest focusing on error handling improvements.",
    "Memory usage could be reduced by 25% by implementing proper cleanup in useEffect hooks.",
    "Database queries could be optimized to reduce response time by up to 40%.",
    "Three similar utility functions found that could be consolidated into a single reusable module.",
    "User engagement analytics suggest implementing progressive loading for better perceived performance."
  ];

  const newInsight = {
    id: `insight-${Date.now()}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    title: titles[Math.floor(Math.random() * titles.length)],
    content: contents[Math.floor(Math.random() * contents.length)],
    priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)],
    timestamp: new Date(),
    tags: ["ai-generated", "real-time"],
    impact: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
    estimatedSavings: "Generated insight"
  };

  // Add to mock data for persistence during session
  mockInsights.unshift(newInsight);

  return newInsight;
};

export const createDocument = (title: string, content: string, type: string = "guide") => {
  const newDoc = {
    id: `doc-${Date.now()}`,
    title,
    type,
    status: "new" as const,
    lastModified: new Date(),
    author: "Alex Johnson",
    content,
    tags: ["generated", "real-time"],
    version: "1.0.0"
  };

  // Add to mock data for persistence during session
  mockDocuments.unshift(newDoc);

  return newDoc;
};