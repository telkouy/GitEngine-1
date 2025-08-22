import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GitBranch, Sparkles, Code2, Users, Zap, GitPullRequest, Activity, Shield } from "lucide-react";

export default function GitHubPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">GitHub Integration</h1>
            <Badge variant="outline">Coming Soon</Badge>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-[60vh]"
          >
            <Card className="w-full max-w-2xl">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent-violet to-accent-cyan p-[1px]">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <GitBranch className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl gradient-text">GitHub Integration</CardTitle>
                <CardDescription>
                Coming soon: epic GitHub integration for legendary development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-3">GitHub features you'll have:</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                    <GitBranch className="h-5 w-5 text-primary" />
                    <span className="text-sm">Branch management</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                    <GitPullRequest className="h-5 w-5 text-primary" />
                    <span className="text-sm">Automatic pull requests</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                    <Activity className="h-5 w-5 text-primary" />
                    <span className="text-sm">Code analytics</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-sm">Advanced security</span>
                  </div>
                </div>
              </div>

                <div className="flex justify-center pt-4">
                  <Button disabled className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Preparing the magic...
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}