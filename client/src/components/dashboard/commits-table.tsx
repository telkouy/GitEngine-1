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
      className="bg-white/80 dark:bg-gray-800/80 glass-effect rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Commits</h3>
        <div className="flex items-center space-x-2">
          {projects.map((project) => (
            <Button
              key={project}
              variant={selectedProject === project ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedProject(project)}
              className={selectedProject === project ? "bg-primary text-white" : ""}
            >
              {project}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Hash</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Message</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Project</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Impact</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Value Score</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.map((commit, index) => (
              <motion.tr
                key={commit.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="py-3 px-4">
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-2 py-1">
                    {commit.hash}
                  </code>
                </td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">{commit.message}</td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{commit.project}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(commit.impact)}`}>
                    {commit.impact}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent-emerald rounded-full"
                        style={{ width: `${(commit.valueScore / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {commit.valueScore}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {formatTimeAgo(new Date(commit.createdAt!))}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
