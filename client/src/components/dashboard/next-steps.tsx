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
      className="bg-white/80 dark:bg-gray-800/80 glass-effect rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Next Steps</h3>
      <div className="space-y-4">
        {data.map((step, index) => (
          <motion.div
            key={step.id}
            className={`flex items-center justify-between p-4 rounded-xl border-l-4 ${getPriorityColor(step.priority)}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${getPriorityDot(step.priority)} rounded-full`}></div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{step.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{step.priority}</p>
              </div>
            </div>
            <span className={`text-sm font-medium ${getPriorityColor(step.priority).split(' ').slice(-2).join(' ')}`}>
              {step.estimatedTime}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
