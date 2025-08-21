import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Commit } from "@shared/schema";

interface CommitsTableProps {
  data?: Commit[];
}

export function CommitsTable({ data = [] }: CommitsTableProps) {
  const [selectedProject, setSelectedProject] = useState("All Projects");

  const projects = ["All Projects", "Ring Analytics Dashboard", "Harley Davidson CRM", "Internal Tools"];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Revenue Attribution":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
      case "Campaign Optimization":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400";
      case "Team Productivity":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  const filteredData = selectedProject === "All Projects" 
    ? data 
    : data.filter(commit => commit.project === selectedProject);

  return (
    <motion.div
      className="glass-card rounded-xl p-6 floating-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Commits</h3>
        <div className="flex items-center space-x-1">
          {projects.map((project) => (
            <Button
              key={project}
              variant={selectedProject === project ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedProject(project)}
              className={`text-xs h-7 ${selectedProject === project ? "gradient-bg text-white shadow-md" : "text-muted-foreground"}`}
            >
              {project}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filteredData.map((commit, index) => (
          <motion.div
            key={commit.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3 flex-1">
              <code className="text-xs bg-muted rounded px-2 py-1 text-muted-foreground">
                {commit.hash}
              </code>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{commit.message}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">{commit.project}</span>
                  <span className={`px-2 py-0.5 text-xs rounded ${getImpactColor(commit.impact)}`}>
                    {commit.impact}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-1.5 bg-muted rounded-full">
                  <div 
                    className="h-full progress-bar rounded-full"
                    style={{ width: `${(commit.valueScore / 10) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-foreground">
                  {commit.valueScore}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(new Date(commit.createdAt!))}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
