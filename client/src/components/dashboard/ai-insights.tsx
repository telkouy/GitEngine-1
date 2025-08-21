import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Insight } from "@shared/schema";

interface AIInsightsProps {
  data?: Insight[];
  userId: string;
}

export function AIInsights({ data = [], userId }: AIInsightsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const categories = ["All", "Performance", "Code Quality", "Business Impact"];

  const generateInsightMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/insights", { userId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard", userId] });
      toast({
        title: "New insight generated",
        description: "A fresh AI insight has been added to your dashboard.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate insight. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "Performance":
        return {
          gradient: "from-blue-500 via-cyan-500 to-teal-500",
          icon: "⚡",
          glow: "rgba(59, 130, 246, 0.3)",
          badge: "bg-blue-500/20 text-blue-300 border-blue-500/30"
        };
      case "Code Quality":
        return {
          gradient: "from-red-500 via-pink-500 to-rose-500",
          icon: "🔍",
          glow: "rgba(239, 68, 68, 0.3)",
          badge: "bg-red-500/20 text-red-300 border-red-500/30"
        };
      case "Business Impact":
        return {
          gradient: "from-purple-500 via-violet-500 to-indigo-500",
          icon: "💼",
          glow: "rgba(147, 51, 234, 0.3)",
          badge: "bg-purple-500/20 text-purple-300 border-purple-500/30"
        };
      default:
        return {
          gradient: "from-gray-500 via-slate-500 to-gray-600",
          icon: "📊",
          glow: "rgba(107, 114, 128, 0.3)",
          badge: "bg-gray-500/20 text-gray-300 border-gray-500/30"
        };
    }
  };

  const getImpactConfig = (impact: string) => {
    switch (impact) {
      case "High Impact":
        return {
          gradient: "from-emerald-500 to-green-500",
          icon: "🚀",
          glow: "rgba(16, 185, 129, 0.4)",
          badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
        };
      case "Medium Impact":
        return {
          gradient: "from-amber-500 to-yellow-500",
          icon: "⭐",
          glow: "rgba(245, 158, 11, 0.4)",
          badge: "bg-amber-500/20 text-amber-300 border-amber-500/30"
        };
      default:
        return {
          gradient: "from-gray-500 to-slate-500",
          icon: "💡",
          glow: "rgba(107, 114, 128, 0.3)",
          badge: "bg-gray-500/20 text-gray-300 border-gray-500/30"
        };
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return "This morning";
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    return `${diffInDays} days ago`;
  };

  const filteredData = selectedCategory === "All" 
    ? data 
    : data.filter(insight => insight.category === selectedCategory);

  return (
    <motion.div
      className="neo-card neo-card-hover p-8 relative overflow-hidden"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan p-[2px]">
              <div className="w-full h-full rounded-[14px] bg-background flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                </motion.div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan opacity-20 blur-md animate-pulse-glow" />
          </div>
          <div>
            <h3 className="text-2xl font-bold gradient-text">AI Insights Engine</h3>
            <p className="text-sm text-muted-foreground font-medium">Intelligent analysis & recommendations</p>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          onClick={() => generateInsightMutation.mutate()}
          disabled={generateInsightMutation.isPending}
          className="w-full bg-gradient-to-r from-primary via-accent-violet to-accent-cyan text-white font-bold py-4 px-6 rounded-2xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div className="relative flex items-center justify-center space-x-3">
            <motion.div
              animate={generateInsightMutation.isPending ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: generateInsightMutation.isPending ? Infinity : 0, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <span className="text-lg">
              {generateInsightMutation.isPending ? "Generating..." : "✨ Generate New Insight"}
            </span>
          </div>
        </Button>
      </motion.div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-primary to-accent-violet text-white shadow-lg"
                : "bg-white/10 text-muted-foreground hover:bg-white/20 hover:text-foreground"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Insights */}
      <div className="space-y-4">
        {filteredData.map((insight, index) => {
          const categoryConfig = getCategoryConfig(insight.category);
          const impactConfig = getImpactConfig(insight.impact);
          
          return (
            <motion.div
              key={insight.id}
              className="group relative"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              {/* Insight Card */}
              <div className="relative rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-6 hover:from-white/10 hover:to-white/15 transition-all duration-300 hover:scale-[1.02]">
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ backgroundColor: categoryConfig.glow }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryConfig.gradient} p-[2px] shadow-lg`}>
                        <div className="w-full h-full rounded-[8px] bg-background/90 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-sm">{categoryConfig.icon}</span>
                        </div>
                      </div>
                      <div>
                        <motion.h4 
                          className="font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent-cyan group-hover:bg-clip-text transition-all duration-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                        >
                          {insight.title}
                        </motion.h4>
                        <div className={`inline-flex items-center px-2 py-1 text-xs font-bold rounded-full border ${categoryConfig.badge} backdrop-blur-sm mt-1`}>
                          {insight.category}
                        </div>
                      </div>
                    </div>
                    
                    {/* Impact Badge */}
                    <div className="flex flex-col items-end">
                      <div className={`px-3 py-1 rounded-xl bg-gradient-to-r ${impactConfig.gradient} text-white text-xs font-bold shadow-lg flex items-center space-x-1`}>
                        <span>{impactConfig.icon}</span>
                        <span>{insight.impact}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium">
                        {formatTimeAgo(new Date(insight.createdAt!))}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <motion.p 
                    className="text-sm text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  >
                    {insight.description}
                  </motion.p>
                </div>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${categoryConfig.gradient} rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-tr from-accent-cyan/10 to-transparent rounded-full blur-2xl" />
    </motion.div>
  );
}
