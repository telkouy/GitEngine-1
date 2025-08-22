
import { motion, AnimatePresence } from "framer-motion";
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  GitBranch,
  Zap,
  Code2,
  Smartphone,
  Globe,
  Database,
  Bot,
  Palette,
  ShoppingCart,
  MessageSquare,
  BarChart3,
  Shield,
  Gamepad2,
  TrendingUp,
  Calendar,
  Eye,
  Play,
  Pause,
  MoreHorizontal,
  Archive,
  Settings,
  ExternalLink,
  Copy,
  CheckCircle2,
  AlertCircle,
  Clock3
} from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const projectIdeas = [
  {
    id: 1,
    title: "AI-Powered Code Assistant",
    description: "Intelligent code completion and bug detection system with real-time analysis",
    category: "AI/ML",
    difficulty: "Advanced",
    estimatedTime: "6-8 weeks",
    tags: ["TypeScript", "Python", "OpenAI", "Machine Learning"],
    icon: Bot,
    priority: "High",
    team: ["You"],
    progress: 0,
    likes: 47,
    views: 234,
    createdAt: "2024-01-15",
    complexity: 95,
    marketDemand: 89
  },
  {
    id: 2,
    title: "Real-Time Collaboration Platform",
    description: "Live document editing with video chat integration and seamless team workflows",
    category: "Communication",
    difficulty: "Intermediate", 
    estimatedTime: "4-6 weeks",
    tags: ["React", "WebRTC", "Socket.io", "Node.js"],
    icon: MessageSquare,
    priority: "Medium",
    team: ["You", "Designer"],
    progress: 15,
    likes: 32,
    views: 156,
    createdAt: "2024-01-10",
    complexity: 75,
    marketDemand: 82
  },
  {
    id: 3,
    title: "E-commerce Analytics Dashboard",
    description: "Advanced sales tracking with AI-powered customer insights and predictive analytics",
    category: "Analytics",
    difficulty: "Intermediate",
    estimatedTime: "3-5 weeks",
    tags: ["Next.js", "Chart.js", "PostgreSQL", "Analytics"],
    icon: BarChart3,
    priority: "High",
    team: ["You"],
    progress: 35,
    likes: 68,
    views: 298,
    createdAt: "2024-01-08",
    complexity: 70,
    marketDemand: 91
  },
  {
    id: 4,
    title: "Mobile Fitness Tracker",
    description: "Cross-platform health monitoring with AI workout recommendations",
    category: "Mobile",
    difficulty: "Intermediate",
    estimatedTime: "5-7 weeks",
    tags: ["React Native", "Health Kit", "Firebase", "AI"],
    icon: Smartphone,
    priority: "Medium",
    team: ["You", "UX Designer"],
    progress: 0,
    likes: 29,
    views: 187,
    createdAt: "2024-01-05",
    complexity: 68,
    marketDemand: 76
  },
  {
    id: 5,
    title: "Blockchain Voting System",
    description: "Secure and transparent digital voting platform with cryptographic verification",
    category: "Blockchain",
    difficulty: "Advanced",
    estimatedTime: "8-10 weeks",
    tags: ["Solidity", "Web3.js", "Ethereum", "Cryptography"],
    icon: Shield,
    priority: "High",
    team: ["You", "Blockchain Expert"],
    progress: 0,
    likes: 89,
    views: 421,
    createdAt: "2024-01-02",
    complexity: 92,
    marketDemand: 67
  }
];

const activeProjects = [
  {
    id: "active-1",
    name: "Vibe Analytics Dashboard",
    description: "Real-time developer productivity analytics with AI insights",
    status: "Active",
    progress: 78,
    team: ["Camila Pisano"],
    lastCommit: "2 hours ago",
    priority: "High",
    repository: "github.com/user/vibe-analytics",
    deployUrl: "https://vibe-analytics.replit.app",
    technology: "React + Node.js",
    health: "Excellent"
  },
  {
    id: "active-2", 
    name: "VibeFlow CRM",
    description: "Customer relationship management with vibe-powered automation",
    status: "Active",
    progress: 65,
    team: ["Camila Pisano", "Marco Silva"],
    lastCommit: "1 day ago",
    priority: "Medium",
    repository: "github.com/user/vibeflow-crm",
    deployUrl: "https://vibeflow-crm.replit.app",
    technology: "Vue.js + Express",
    health: "Good"
  },
  {
    id: "active-3",
    name: "Vibe Docs Generator",
    description: "AI-powered documentation with intelligent vibe sync",
    status: "Active",
    progress: 45,
    team: ["You"],
    lastCommit: "3 hours ago",
    priority: "High",
    repository: "github.com/user/vibe-docs-generator",
    deployUrl: "https://vibe-docs-generator.replit.app",
    technology: "TypeScript + OpenAI",
    health: "Excellent"
  }
];

const templates = [
  {
    id: '1',
    name: 'React Dashboard Pro',
    description: 'Production-ready dashboard with advanced charts and real-time updates',
    category: 'Web App',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    downloads: 1240,
    rating: 4.8,
    image: '/templates/react-dashboard.jpg',
    complexity: 'Intermediate',
    lastUpdated: '2 days ago'
  },
  {
    id: '2',
    name: 'AI Microservices Kit',
    description: 'Complete microservices architecture with AI integration and monitoring',
    category: 'Backend',
    tech: ['Node.js', 'Docker', 'OpenAI', 'Redis'],
    downloads: 890,
    rating: 4.6,
    image: '/templates/microservices.jpg',
    complexity: 'Advanced',
    lastUpdated: '1 week ago'
  },
  {
    id: '3',
    name: 'E-commerce Starter Pro',
    description: 'Full-featured e-commerce with payment processing and admin panel',
    category: 'E-commerce',
    tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
    downloads: 2100,
    rating: 4.9,
    image: '/templates/ecommerce.jpg',
    complexity: 'Advanced',
    lastUpdated: '3 days ago'
  }
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("ideas");

  const categories = ["All", "AI/ML", "Communication", "Analytics", "Mobile", "Blockchain", "Design", "Backend", "IoT", "Gaming", "SaaS", "DevOps"];
  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "popular", label: "Most Popular" },
    { value: "priority", label: "High Priority" },
    { value: "progress", label: "Progress" }
  ];

  const filteredProjects = projectIdeas.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "popular": return b.likes - a.likes;
      case "priority": return a.priority === "High" ? -1 : 1;
      case "progress": return b.progress - a.progress;
      default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-blue-500/20 text-blue-400';
      case 'Intermediate': return 'bg-purple-500/20 text-purple-400';
      case 'Advanced': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'Excellent': return 'text-green-400';
      case 'Good': return 'text-yellow-400';
      case 'Warning': return 'text-orange-400';
      case 'Critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
        
        <AppSidebar />
        
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-glass-dark border-b border-white/10">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="mr-2" />
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent-violet/20">
                    <FolderKanban className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold gradient-text">Projects Hub</h1>
                    <p className="text-xs text-muted-foreground">Manage ideas, active projects and templates</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Archive className="w-4 h-4 mr-2" />
                  Import
                </Button>
                <Button className="bg-gradient-to-r from-primary to-accent-violet hover:from-primary/90 hover:to-accent-violet/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 relative z-10 px-6 py-8 space-y-8 overflow-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="ideas" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Ideas ({projectIdeas.length})
                  </TabsTrigger>
                  <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Active ({activeProjects.length})
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Templates ({templates.length})
                  </TabsTrigger>
                </TabsList>
                
                {activeTab === "ideas" && (
                  <div className="flex items-center space-x-3">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <TabsContent value="ideas" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* Enhanced Search and Filter Controls */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-6 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search projects by name, description, or technology..." 
                        className="pl-10 bg-background/50 backdrop-blur-sm" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="lg:col-span-6 flex gap-2 flex-wrap">
                      {categories.slice(0, 6).map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="text-xs"
                        >
                          {category}
                        </Button>
                      ))}
                      {categories.length > 6 && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="text-xs">
                              <Filter className="w-3 h-3 mr-1" />
                              More
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {categories.slice(6).map((category) => (
                              <DropdownMenuItem 
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                              >
                                {category}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>

                  {/* Project Ideas Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {filteredProjects.map((project, index) => {
                        const IconComponent = project.icon;
                        return (
                          <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group"
                          >
                            <Card className="neo-card hover:shadow-xl transition-all duration-500 cursor-pointer h-full overflow-hidden border-0 bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm">
                              <CardHeader className="pb-3 relative">
                                <div className="absolute top-4 right-4 flex items-center space-x-2">
                                  <div className="flex items-center text-xs text-muted-foreground bg-background/80 rounded-full px-2 py-1">
                                    <Eye className="w-3 h-3 mr-1" />
                                    {project.views}
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Play className="w-4 h-4 mr-2" />
                                        Start Project
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Copy className="w-4 h-4 mr-2" />
                                        Duplicate
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>
                                        <Star className="w-4 h-4 mr-2" />
                                        Add to Favorites
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                
                                <div className="flex items-start space-x-3 mb-3">
                                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent-violet/20 group-hover:from-primary/30 group-hover:to-accent-violet/30 transition-all duration-300">
                                    <IconComponent className="w-6 h-6 text-primary" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                      <CardTitle className="text-lg font-semibold truncate pr-2">
                                        {project.title}
                                      </CardTitle>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Badge variant="secondary" className="text-xs">
                                        {project.category}
                                      </Badge>
                                      <Badge className={`text-xs border ${getPriorityColor(project.priority)}`}>
                                        {project.priority}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                
                                <CardDescription className="text-sm line-clamp-2 leading-relaxed">
                                  {project.description}
                                </CardDescription>
                              </CardHeader>
                              
                              <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-muted-foreground">Complexity</span>
                                      <span className="font-medium">{project.complexity}%</span>
                                    </div>
                                    <Progress value={project.complexity} className="h-1" />
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-muted-foreground">Market</span>
                                      <span className="font-medium">{project.marketDemand}%</span>
                                    </div>
                                    <Progress value={project.marketDemand} className="h-1" />
                                  </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                  <Badge className={getDifficultyColor(project.difficulty)}>
                                    {project.difficulty}
                                  </Badge>
                                  <div className="flex items-center text-muted-foreground">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {project.estimatedTime}
                                  </div>
                                </div>

                                {project.progress > 0 && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-muted-foreground">Progress</span>
                                      <span className="font-medium text-primary">{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} className="h-2" />
                                  </div>
                                )}

                                <div className="flex flex-wrap gap-1">
                                  {project.tags.slice(0, 3).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs px-2 py-1 bg-background/50">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {project.tags.length > 3 && (
                                    <Badge variant="outline" className="text-xs px-2 py-1 bg-background/50">
                                      +{project.tags.length - 3}
                                    </Badge>
                                  )}
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                                  <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                      <Users className="w-3 h-3" />
                                      <span>{project.team.length}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                      <Star className="w-3 h-3" />
                                      <span>{project.likes}</span>
                                    </div>
                                  </div>
                                  <Button size="sm" className="bg-gradient-to-r from-primary to-accent-violet text-xs">
                                    Start Building
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="active" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6">
                    {activeProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="neo-card hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-r from-background/50 to-background/80 backdrop-blur-sm">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                                  <Play className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                  <div className="flex items-center space-x-3 mb-1">
                                    <CardTitle className="text-lg">{project.name}</CardTitle>
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                      {project.status}
                                    </Badge>
                                    <Badge className={getPriorityColor(project.priority)}>
                                      {project.priority}
                                    </Badge>
                                  </div>
                                  <CardDescription className="text-sm">{project.description}</CardDescription>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Open in Replit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Globe className="w-4 h-4 mr-2" />
                                    View Deployment
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Settings className="w-4 h-4 mr-2" />
                                    Project Settings
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Pause className="w-4 h-4 mr-2" />
                                    Pause Project
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="font-medium text-primary">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2" />
                              </div>
                              <div className="flex items-center justify-center text-sm">
                                <div className="text-center">
                                  <div className="text-muted-foreground mb-1">Health Status</div>
                                  <div className={`font-medium ${getHealthColor(project.health)}`}>
                                    {project.health}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-center text-sm">
                                <div className="text-center">
                                  <div className="text-muted-foreground mb-1">Technology</div>
                                  <div className="font-medium">{project.technology}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm border-t border-border/30 pt-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                  <GitBranch className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Last commit: {project.lastCommit}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4 text-muted-foreground" />
                                  <div className="flex items-center space-x-1">
                                    {project.team.map((member, idx) => (
                                      <Avatar key={idx} className="w-6 h-6">
                                        <AvatarFallback className="text-xs bg-primary/10">
                                          {member.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                  <GitBranch className="w-4 h-4 mr-2" />
                                  Repository
                                </Button>
                                <Button size="sm" className="bg-gradient-to-r from-primary to-accent-violet">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Open Project
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template, index) => (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group"
                      >
                        <Card className="neo-card hover:shadow-xl transition-all duration-300 cursor-pointer h-full overflow-hidden border-0 bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm">
                          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent-violet/20 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Code2 className="w-12 h-12 text-primary/60" />
                            </div>
                            <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-white bg-black/50 rounded-full px-2 py-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span>{template.rating}</span>
                            </div>
                          </div>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <CardTitle className="text-lg font-semibold mb-1">{template.name}</CardTitle>
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {template.category}
                                  </Badge>
                                  <Badge className={getDifficultyColor(template.complexity)}>
                                    {template.complexity}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <CardDescription className="text-sm line-clamp-2">
                              {template.description}
                            </CardDescription>
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-1">
                              {template.tech.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs px-2 py-1 bg-background/50">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/30 pt-3">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center gap-1">
                                  <Download className="w-3 h-3" />
                                  <span>{template.downloads.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock3 className="w-3 h-3" />
                                  <span>{template.lastUpdated}</span>
                                </div>
                              </div>
                              <Button size="sm" className="bg-gradient-to-r from-primary to-accent-violet opacity-0 group-hover:opacity-100 transition-opacity">
                                Use Template
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
