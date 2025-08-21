import { motion } from "framer-motion";
import { GitCommit, Brain, Clock, BookOpen } from "lucide-react";
import type { DailyStats } from "@shared/schema";

interface StatsCardsProps {
  data?: DailyStats;
}

export function StatsCards({ data }: StatsCardsProps) {
  const cards = [
    {
      icon: GitCommit,
      value: data?.commitsToday?.toString() || "0",
      label: "Commits Today",
      gradient: "from-primary to-primary-light",
      delay: 0,
    },
    {
      icon: Brain,
      value: data?.insightsGenerated?.toString() || "0",
      label: "Insights Generated",
      gradient: "from-accent-cyan to-accent-emerald",
      delay: 0.1,
    },
    {
      icon: Clock,
      value: data?.hoursLogged?.toString() || "0",
      label: "Hours Logged",
      gradient: "from-accent-amber to-primary",
      delay: 0.2,
    },
    {
      icon: BookOpen,
      value: data?.docsUpdated?.toString() || "0",
      label: "Docs Updated",
      gradient: "from-primary-light to-accent-cyan",
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="bg-white/80 dark:bg-gray-800/80 glass-effect rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: card.delay }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${card.gradient} rounded-xl flex items-center justify-center`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{card.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
