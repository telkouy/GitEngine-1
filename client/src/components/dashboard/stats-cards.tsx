import { motion } from "framer-motion";
import { GitCommit, Brain, Clock, BookOpen, Target, TrendingUp } from "lucide-react";
import type { DailyStats } from "@shared/schema";

interface StatsCardsProps {
  data?: DailyStats;
}

export function StatsCards({ data }: StatsCardsProps) {
  const stats = [
    {
      title: "Commits Today",
      value: data?.commits || 8,
      change: "+12%",
      icon: GitCommit,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      title: "Focus Time",
      value: data?.focusTime || "6.2h",
      change: "+8%",
      icon: Clock,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      title: "Code Quality",
      value: "94%",
      change: "+3%",
      icon: Target,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      title: "Productivity",
      value: data?.docsUpdated || "87%",
      change: "+15%",
      icon: TrendingUp,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-200 dark:border-amber-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          className={`bg-white dark:bg-gray-800 rounded-xl p-6 border ${stat.borderColor} shadow-sm hover:shadow-md transition-shadow duration-200`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
              {stat.change}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {stat.title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}