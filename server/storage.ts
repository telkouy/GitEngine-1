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
    const userId = randomUUID();
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

    // Daily stats
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

    // Extended commits data
    const commits: Commit[] = [
      {
        id: randomUUID(),
        hash: "a1b2c3d",
        message: "Add Klaviyo API integration for client dashboard",
        project: "Ring Analytics Dashboard",
        impact: "Revenue Attribution",
        valueScore: 9,
        userId,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
      {
        id: randomUUID(),
        hash: "e4f5g6h",
        message: "Implement real-time campaign performance tracking",
        project: "Harley Davidson CRM",
        impact: "Campaign Optimization",
        valueScore: 8,
        userId,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: randomUUID(),
        hash: "i7j8k9l",
        message: "Fix async communication bug in notification system",
        project: "Internal Tools",
        impact: "Team Productivity",
        valueScore: 7,
        userId,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
      {
        id: randomUUID(),
        hash: "m3n4o5p",
        message: "Add TypeScript interfaces for data models",
        project: "Force of Nature Platform",
        impact: "Code Quality",
        valueScore: 6,
        userId,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "q6r7s8t",
        message: "Optimize database queries for user analytics",
        project: "Ring Analytics Dashboard",
        impact: "Performance",
        valueScore: 9,
        userId,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "u9v0w1x",
        message: "Create responsive mobile layout for dashboard",
        project: "Harley Davidson CRM",
        impact: "User Experience",
        valueScore: 8,
        userId,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "y2z3a4b",
        message: "Implement automated testing suite",
        project: "Internal Tools",
        impact: "Code Quality",
        valueScore: 7,
        userId,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "c5d6e7f",
        message: "Add multi-language support for client portals",
        project: "Force of Nature Platform",
        impact: "Internationalization",
        valueScore: 8,
        userId,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "g8h9i0j",
        message: "Integrate Stripe payment processing",
        project: "Ring Analytics Dashboard",
        impact: "Revenue Features",
        valueScore: 9,
        userId,
        createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "k1l2m3n",
        message: "Setup CI/CD pipeline with GitHub Actions",
        project: "Harley Davidson CRM",
        impact: "DevOps",
        valueScore: 7,
        userId,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        id: randomUUID(),
        hash: "o4p5q6r",
        message: "Add WebSocket support for real-time updates",
        project: "Internal Tools",
        impact: "Real-time Features",
        valueScore: 8,
        userId,
        createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        hash: "s7t8u9v",
        message: "Create admin dashboard for user management",
        project: "Force of Nature Platform",
        impact: "Admin Tools",
        valueScore: 6,
        userId,
        createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
      },
    ];
    commits.forEach(commit => this.commits.set(commit.id, commit));

    // Extended AI insights data
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
        description: "Your technical translations helped close $50K renewal with Ring",
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
        category: "Business Impact",
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
        category: "Performance",
        impact: "High Impact",
        userId,
        createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Security Vulnerability Prevention",
        description: "Proactive code review caught 5 potential security issues",
        category: "Code Quality",
        impact: "High Impact",
        userId,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Cross-Team Knowledge Transfer",
        description: "Documentation efforts reduced onboarding time by 40%",
        category: "Business Impact",
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
    ];
    insights.forEach(insight => this.insights.set(insight.id, insight));

    // Extended documentation data
    const docs: Documentation[] = [
      {
        id: randomUUID(),
        title: "Klaviyo API Integration Guide",
        type: "Technical Spec",
        status: "Complete",
        isAutoGenerated: true,
        userId,
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Force of Nature Onboarding Playbook",
        type: "Process Documentation",
        status: "In Progress",
        isAutoGenerated: false,
        userId,
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Ring Analytics Dashboard Architecture",
        type: "System Design",
        status: "Complete",
        isAutoGenerated: true,
        userId,
        updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Harley Davidson CRM User Manual",
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
        title: "Master Klaviyo API Integration",
        category: "Technical Skills",
        progress: 95,
        target: "End of Month",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Complete Force of Nature Onboarding",
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

    // Extended integrations data
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
        name: "Klaviyo",
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
    ];
    integrationsList.forEach(integration => this.integrations.set(integration.id, integration));

    // Extended next steps data
    const nextStepsList: NextStep[] = [
      {
        id: randomUUID(),
        title: "Review Harley Davidson campaign performance data",
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
        title: "Optimize database queries for Ring Analytics",
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
}

export const storage = new MemStorage();
