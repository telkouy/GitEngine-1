import { motion } from "framer-motion";
import { GitCommit, Brain, Clock, BookOpen } from "lucide-react";
import { StatsCardSkeleton } from "@/components/ui/skeleton-components";
import type { DailyStats } from "@shared/schema";

interface StatsCardsProps {
  data?: DailyStats;
}

export function StatsCards({ data }: StatsCardsProps) {
  // Default values for demo
  const defaultData: DailyStats = {
    commitsToday: 3,
    insightsGenerated: 8,
    hoursLogged: 6,
    docsUpdated: 2
  };

  // Use provided data or fallback to defaults
  const statsData = data || defaultData;

  console.log('[StatsCards] Rendering with data:', statsData);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const cards = [
    {
      icon: GitCommit,
      value: statsData?.commitsToday?.toString() || "0",
      label: "Commits Today",
      gradient: "from-primary via-accent-violet to-primary-light",
      glowColor: "rgba(139, 92, 246, 0.3)",
      emoji: "💾",
      delay: 0,
    },
    {
      icon: Brain,
      value: statsData?.insightsGenerated?.toString() || "0",
      label: "Insights Generated",
      gradient: "from-accent-cyan via-accent-emerald to-primary",
      glowColor: "rgba(59, 130, 246, 0.3)",
      emoji: "🧠",
      delay: 0.1,
    },
    {
      icon: Clock,
      value: statsData?.hoursLogged?.toString() || "0",
      label: "Hours Logged",
      gradient: "from-accent-amber via-accent-pink to-accent-violet",
      glowColor: "rgba(251, 191, 36, 0.3)",
      emoji: "⏱️",
      delay: 0.2,
    },
    {
      icon: BookOpen,
      value: statsData?.docsUpdated?.toString() || "0",
      label: "Docs Updated",
      gradient: "from-accent-emerald via-accent-cyan to-primary-light",
      glowColor: "rgba(16, 185, 129, 0.3)",
      emoji: "📚",
      delay: 0.3,
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="metric-card group relative"
          variants={itemVariants}
        >
          {/* Glow Effect */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
            style={{ backgroundColor: card.glowColor }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} p-[2px] shadow-2xl`}>
                  <div className="w-full h-full rounded-[14px] bg-background/90 flex items-center justify-center backdrop-blur-sm">
                    <card.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 text-lg animate-bounce-in" style={{ animationDelay: `${card.delay + 0.5}s` }}>
                  {card.emoji}
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/20" />
            </div>

            {/* Value & Label */}
            <div className="flex-1 flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: card.delay + 0.2 }}
              >
                <div className="text-right mb-2">
                  <motion.p
                    className="text-4xl font-black bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: card.delay + 0.3,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    {card.value}
                  </motion.p>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {card.label}
                  </p>
                </div>

                {/* Progress Line */}
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${card.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(parseFloat(card.value) * 20, 100)}%` }}
                    transition={{ duration: 1.5, delay: card.delay + 0.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
            background: `conic-gradient(from 0deg, transparent, ${card.glowColor}, transparent)`
          }} />
        </motion.div>
      ))}
    </motion.div>
  );
}