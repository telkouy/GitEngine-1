import { motion } from "framer-motion";
import type { NextStep } from "@shared/schema";

interface NextStepsProps {
  data?: NextStep[];
}

export function NextSteps({ data = [] }: NextStepsProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High Priority":
        return "bg-red-50/50 dark:bg-red-900/20 border-red-500 text-red-600 dark:text-red-400";
      case "Medium Priority":
        return "bg-yellow-50/50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-600 dark:text-yellow-400";
      default:
        return "bg-green-50/50 dark:bg-green-900/20 border-green-500 text-green-600 dark:text-green-400";
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case "High Priority":
        return "bg-red-500";
      case "Medium Priority":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <motion.div
      className="glass-card rounded-xl p-6 floating-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Next Steps</h3>
      <div className="space-y-3">
        {data.map((step, index) => (
          <motion.div
            key={step.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${getPriorityDot(step.priority)} rounded-full`}></div>
              <div>
                <p className="font-medium text-foreground text-sm">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.priority}</p>
              </div>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded">
              {step.estimatedTime}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
