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
      className="bg-white/80 dark:bg-gray-800/80 glass-effect rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Settings & Profile</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Personal Preferences</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
              <div className="flex items-center space-x-1">
                <button className="px-2 py-1 text-xs bg-primary text-white rounded">Auto</button>
                <button className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400">Light</button>
                <button className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400">Dark</button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Timezone</span>
              <Select defaultValue={user?.timezone || "America/Montevideo"}>
                <SelectTrigger className="w-auto">
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
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Integration Status</h4>
          <div className="space-y-2">
            {integrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{integration.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(integration.status)}`}>
                  {integration.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Performance Stats</h4>
          <div className="space-y-2">
            {performanceStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
