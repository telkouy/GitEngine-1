
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { AIAutoDocs } from "@/components/dashboard/ai-auto-docs";

export default function AIAutoDocsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">AI Auto-Generated Documentation</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <AIAutoDocs userId="demo-user" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
