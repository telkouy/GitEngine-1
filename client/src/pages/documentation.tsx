
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Documentation() {
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
                  <BookOpen className="w-6 h-6 text-primary" />
                  <div>
                    <h1 className="text-xl font-bold gradient-text">Documentation</h1>
                    <p className="text-xs text-muted-foreground">Knowledge base</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 relative z-10 px-6 py-8 space-y-8 overflow-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card className="neo-card">
                <CardHeader>
                  <CardTitle>Documentation Hub</CardTitle>
                  <CardDescription>Guides, tutorials, and references</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Documentation system coming soon...</p>
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
