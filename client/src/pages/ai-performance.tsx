
import { motion } from "framer-motion";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Zap, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function AIPerformancePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">AI Performance Analysis</h1>
            <Badge variant="outline">Beta</Badge>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">92</div>
                <Progress value={92} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Excellent performance</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Load Time</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">1.2s</div>
                <Progress value={85} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Above average</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bundle Size</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">847KB</div>
                <Progress value={65} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Room for improvement</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">24MB</div>
                <Progress value={78} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Good optimization</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Performance Recommendations
                </CardTitle>
                <CardDescription>
                  AI-powered analysis with actionable optimization suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      title: "Optimize Image Loading",
                      description: "Implement lazy loading for images to reduce initial bundle size",
                      impact: "High",
                      effort: "Low"
                    },
                    {
                      title: "Code Splitting",
                      description: "Split large components into smaller chunks for better caching",
                      impact: "Medium",
                      effort: "Medium"
                    },
                    {
                      title: "Remove Unused Dependencies",
                      description: "Identified 3 unused packages that can be safely removed",
                      impact: "Medium",
                      effort: "Low"
                    },
                    {
                      title: "Optimize Re-renders",
                      description: "Use React.memo for components that re-render frequently",
                      impact: "High",
                      effort: "Medium"
                    }
                  ].map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{recommendation.title}</h4>
                          <Badge variant={recommendation.impact === 'High' ? 'destructive' : 'default'}>
                            {recommendation.impact} Impact
                          </Badge>
                          <Badge variant="outline">
                            {recommendation.effort} Effort
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
