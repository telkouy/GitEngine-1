
import { motion } from "framer-motion";
import { Play, GitBranch } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ActiveProjects() {
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
                  <Play className="w-6 h-6 text-primary" />
                  <div>
                    <h1 className="text-xl font-bold gradient-text">Active Projects</h1>
                    <p className="text-xs text-muted-foreground">Currently active projects</p>
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
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-green-500" />
                    Vibe Coder Dashboard
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </CardTitle>
                  <CardDescription>
                    Main dashboard application with real-time analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GitBranch className="w-4 h-4" />
                      <span>Branch: main</span>
                      <span>•</span>
                      <span>Last commit: 2 hours ago</span>
                    </div>
                    <div className="text-sm">
                      <strong>Current Status:</strong> Development in progress
                    </div>
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
