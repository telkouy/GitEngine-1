
import { motion } from "framer-motion";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, GitPullRequest, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AIReviewsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">AI Code Reviews</h1>
            <Badge variant="outline">Coming Soon</Badge>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  AI-Powered Code Reviews
                </CardTitle>
                <CardDescription>
                  Automated code analysis with intelligent suggestions and best practice recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <GitPullRequest className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-medium mb-1">Smart PR Analysis</h3>
                    <p className="text-sm text-muted-foreground">Automated review of pull requests</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-medium mb-1">Quality Scoring</h3>
                    <p className="text-sm text-muted-foreground">AI-generated quality metrics</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-medium mb-1">Instant Feedback</h3>
                    <p className="text-sm text-muted-foreground">Real-time code analysis</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Preview Features</h4>
                  {[
                    "Automated code quality assessment",
                    "Security vulnerability detection",
                    "Performance optimization suggestions",
                    "Best practice recommendations",
                    "Code complexity analysis",
                    "Test coverage insights"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded border-l-2 border-l-primary/20 bg-primary/5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center pt-4">
                  <Button disabled>
                    Coming Soon - Get Notified
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
