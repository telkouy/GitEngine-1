
import { motion } from "framer-motion";
import { Archive, Calendar, GitBranch, CheckCircle } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProjectArchive() {
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
                  <Archive className="w-6 h-6 text-primary" />
                  <div>
                    <h1 className="text-xl font-bold gradient-text">Project Archive</h1>
                    <p className="text-xs text-muted-foreground">Archived projects</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 relative z-10 px-6 py-8 space-y-8 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Archived Projects</CardTitle>
                  <CardDescription>
                    Projects that have been completed or archived
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Sample archived projects */}
                    {[
                      {
                        id: '1',
                        name: 'Legacy CRM System',
                        description: 'Previous customer relationship management system',
                        completedDate: '2023-08-15',
                        status: 'Archived',
                        language: 'PHP',
                        commits: 127
                      },
                      {
                        id: '2', 
                        name: 'Old Analytics Dashboard',
                        description: 'Former analytics and reporting platform',
                        completedDate: '2023-06-22',
                        status: 'Archived',
                        language: 'React',
                        commits: 89
                      }
                    ].map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-6 rounded-xl border border-border/40 bg-gradient-to-r from-background/50 to-background/80 backdrop-blur-sm hover:border-border/60 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Archive className="w-5 h-5 text-muted-foreground" />
                              <h3 className="font-semibold text-foreground">
                                {project.name}
                              </h3>
                              <Badge variant="secondary" className="bg-gray-500/20 text-gray-400">
                                {project.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {project.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <GitBranch className="w-4 h-4" />
                                <span>{project.language}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                <span>{project.commits} commits</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>Archived: {new Date(project.completedDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
