import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { User, Integration } from "@shared/schema";

interface SettingsProfileProps {
  user?: User;
  integrations?: Integration[];
}

export function SettingsProfile({ user, integrations = [] }: SettingsProfileProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
      case "Needs Auth":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400";
      case "Disconnected":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400";
    }
  };

  const performanceStats = [
    { label: "Code Quality Score", value: "9.2/10" },
    { label: "Async Mastery", value: "94%" },
    { label: "Best Coding Time", value: "6-10 AM" },
  ];

  return (
    <motion.div
      className="glass-card rounded-xl p-6 floating-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Settings & Profile</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-foreground mb-2 text-sm">Personal Preferences</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Theme</span>
              <div className="flex items-center space-x-1">
                <button className="px-2 py-1 text-xs gradient-bg text-white rounded">Auto</button>
                <button className="px-2 py-1 text-xs text-muted-foreground">Light</button>
                <button className="px-2 py-1 text-xs text-muted-foreground">Dark</button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Timezone</span>
              <Select defaultValue={user?.timezone || "America/Montevideo"}>
                <SelectTrigger className="w-auto h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Montevideo">America/Montevideo</SelectItem>
                  <SelectItem value="America/New_York">America/New_York</SelectItem>
                  <SelectItem value="Europe/London">Europe/London</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-2 text-sm">Integration Status</h4>
          <div className="space-y-1">
            {integrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{integration.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${getStatusColor(integration.status)}`}>
                  {integration.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-2 text-sm">Performance Stats</h4>
          <div className="space-y-1">
            {performanceStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <span className="text-xs font-medium text-foreground">{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
