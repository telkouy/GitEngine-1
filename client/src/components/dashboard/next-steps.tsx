import { motion } from "framer-motion";
import type { NextStep } from "@shared/schema";

interface NextStepsProps {
  data?: NextStep[];
}

export function NextSteps({ data = [] }: NextStepsProps) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "High Priority":
        return {
          gradient: "from-red-500 via-pink-500 to-rose-500",
          glow: "rgba(239, 68, 68, 0.3)",
          badge: "bg-red-500/20 text-red-300 border-red-500/30",
          icon: "🔥",
          pulse: "animate-pulse-glow"
        };
      case "Medium Priority":
        return {
          gradient: "from-amber-500 via-yellow-500 to-orange-500",
          glow: "rgba(245, 158, 11, 0.3)",
          badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
          icon: "⚡",
          pulse: ""
        };
      default:
        return {
          gradient: "from-emerald-500 via-green-500 to-teal-500",
          glow: "rgba(16, 185, 129, 0.3)",
          badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          icon: "✨",
          pulse: ""
        };
    }
  };

  return (
    <motion.div
      className="neo-card neo-card-hover p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan p-[2px]">
            <div className="w-full h-full rounded-[14px] bg-background flex items-center justify-center">
              <motion.div
                className="text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                📋
              </motion.div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold gradient-text">Next Steps</h3>
            <p className="text-sm text-muted-foreground font-medium">Action items & priorities</p>
          </div>
        </div>
        
        {/* Priority Counter */}
        <div className="flex items-center space-x-2">
          <div className="text-xs text-muted-foreground font-medium">
            {data.length} task{data.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        {data.map((step, index) => {
          const config = getPriorityConfig(step.priority);
          return (
            <motion.div
              key={step.id}
              className="group relative"
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              {/* Task Card */}
              <div className="relative rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-6 hover:from-white/10 hover:to-white/15 transition-all duration-300 hover:scale-[1.02]">
                {/* Priority Glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ backgroundColor: config.glow }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex items-center justify-between">
                  {/* Left Side */}
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Priority Indicator */}
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} p-[2px] shadow-lg ${config.pulse}`}>
                        <div className="w-full h-full rounded-[10px] bg-background/90 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-lg">{config.icon}</span>
                        </div>
                      </div>
                      
                      {/* Priority Badge */}
                      <div className="absolute -top-2 -right-2">
                        <div className={`px-2 py-1 text-xs font-bold rounded-full border ${config.badge} backdrop-blur-sm`}>
                          {step.priority === "High Priority" ? "H" : step.priority === "Medium Priority" ? "M" : "L"}
                        </div>
                      </div>
                    </div>

                    {/* Task Info */}
                    <div className="flex-1 min-w-0">
                      <motion.h4 
                        className="font-bold text-foreground text-lg mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent-cyan group-hover:bg-clip-text transition-all duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                      >
                        {step.title}
                      </motion.h4>
                      <p className="text-sm text-muted-foreground font-medium">
                        {step.priority}
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Time Estimate */}
                  <div className="flex flex-col items-end">
                    <motion.div
                      className={`px-4 py-2 rounded-xl bg-gradient-to-r ${config.gradient} text-white font-bold text-sm shadow-lg`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {step.estimatedTime}
                    </motion.div>
                    
                    {/* Progress Indicator */}
                    <div className="w-16 h-1 bg-muted rounded-full mt-2 overflow-hidden">
                      <motion.div 
                        className={`h-full bg-gradient-to-r ${config.gradient} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: step.priority === "High Priority" ? "100%" : step.priority === "Medium Priority" ? "60%" : "30%" }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${config.gradient} rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
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
