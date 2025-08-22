
import { motion } from "framer-motion";
import { GitBranch, GitCommit, Clock, TrendingUp, Folder } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Commit } from "@shared/schema";

export default function GitIntegration() {
  const { data: commits = [], isLoading } = useQuery<Commit[]>({
    queryKey: ["/api/dashboard", "demo-user"],
    select: (data: any) => data.commits || [],
    retry: 3,
    retryDelay: 1000,
  });

  // Group commits by project
  const repositories = commits.reduce((acc: any, commit: Commit) => {
    if (!acc[commit.project]) {
      acc[commit.project] = {
        name: commit.project,
        commits: [],
        totalCommits: 0,
        lastCommit: null,
      };
    }
    acc[commit.project].commits.push(commit);
    acc[commit.project].totalCommits += 1;
    if (!acc[commit.project].lastCommit || (commit.createdAt && (!acc[commit.project].lastCommit.createdAt || new Date(commit.createdAt) > new Date(acc[commit.project].lastCommit.createdAt)))) {
      acc[commit.project].lastCommit = commit;
    }
    return acc;
  }, {});

  const repoList = Object.values(repositories);

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
                <p className="text-muted-foreground">Loading repositories...</p>
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
                  <GitBranch className="w-6 h-6 text-primary" />
                  <div>
                    <h1 className="text-xl font-bold gradient-text">Git Integration</h1>
                    <p className="text-xs text-muted-foreground">Version control</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 relative z-10 px-6 py-8 space-y-8 overflow-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Git Repository</CardTitle>
                  <CardDescription>Connected repositories and version control</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {repoList.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <GitBranch className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No repositories connected</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {repoList.map((repo: any, index: number) => (
                          <motion.div
                            key={repo.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="p-6 rounded-xl border border-border/40 bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm hover:border-border/60 transition-all duration-300"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <Folder className="w-6 h-6 text-primary" />
                                <h3 className="font-semibold text-foreground">
                                  {repo.name}
                                </h3>
                              </div>
                              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                                Active
                              </Badge>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <GitCommit className="w-4 h-4" />
                                  <span>{repo.totalCommits} commits</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>{repo.lastCommit?.createdAt ? new Date(repo.lastCommit.createdAt).toLocaleDateString() : 'N/A'}</span>
                                </div>
                              </div>
                              
                              <div className="p-3 rounded-lg bg-muted/30 border border-border/20">
                                <div className="flex items-center gap-2 mb-2">
                                  <GitBranch className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-xs font-medium text-muted-foreground">LATEST COMMIT</span>
                                </div>
                                <p className="text-sm font-medium text-foreground mb-1">
                                  {repo.lastCommit.message}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>#{repo.lastCommit.hash}</span>
                                  <Badge variant="outline" className={`text-xs ${
                                    repo.lastCommit.valueScore >= 8 ? 'border-green-500/30 text-green-400' :
                                    repo.lastCommit.valueScore >= 6 ? 'border-yellow-500/30 text-yellow-400' :
                                    'border-red-500/30 text-red-400'
                                  }`}>
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Impact: {repo.lastCommit.valueScore}/10
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
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
