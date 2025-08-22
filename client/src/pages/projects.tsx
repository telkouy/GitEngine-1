
import { motion } from "framer-motion";
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
  Gamepad2
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
import { useState } from "react";

const projectIdeas = [
  {
    id: 1,
    title: "AI-Powered Code Assistant",
    description: "Intelligent code completion and bug detection system",
    category: "AI/ML",
    difficulty: "Advanced",
    estimatedTime: "6-8 weeks",
    tags: ["TypeScript", "Python", "OpenAI"],
    icon: Bot,
    priority: "High",
    team: ["You"],
    progress: 0
  },
  {
    id: 2,
    title: "Real-Time Collaboration Platform",
    description: "Live document editing with video chat integration",
    category: "Communication",
    difficulty: "Intermediate", 
    estimatedTime: "4-6 weeks",
    tags: ["React", "WebRTC", "Socket.io"],
    icon: MessageSquare,
    priority: "Medium",
    team: ["You", "Designer"],
    progress: 15
  },
  {
    id: 3,
    title: "E-commerce Analytics Dashboard",
    description: "Advanced sales tracking and customer insights",
    category: "Analytics",
    difficulty: "Intermediate",
    estimatedTime: "3-5 weeks",
    tags: ["Next.js", "Chart.js", "PostgreSQL"],
    icon: BarChart3,
    priority: "High",
    team: ["You"],
    progress: 35
  },
  {
    id: 4,
    title: "Mobile Fitness Tracker",
    description: "Cross-platform health and workout monitoring app",
    category: "Mobile",
    difficulty: "Intermediate",
    estimatedTime: "5-7 weeks",
    tags: ["React Native", "Health Kit", "Firebase"],
    icon: Smartphone,
    priority: "Medium",
    team: ["You", "UX Designer"],
    progress: 0
  },
  {
    id: 5,
    title: "Blockchain Voting System",
    description: "Secure and transparent digital voting platform",
    category: "Blockchain",
    difficulty: "Advanced",
    estimatedTime: "8-10 weeks",
    tags: ["Solidity", "Web3.js", "Ethereum"],
    icon: Shield,
    priority: "High",
    team: ["You", "Blockchain Expert"],
    progress: 0
  },
  {
    id: 6,
    title: "Creative Portfolio Builder",
    description: "Drag-and-drop portfolio creation for artists",
    category: "Design",
    difficulty: "Beginner",
    estimatedTime: "2-3 weeks",
    tags: ["Vue.js", "Tailwind CSS", "Cloudinary"],
    icon: Palette,
    priority: "Low",
    team: ["You"],
    progress: 60
  },
  {
    id: 7,
    title: "Microservices API Gateway",
    description: "Scalable API management and routing system",
    category: "Backend",
    difficulty: "Advanced",
    estimatedTime: "6-8 weeks",
    tags: ["Node.js", "Docker", "Kong"],
    icon: Database,
    priority: "High",
    team: ["You", "DevOps Engineer"],
    progress: 25
  },
  {
    id: 8,
    title: "Smart Home IoT Controller",
    description: "Unified interface for IoT device management",
    category: "IoT",
    difficulty: "Advanced",
    estimatedTime: "7-9 weeks",
    tags: ["Python", "MQTT", "Raspberry Pi"],
    icon: Globe,
    priority: "Medium",
    team: ["You", "Hardware Engineer"],
    progress: 0
  },
  {
    id: 9,
    title: "Multiplayer Game Engine",
    description: "Real-time multiplayer game development framework",
    category: "Gaming",
    difficulty: "Advanced",
    estimatedTime: "10-12 weeks",
    tags: ["Unity", "C#", "Photon"],
    icon: Gamepad2,
    priority: "Low",
    team: ["You", "Game Designer"],
    progress: 0
  },
  {
    id: 10,
    title: "SaaS Subscription Manager",
    description: "Complete subscription billing and management system",
    category: "SaaS",
    difficulty: "Intermediate",
    estimatedTime: "4-6 weeks",
    tags: ["React", "Stripe", "Express"],
    icon: ShoppingCart,
    priority: "High",
    team: ["You"],
    progress: 45
  },
  {
    id: 11,
    title: "DevOps Automation Pipeline",
    description: "CI/CD pipeline with automated testing and deployment",
    category: "DevOps",
    difficulty: "Advanced",
    estimatedTime: "5-7 weeks",
    tags: ["GitHub Actions", "AWS", "Terraform"],
    icon: Zap,
    priority: "Medium",
    team: ["You", "DevOps Team"],
    progress: 70
  },
  {
    id: 12,
    title: "Code Review Assistant",
    description: "AI-powered code quality analysis and suggestions",
    category: "Developer Tools",
    difficulty: "Advanced",
    estimatedTime: "6-8 weeks",
    tags: ["Python", "ML", "GitHub API"],
    icon: Code2,
    priority: "High",
    team: ["You"],
    progress: 20
  }
];

const activeProjects = [
  {
    id: "active-1",
    name: "Vibe Analytics Dashboard",
    description: "Real-time developer productivity analytics",
    status: "Active",
    progress: 78,
    team: ["Camila Pisano"],
    lastCommit: "2 hours ago",
    priority: "High"
  },
  {
    id: "active-2", 
    name: "VibeMotors CRM",
    description: "Customer relationship management system",
    status: "Active",
    progress: 65,
    team: ["Camila Pisano", "Marco Silva"],
    lastCommit: "1 day ago",
    priority: "Medium"
  },
  {
    id: "active-3",
    name: "Documentation Generator",
    description: "AI-powered documentation creation tool",
    status: "Active",
    progress: 45,
    team: ["You"],
    lastCommit: "3 hours ago",
    priority: "High"
  }
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("ideas");

  const categories = ["All", "AI/ML", "Communication", "Analytics", "Mobile", "Blockchain", "Design", "Backend", "IoT", "Gaming", "SaaS", "DevOps", "Developer Tools"];

  const filteredProjects = projectIdeas.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
                  <FolderKanban className="w-6 h-6 text-primary" />
                  <div>
                    <h1 className="text-xl font-bold gradient-text">Projects Hub</h1>
                    <p className="text-xs text-muted-foreground">Manage and discover new project ideas</p>
                  </div>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent-violet">
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>
          </header>

          <main className="flex-1 relative z-10 px-6 py-8 space-y-8 overflow-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ideas">Project Ideas</TabsTrigger>
                <TabsTrigger value="active">Active Projects</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              <TabsContent value="ideas" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* Search and Filter Controls */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search project ideas..." 
                        className="pl-10" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {categories.map((category) => (
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
                    </div>
                  </div>

                  {/* Project Ideas Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => {
                      const IconComponent = project.icon;
                      return (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Card className="neo-card hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <IconComponent className="w-5 h-5 text-primary" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <CardTitle className="text-lg font-semibold truncate">{project.title}</CardTitle>
                                    <Badge variant="secondary" className="text-xs mt-1">
                                      {project.category}
                                    </Badge>
                                  </div>
                                </div>
                                <Badge className={`text-xs border ${getPriorityColor(project.priority)}`}>
                                  {project.priority}
                                </Badge>
                              </div>
                              <CardDescription className="text-sm line-clamp-2">
                                {project.description}
                              </CardDescription>
                            </CardHeader>
                            
                            <CardContent className="space-y-4">
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
                                    <span className="font-medium">{project.progress}%</span>
                                  </div>
                                  <Progress value={project.progress} className="h-2" />
                                </div>
                              )}

                              <div className="flex flex-wrap gap-1">
                                {project.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                                    {tag}
                                  </Badge>
                                ))}
                                {project.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs px-2 py-1">
                                    +{project.tags.length - 3}
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                <div className="flex items-center space-x-1">
                                  <Users className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">
                                    {project.team.join(", ")}
                                  </span>
                                </div>
                                <Button size="sm" variant="ghost" className="text-xs">
                                  Start Project
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {activeProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="neo-card hover:shadow-lg transition-shadow cursor-pointer">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-lg">{project.name}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                              </div>
                              <Badge className={getPriorityColor(project.priority)}>
                                {project.priority}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <GitBranch className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Last commit: {project.lastCommit}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {project.team.map((member, idx) => (
                                  <Avatar key={idx} className="w-6 h-6">
                                    <AvatarFallback className="text-xs">
                                      {member.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
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
                >
                  <Card className="neo-card text-center py-12">
                    <CardContent>
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <FolderKanban className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">Project Templates</h3>
                          <p className="text-muted-foreground mt-2">
                            Ready-to-use templates will be available here soon
                          </p>
                        </div>
                        <Button>Browse Templates</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
