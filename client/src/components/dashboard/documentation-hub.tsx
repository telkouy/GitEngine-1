import { motion } from "framer-motion";
import { Plus, FileText, Users, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Documentation } from "@shared/schema";

interface DocumentationHubProps {
  data?: Documentation[];
  userId: string;
}

export function DocumentationHub({ data = [], userId }: DocumentationHubProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createDocMutation = useMutation({
    mutationFn: async (docData: { title: string; type: string; userId: string }) => {
      const response = await apiRequest("POST", "/api/documentation", docData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard", userId] });
      toast({
        title: "Documentation created",
        description: "Your new documentation has been created successfully.",
      });
      setOpen(false);
      setTitle("");
      setType("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create documentation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "Technical Spec":
        return FileText;
      case "Process Documentation":
        return Users;
      case "System Design":
        return Layout;
      default:
        return FileText;
    }
  };

  const getGradient = (type: string) => {
    switch (type) {
      case "Technical Spec":
        return "from-accent-emerald to-accent-cyan";
      case "Process Documentation":
        return "from-accent-amber to-primary";
      case "System Design":
        return "from-primary to-primary-light";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Technical Spec":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400";
      case "Process Documentation":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400";
      case "System Design":
        return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "text-green-600 dark:text-green-400";
      case "In Progress":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return "Updated Today";
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Updated Yesterday";
    return `Updated ${diffInDays} days ago`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && type) {
      createDocMutation.mutate({ title, type, userId });
    }
  };

  return (
    <motion.div
      className="glass-card rounded-xl p-6 floating-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Documentation Hub</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-bg text-white text-sm h-8 shadow-md hover:shadow-lg transition-all">
              <Plus className="w-3 h-3 mr-1" />
              Create New Doc
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Documentation</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter documentation title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={setType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select documentation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical Spec">Technical Spec</SelectItem>
                    <SelectItem value="Process Documentation">Process Documentation</SelectItem>
                    <SelectItem value="System Design">System Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={createDocMutation.isPending}
              >
                {createDocMutation.isPending ? "Creating..." : "Create Documentation"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {data.map((doc, index) => {
          const IconComponent = getIcon(doc.type);
          return (
            <motion.div
              key={doc.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${getGradient(doc.type)} rounded-lg flex items-center justify-center shadow-sm`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{doc.title}</h4>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${getTypeColor(doc.type)}`}>
                      {doc.type}
                    </span>
                    {doc.isAutoGenerated && (
                      <span className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded">
                        AUTO
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xs font-medium ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatTimeAgo(new Date(doc.updatedAt!))}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
