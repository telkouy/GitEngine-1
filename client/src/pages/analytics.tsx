
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Analytics() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
        
        <AppSidebar />
        
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-glass-dark border-b border-white/10">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="mr-2" />
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <div>
                    <h1 className="text-xl font-bold gradient-text">Analytics</h1>
                    <p className="text-xs text-muted-foreground">Performance insights</p>
                  </div>
                  <Badge variant="secondary">Beta</Badge>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 relative z-10 px-6 py-8 space-y-8 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="neo-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12,345</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>

                <Card className="neo-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,345</div>
                    <p className="text-xs text-muted-foreground">+15.3% from last month</p>
                  </CardContent>
                </Card>

                <Card className="neo-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5m 32s</div>
                    <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                  </CardContent>
                </Card>

                <Card className="neo-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.2%</div>
                    <p className="text-xs text-muted-foreground">+1.2% from last month</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <CardDescription>
                    Comprehensive performance metrics and insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Advanced analytics charts coming soon...</p>
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
