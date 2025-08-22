
import { motion } from "framer-motion";
import { FolderKanban, Plus, Search, Filter } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  const projects = [
    {
      name: "Vibe Coder Dashboard",
      description: "Main dashboard application",
      status: "Active",
      language: "TypeScript",
      lastUpdate: "2 hours ago"
    },
    {
      name: "Analytics Engine",
      description: "Data processing and analytics",
      status: "Active",
      language: "Python",
      lastUpdate: "1 day ago"
    },
    {
      name: "API Gateway",
      description: "Microservices API gateway",
      status: "Maintenance",
      language: "Node.js",
      lastUpdate: "3 days ago"
    }
  ];

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
                    <h1 className="text-xl font-bold gradient-text">Projects</h1>
                    <p className="text-xs text-muted-foreground">Manage your projects</p>
                  </div>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent-violet">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </header>

          <main className="flex-1 relative z-10 px-6 py-8 space-y-8 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search projects..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="neo-card hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{project.language}</span>
                          <span>{project.lastUpdate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
