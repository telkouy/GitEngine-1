import { motion } from "framer-motion";
import { GitBranch, GitCommit, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import { TableSkeleton } from "@/components/ui/skeleton-components";
import type { Commit } from "@shared/schema";

interface CommitsTableProps {
  data?: Commit[];
}

export function CommitsTable({ data = [] }: CommitsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredCommits = useMemo(() => {
    return data.filter(commit => {
      const matchesSearch = commit.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          commit.project.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === "all" || commit.project === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [data, searchTerm, filterType]);

  const branches = useMemo(() => {
    const uniqueBranches = Array.from(new Set(data.map(commit => commit.project)));
    return uniqueBranches;
  }, [data]);

  if (!data || data.length === 0) {
    return <TableSkeleton rows={5} />;
  }

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

  return (
    <motion.div
      className="bg-white/80 dark:bg-gray-800/80 glass-effect rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold gradient-text">Recent Commits</h3>
        <GitCommit className="w-8 h-8 text-primary animate-pulse-glow" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search commits or branches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-glass-secondary border-white/10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-48 bg-glass-secondary border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All projects</SelectItem>
            {branches.map(branch => (
              <SelectItem key={branch} value={branch}>{branch}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            {filteredCommits.slice(0, 10).map((commit, index) => (
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