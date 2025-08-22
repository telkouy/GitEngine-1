
import { motion } from "framer-motion";
import { Trophy, Star, Award, Calendar } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Achievement } from "@shared/schema";

export default function Achievements() {
  const { data: achievements = [], isLoading } = useQuery<Achievement[]>({
    queryKey: ["/api/dashboard", "demo-user"],
    select: (data: any) => data.achievements || [],
    retry: 3,
    retryDelay: 1000,
  });

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return Trophy;
      case 'star': return Star;
      case 'award': return Award;
      default: return Trophy;
    }
  };

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
                <p className="text-muted-foreground">Loading achievements...</p>
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
                  <Trophy className="w-6 h-6 text-primary" />
                  <div>
                    <h1 className="text-xl font-bold gradient-text">Achievements</h1>
                    <p className="text-xs text-muted-foreground">Your accomplishments</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 relative z-10 px-6 py-8 space-y-8 overflow-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Milestones and accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {achievements.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No achievements unlocked yet</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {achievements.map((achievement: Achievement, index: number) => {
                          const IconComponent = getIconComponent(achievement.icon);
                          return (
                            <motion.div
                              key={achievement.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="p-6 rounded-xl border border-border/40 bg-gradient-to-br from-yellow-500/10 via-background/50 to-orange-500/10 backdrop-blur-sm hover:border-yellow-500/30 transition-all duration-300"
                            >
                              <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20">
                                  <IconComponent className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-foreground mb-2">
                                    {achievement.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-3">
                                    {achievement.description}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Calendar className="w-3 h-3" />
                                      <span>
                                        Unlocked: {achievement.unlockedAt ? new Date(achievement.unlockedAt).toLocaleDateString() : 'N/A'}
                                      </span>
                                    </div>
                                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 text-xs">
                                      Achievement
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
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
