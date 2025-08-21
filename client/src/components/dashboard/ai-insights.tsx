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
      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Insights</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Intelligent development recommendations</p>
        </div>
        <Button
          onClick={() => generateInsightMutation.mutate()}
          disabled={generateInsightMutation.isPending}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm hover:shadow-lg transition-all duration-300"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {generateInsightMutation.isPending ? "Generating..." : "Generate Insight"}
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-primary text-white" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredData.map((insight, index) => (
          <motion.div
            key={insight.id}
            className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">{insight.title}</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(insight.impact)}`}>
                {insight.impact}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{insight.description}</p>
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(insight.category)}`}>
                {insight.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatTimeAgo(new Date(insight.createdAt!))}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
