import { motion } from "framer-motion";
import type { Achievement } from "@shared/schema";

interface AchievementsProps {
  data?: Achievement[];
}

export function Achievements({ data = [] }: AchievementsProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return "Unlocked Today";
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Unlocked Yesterday";
    return `Unlocked ${diffInDays} days ago`;
  };

  const getAchievementColor = (index: number) => {
    const colors = [
      "bg-yellow-50/50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/30",
      "bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30",
      "bg-green-50/50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30",
      "bg-purple-50/50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/30",
    ];
    return colors[index % colors.length];
  };

  const getBadgeColor = (index: number) => {
    const colors = [
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
      "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
      "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400",
    ];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      className="glass-card rounded-xl p-6 floating-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Achievements</h3>
      
      <div className="space-y-3">
        {data.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 border border-border/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="text-xl">{achievement.icon}</div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground text-sm">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
              {formatTimeAgo(new Date(achievement.unlockedAt!))}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
