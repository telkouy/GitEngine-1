
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { CampaignVelocityEngine } from "@/components/dashboard/campaign-velocity-engine";

export default function CampaignVelocityPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold gradient-text">Campaign Velocity Engine</h1>
                  <p className="text-muted-foreground mt-2">
                    Track your products from concept to launch using Force of Vibing methodology
                  </p>
                </div>
              </div>
              
              <CampaignVelocityEngine />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
