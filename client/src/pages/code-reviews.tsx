
import { motion } from "framer-motion";
import { Code2, GitBranch, User, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Commit } from "@shared/schema";

export default function CodeReviews() {
  const { data: commits = [], isLoading } = useQuery<Commit[]>({
    queryKey: ["/api/dashboard", "demo-user"],
    select: (data: any) => data.commits || [],
    retry: 3,
    retryDelay: 1000,
  });

  // Transform commits into code reviews (using recent commits as pending reviews)
  const reviews = commits.slice(0, 5).map((commit: Commit, index: number) => ({
    id: commit.id,
    title: commit.message,
    project: commit.project,
    author: "Camila Pisano",
    status: index < 2 ? "pending" : "approved",
    createdAt: commit.createdAt,
    linesChanged: Math.floor(Math.random() * 200) + 50,
    comments: Math.floor(Math.random() * 10),
  }));

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
                <p className="text-muted-foreground">Loading reviews...</p>
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
                  <Code2 className="w-6 h-6 text-primary" />
                  <div>
                    <h1 className="text-xl font-bold gradient-text">Code Reviews</h1>
                    <p className="text-xs text-muted-foreground">Review and collaborate</p>
                  </div>
                  <Badge variant="secondary">3</Badge>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 relative z-10 px-6 py-8 space-y-8 overflow-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Pending Reviews</CardTitle>
                  <CardDescription>Code reviews waiting for your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No code reviews available</p>
                      </div>
                    ) : (
                      reviews.map((review: any, index: number) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-6 rounded-xl border border-border/40 bg-gradient-to-r from-background/50 to-background/80 backdrop-blur-sm hover:border-border/60 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-2">
                                {review.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <GitBranch className="w-4 h-4" />
                                  <span>{review.project}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  <span>{review.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>+{review.linesChanged} lines changed</span>
                                <span>{review.comments} comments</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={review.status === "pending" ? "secondary" : "default"}
                                className={`flex items-center gap-1 ${
                                  review.status === "pending"
                                    ? "bg-orange-500/20 text-orange-400"
                                    : "bg-green-500/20 text-green-400"
                                }`}
                              >
                                {review.status === "pending" ? (
                                  <AlertCircle className="w-3 h-3" />
                                ) : (
                                  <CheckCircle className="w-3 h-3" />
                                )}
                                {review.status === "pending" ? "Pending" : "Approved"}
                              </Badge>
                              {review.status === "pending" && (
                                <Button size="sm" className="bg-gradient-to-r from-primary to-accent-violet">
                                  Review
                                </Button>
                              )}
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
