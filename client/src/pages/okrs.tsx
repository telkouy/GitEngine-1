
import { motion } from "framer-motion";
import { Target, TrendingUp, Calendar } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import type { OKR } from "@shared/schema";

export default function OKRs() {
  const { data: okrs = [], isLoading } = useQuery<OKR[]>({
    queryKey: ["/api/dashboard", "demo-user"],
    select: (data: any) => data.okrs || [],
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex relative overflow-hidden">
          <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                <p className="text-muted-foreground">Loading OKRs...</p>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

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
                  <Target className="w-6 h-6 text-primary" />
                  <div>
                    <h1 className="text-xl font-bold gradient-text">OKRs</h1>
                    <p className="text-xs text-muted-foreground">Objectives & Key Results</p>
                  </div>
                  <Badge variant="secondary">2</Badge>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 relative z-10 px-6 py-8 space-y-8 overflow-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Current OKRs</CardTitle>
                  <CardDescription>Track your objectives and key results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {okrs.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No OKRs defined yet</p>
                      </div>
                    ) : (
                      okrs.map((okr: OKR, index: number) => (
                        <motion.div
                          key={okr.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-6 rounded-xl border border-border/40 bg-gradient-to-r from-background/50 to-background/80 backdrop-blur-sm hover:border-border/60 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Target className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-foreground">
                                  {okr.title}
                                </h3>
                                <Badge variant="secondary" className="text-xs">
                                  {okr.category}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-4 h-4" />
                                  <span>Target: {okr.target}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>Created: {okr.createdAt ? new Date(okr.createdAt).toLocaleDateString() : 'N/A'}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span className="font-medium">{okr.progress}%</span>
                                </div>
                                <Progress value={okr.progress} className="h-2" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className={`w-3 h-3 rounded-full ${
                                okr.progress >= 75 ? 'bg-green-500' :
                                okr.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} />
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
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
