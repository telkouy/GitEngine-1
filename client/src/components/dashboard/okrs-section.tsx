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
      className="glass-card rounded-xl p-6 floating-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Objectives & Key Results</h3>
      
      <div className="space-y-4">
        {data.map((okr, index) => (
          <motion.div
            key={okr.id}
            className="p-3 rounded-lg bg-muted/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground text-sm">{okr.title}</h4>
              <span className="text-xs font-medium text-primary">
                {okr.progress}% Complete
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{okr.category}</p>
            <div className="w-full bg-muted rounded-full h-1.5 mb-2">
              <motion.div 
                className={`h-1.5 rounded-full bg-gradient-to-r ${getProgressColor(okr.progress)}`}
                initial={{ width: 0 }}
                animate={{ width: `${okr.progress}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Target: {okr.target}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
