
import { motion } from "framer-motion";
import { FileText, Download, Star, Code, Layers } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProjectTemplates() {
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
                  <FileText className="w-6 h-6 text-primary" />
                  <div>
                    <h1 className="text-xl font-bold gradient-text">Project Templates</h1>
                    <p className="text-xs text-muted-foreground">Reusable project templates</p>
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
                  <CardTitle>Project Templates</CardTitle>
                  <CardDescription>
                    Ready-to-use templates for quick project setup
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        id: '1',
                        name: 'React Dashboard',
                        description: 'Full-stack dashboard with React, Node.js, and PostgreSQL',
                        category: 'Web App',
                        tech: ['React', 'TypeScript', 'Tailwind'],
                        downloads: 1240,
                        rating: 4.8
                      },
                      {
                        id: '2',
                        name: 'API Gateway',
                        description: 'Microservices API gateway with authentication and rate limiting',
                        category: 'Backend',
                        tech: ['Node.js', 'Express', 'Redis'],
                        downloads: 890,
                        rating: 4.6
                      },
                      {
                        id: '3',
                        name: 'E-commerce Starter',
                        description: 'Complete e-commerce solution with cart and payment processing',
                        category: 'E-commerce',
                        tech: ['Next.js', 'Stripe', 'Prisma'],
                        downloads: 2100,
                        rating: 4.9
                      },
                      {
                        id: '4',
                        name: 'Mobile App Template',
                        description: 'Cross-platform mobile app with React Native',
                        category: 'Mobile',
                        tech: ['React Native', 'Expo', 'AsyncStorage'],
                        downloads: 750,
                        rating: 4.4
                      },
                      {
                        id: '5',
                        name: 'Analytics Platform',
                        description: 'Real-time analytics dashboard with data visualization',
                        category: 'Analytics',
                        tech: ['Vue.js', 'D3.js', 'WebSocket'],
                        downloads: 620,
                        rating: 4.7
                      },
                      {
                        id: '6',
                        name: 'CMS Template',
                        description: 'Content management system with admin interface',
                        category: 'CMS',
                        tech: ['Laravel', 'MySQL', 'Bootstrap'],
                        downloads: 980,
                        rating: 4.5
                      }
                    ].map((template, index) => (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-6 rounded-xl border border-border/40 bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm hover:border-border/60 transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent-violet/20">
                            <Code className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span>{template.rating}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">
                              {template.name}
                            </h3>
                            <Badge variant="secondary" className="text-xs mb-2">
                              {template.category}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {template.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {template.tech.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-border/20">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Download className="w-3 h-3" />
                              <span>{template.downloads.toLocaleString()}</span>
                            </div>
                            <Button size="sm" className="bg-gradient-to-r from-primary to-accent-violet opacity-0 group-hover:opacity-100 transition-opacity">
                              Use Template
                            </Button>
                          </div>
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
