
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Home,
  FolderKanban,
  BarChart3,
  BookOpen,
  Settings,
  Code2,
  GitBranch,
  Target,
  Trophy,
  Bell,
  User,
  FileText,
  Clock,
  Zap,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
  category: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-dashboard",
      label: "Go to Dashboard",
      description: "View your main dashboard",
      icon: Home,
      action: () => window.location.href = "/",
      shortcut: "⌘D",
      category: "Navigation"
    },
    {
      id: "nav-analytics",
      label: "Go to Analytics",
      description: "View detailed analytics",
      icon: BarChart3,
      action: () => window.location.href = "/analytics",
      shortcut: "⌘A",
      category: "Navigation"
    },
    {
      id: "nav-projects",
      label: "Go to Projects",
      description: "Manage your projects",
      icon: FolderKanban,
      action: () => window.location.href = "/projects",
      shortcut: "⌘P",
      category: "Navigation"
    },
    {
      id: "nav-docs",
      label: "Go to Documentation",
      description: "Browse documentation",
      icon: BookOpen,
      action: () => window.location.href = "/docs",
      shortcut: "⌘O",
      category: "Navigation"
    },
    // Actions
    {
      id: "action-new-project",
      label: "Create New Project",
      description: "Start a new coding project",
      icon: FolderKanban,
      action: () => console.log("Create project"),
      shortcut: "⌘N",
      category: "Actions"
    },
    {
      id: "action-new-doc",
      label: "Create Documentation",
      description: "Add new documentation",
      icon: FileText,
      action: () => console.log("Create doc"),
      shortcut: "⌘Shift+D",
      category: "Actions"
    },
    {
      id: "action-commit-review",
      label: "Review Latest Commits",
      description: "Check recent code changes",
      icon: Code2,
      action: () => console.log("Review commits"),
      shortcut: "⌘R",
      category: "Actions"
    },
    // Quick Actions
    {
      id: "quick-insights",
      label: "Generate AI Insights",
      description: "Get AI analysis of your code",
      icon: Zap,
      action: () => console.log("Generate insights"),
      shortcut: "⌘I",
      category: "Quick Actions"
    },
    {
      id: "quick-timer",
      label: "Start Focus Timer",
      description: "Begin a productive coding session",
      icon: Clock,
      action: () => console.log("Start timer"),
      shortcut: "⌘T",
      category: "Quick Actions"
    },
    // Settings
    {
      id: "settings-theme",
      label: "Toggle Theme",
      description: "Switch between light and dark mode",
      icon: Settings,
      action: () => console.log("Toggle theme"),
      shortcut: "⌘Shift+T",
      category: "Settings"
    }
  ];

  const filteredCommands = commands.filter((command) =>
    command.label.toLowerCase().includes(search.toLowerCase()) ||
    command.description?.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command className="rounded-lg border shadow-2xl">
        <CommandInput 
          placeholder="Type a command or search..." 
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {Object.entries(groupedCommands).map(([category, items], index) => (
            <div key={category}>
              {index > 0 && <CommandSeparator />}
              <CommandGroup heading={category}>
                {items.map((command) => (
                  <CommandItem
                    key={command.id}
                    onSelect={() => {
                      command.action();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                  >
                    <command.icon className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-medium">{command.label}</div>
                      {command.description && (
                        <div className="text-sm text-muted-foreground">
                          {command.description}
                        </div>
                      )}
                    </div>
                    {command.shortcut && (
                      <div className="text-xs text-muted-foreground">
                        {command.shortcut}
                      </div>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
