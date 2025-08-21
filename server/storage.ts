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
      username: "camila",
      password: "password",
      name: "Camila",
      email: "camila@forceofnature.com",
      timezone: "America/Montevideo",
      theme: "auto",
      createdAt: new Date(),
    };
    this.users.set(userId, user);

    // Daily stats
    const dailyStats: DailyStats = {
      id: randomUUID(),
      commitsToday: 3.8,
      insightsGenerated: 2.5,
      hoursLogged: 2,
      docsUpdated: 1.2,
      userId,
      date: new Date(),
    };
    this.dailyStats.set(userId, dailyStats);

    // Sample commits
    const commits: Commit[] = [
      {
        id: randomUUID(),
        hash: "a1b2c3d",
        message: "Add Klaviyo API integration for client dashboard",
        project: "Ring Analytics Dashboard",
        impact: "Revenue Attribution",
        valueScore: 9,
        userId,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: randomUUID(),
        hash: "e4f5g6h",
        message: "Implement real-time campaign performance tracking",
        project: "Harley Davidson CRM",
        impact: "Campaign Optimization",
        valueScore: 8,
        userId,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      },
      {
        id: randomUUID(),
        hash: "i7j8k9l",
        message: "Fix async communication bug in notification system",
        project: "Internal Tools",
        impact: "Team Productivity",
        valueScore: 7,
        userId,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
    ];
    commits.forEach(commit => this.commits.set(commit.id, commit));

    // Sample insights
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
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Client Communication Excellence",
        description: "Your technical translations helped close $50K renewal with Ring",
        category: "Business Impact",
        impact: "High Impact",
        userId,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ];
    insights.forEach(insight => this.insights.set(insight.id, insight));

    // Sample documentation
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
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: randomUUID(),
        title: "Client Dashboard Architecture",
        type: "System Design",
        status: "Complete",
        isAutoGenerated: true,
        userId,
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ];
    docs.forEach(doc => this.documentation.set(doc.id, doc));

    // Sample OKRs
    const okrsList: OKR[] = [
      {
        id: randomUUID(),
        title: "Master Klaviyo API Integration",
        category: "Technical Skills",
        progress: 85,
        target: "End of Month",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Complete Force of Nature Onboarding",
        category: "Company Integration",
        progress: 60,
        target: "This Week",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Launch Attribution Dashboard MVP",
        category: "Product Delivery",
        progress: 75,
        target: "Next Week",
        userId,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Establish Susan Strategic Partnership",
        category: "Leadership Growth",
        progress: 45,
        target: "End of Quarter",
        userId,
        createdAt: new Date(),
      },
    ];
    okrsList.forEach(okr => this.okrs.set(okr.id, okr));

    // Sample achievements
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
        unlockedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        userId,
      },
    ];
    achievementsList.forEach(achievement => this.achievements.set(achievement.id, achievement));

    // Sample integrations
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
        status: "Needs Auth",
        userId,
      },
    ];
    integrationsList.forEach(integration => this.integrations.set(integration.id, integration));

    // Sample next steps
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
        title: "Prepare weekly sync update for Susan",
        priority: "High Priority",
        estimatedTime: "Est. 30 minutes",
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
