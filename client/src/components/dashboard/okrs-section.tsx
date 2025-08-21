import { motion } from "framer-motion";
import type { OKR } from "@shared/schema";

interface OKRsSectionProps {
  data?: OKR[];
}

export function OKRsSection({ data = [] }: OKRsSectionProps) {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "from-accent-emerald to-accent-cyan";
    if (progress >= 60) return "from-primary to-primary-light";
    if (progress >= 40) return "from-accent-amber to-primary";
    return "from-gray-400 to-gray-600";
  };

  const getProgressText = (progress: number) => {
    if (progress >= 80) return "text-primary";
    if (progress >= 60) return "text-accent-amber";
    if (progress >= 40) return "text-accent-emerald";
    return "text-gray-600";
  };

  return (
    <motion.div
      className="bg-white/80 dark:bg-gray-800/80 glass-effect rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Objectives & Key Results</h3>
      
      <div className="space-y-6">
        {data.map((okr, index) => (
          <motion.div
            key={okr.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">{okr.title}</h4>
              <span className={`text-sm font-medium ${getProgressText(okr.progress)}`}>
                {okr.progress}% Complete
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{okr.category}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <motion.div 
                className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(okr.progress)}`}
                initial={{ width: 0 }}
                animate={{ width: `${okr.progress}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Target: {okr.target}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
