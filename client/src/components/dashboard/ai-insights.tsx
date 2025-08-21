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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Performance":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400";
      case "Code Quality":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400";
      case "Business Impact":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High Impact":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
      case "Medium Impact":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400";
      case "Low Impact":
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400";
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
      className="glass-card rounded-xl p-6 floating-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">AI Insights Engine</h3>
        <Button
          onClick={() => generateInsightMutation.mutate()}
          disabled={generateInsightMutation.isPending}
          className="gradient-bg text-white text-sm h-8 shadow-md hover:shadow-lg transition-all"
        >
          <Sparkles className="w-3 h-3 mr-1" />
          {generateInsightMutation.isPending ? "Generating..." : "✨ Generate New Insight"}
        </Button>
      </div>

      <div className="flex items-center space-x-1 mb-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={`text-xs h-7 ${selectedCategory === category ? "gradient-bg text-white shadow-md" : "text-muted-foreground"}`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredData.map((insight, index) => (
          <motion.div
            key={insight.id}
            className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-foreground text-sm">{insight.title}</h4>
              <span className={`text-xs px-2 py-0.5 rounded ${getImpactColor(insight.impact)}`}>
                {insight.impact}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-0.5 rounded ${getCategoryColor(insight.category)}`}>
                {insight.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(new Date(insight.createdAt!))}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
