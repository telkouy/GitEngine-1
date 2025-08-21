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
      className="bg-white/80 dark:bg-gray-800/80 glass-effect rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Achievements</h3>
      
      <div className="space-y-4">
        {data.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className={`flex items-center space-x-4 p-4 rounded-xl border ${getAchievementColor(index)}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="text-2xl">{achievement.icon}</div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(index)}`}>
              {formatTimeAgo(new Date(achievement.unlockedAt!))}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
