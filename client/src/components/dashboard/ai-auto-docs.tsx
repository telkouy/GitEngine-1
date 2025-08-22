
import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, FileText, User, Code, Zap, RefreshCw, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Documentation } from "@shared/schema";

interface AIAutoDocsProps {
  userId: string;
}

export function AIAutoDocs({ userId }: AIAutoDocsProps) {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: autoDocs = [], isLoading } = useQuery<Documentation[]>({
    queryKey: ["/api/auto-docs", userId],
    retry: 3,
    retryDelay: 1000,
  });

  const { data: projects = [] } = useQuery<string[]>({
    queryKey: ["/api/projects/list", userId],
    retry: 3,
    retryDelay: 1000,
  });

  const generateUserStoryMutation = useMutation({
    mutationFn: async (projectName: string) => {
      const response = await fetch("/api/auto-docs/generate-user-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, projectName }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auto-docs", userId] });
      toast({
        title: "✨ Historia de Usuario Generada",
        description: "La documentación se ha creado automáticamente basándose en los commits.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo generar la historia de usuario.",
        variant: "destructive",
      });
    },
  });

  const generateTechnicalDocMutation = useMutation({
    mutationFn: async (projectName: string) => {
      const response = await fetch("/api/auto-docs/generate-technical-doc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, projectName }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auto-docs", userId] });
      toast({
        title: "🔧 Documentación Técnica Generada",
        description: "La documentación técnica se ha creado automáticamente.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo generar la documentación técnica.",
        variant: "destructive",
      });
    },
  });

  const handleGenerateUserStory = () => {
    if (!selectedProject) return;
    setGenerating(true);
    generateUserStoryMutation.mutate(selectedProject, {
      onSettled: () => setGenerating(false),
    });
  };

  const handleGenerateTechnicalDoc = () => {
    if (!selectedProject) return;
    setGenerating(true);
    generateTechnicalDocMutation.mutate(selectedProject, {
      onSettled: () => setGenerating(false),
    });
  };

  const getDocIcon = (type: string) => {
    switch (type) {
      case "User Story":
        return User;
      case "Technical Documentation":
        return Code;
      default:
        return FileText;
    }
  };

  const getDocColor = (type: string) => {
    switch (type) {
      case "User Story":
        return "bg-blue-500/20 text-blue-400";
      case "Technical Documentation":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-purple-500/20 text-purple-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  AI Auto-Generated Docs
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                </CardTitle>
                <CardDescription>
                  Documentación inteligente generada automáticamente desde tus commits
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="border-purple-500/30 text-purple-400">
              {autoDocs.length} docs generados
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">
                Seleccionar Proyecto
              </label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Elige un proyecto..." />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">
                Acciones de Generación
              </label>
              <div className="flex gap-2">
                <Button
                  onClick={handleGenerateUserStory}
                  disabled={!selectedProject || generating}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  {generating ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <User className="h-4 w-4 mr-2" />
                  )}
                  Historia de Usuario
                </Button>
                <Button
                  onClick={handleGenerateTechnicalDoc}
                  disabled={!selectedProject || generating}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  {generating ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Code className="h-4 w-4 mr-2" />
                  )}
                  Doc Técnica
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
            Cargando documentación auto-generada...
          </div>
        ) : autoDocs.length === 0 ? (
          <Card className="border-dashed border-gray-600">
            <CardContent className="text-center py-8">
              <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No hay documentación auto-generada</h3>
              <p className="text-muted-foreground mb-4">
                Selecciona un proyecto y genera documentación inteligente basada en tus commits
              </p>
              <div className="flex justify-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-yellow-400">AI-Powered Documentation</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          autoDocs.map((doc) => {
            const IconComponent = getDocIcon(doc.type);
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                          <IconComponent className="h-5 w-5 text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{doc.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={getDocColor(doc.type)}
                            >
                              {doc.type}
                            </Badge>
                            <Badge variant="outline" className="border-green-500/30 text-green-400">
                              <Bot className="h-3 w-3 mr-1" />
                              Auto-generado
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {doc.updatedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  {doc.content && (
                    <CardContent>
                      <div className="bg-gray-900/50 rounded-lg p-4 text-sm">
                        <pre className="whitespace-pre-wrap text-gray-300 max-h-40 overflow-y-auto">
                          {doc.content.substring(0, 300)}
                          {doc.content.length > 300 && "..."}
                        </pre>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
