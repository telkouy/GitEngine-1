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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="glass-card rounded-xl p-4 floating-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: card.delay }}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${card.gradient} rounded-lg flex items-center justify-center shadow-md`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <span className="text-xl font-bold text-foreground">{card.value}</span>
                <span className="text-xs text-muted-foreground">💾</span>
              </div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
