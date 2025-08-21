
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FolderKanban,
  BarChart3,
  BookOpen,
  Settings,
  Zap,
  Code2,
  GitBranch,
  Target,
  Trophy,
  Bell,
  User,
  Search,
  ChevronRight,
} from "lucide-react";
import { NotificationCenter } from "@/components/ui/notification-center";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Navigation items structure
const navigationItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
        isActive: true,
        badge: "Live",
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart3,
        badge: "Beta",
      },
    ],
  },
  {
    title: "Development",
    items: [
      {
        title: "Projects",
        url: "/projects",
        icon: FolderKanban,
        subItems: [
          { title: "Active Projects", url: "/projects/active" },
          { title: "Archive", url: "/projects/archive" },
          { title: "Templates", url: "/projects/templates" },
        ],
      },
      {
        title: "Code Reviews",
        url: "/reviews",
        icon: Code2,
        badge: "3",
      },
      {
        title: "Git Integration",
        url: "/git",
        icon: GitBranch,
      },
    ],
  },
  {
    title: "Goals & Growth",
    items: [
      {
        title: "OKRs",
        url: "/okrs",
        icon: Target,
        badge: "2",
      },
      {
        title: "Achievements",
        url: "/achievements",
        icon: Trophy,
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        title: "Documentation",
        url: "/docs",
        icon: BookOpen,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Development"]);
  const [notifications] = useState(5);

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupTitle)
        ? prev.filter(title => title !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border/40 backdrop-blur-xl bg-background/80">
      <SidebarHeader className="border-b border-border/40 p-4">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan p-[1px]">
              <div className="w-full h-full rounded-[11px] bg-background flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-accent-violet to-accent-cyan opacity-20 blur-sm" />
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <h2 className="text-lg font-bold gradient-text">Vibe Coder</h2>
                <p className="text-xs text-muted-foreground">Command Center</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4"
          >
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
              <Search className="w-4 h-4" />
              <span className="text-sm">Search... ⌘K</span>
            </Button>
          </motion.div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        {navigationItems.map((group, groupIndex) => (
          <SidebarGroup key={group.title} className="py-2">
            <SidebarGroupLabel
              className={`px-2 py-1 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider ${
                isCollapsed ? "sr-only" : ""
              }`}
            >
              {group.title}
            </SidebarGroupLabel>
            
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      tooltip={isCollapsed ? item.title : undefined}
                      className="group relative"
                    >
                      <motion.a
                        href={item.url}
                        className="flex items-center w-full"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: groupIndex * 0.1 + itemIndex * 0.05 
                        }}
                        whileHover={{ x: 2 }}
                      >
                        <item.icon className="w-4 h-4" />
                        
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.div
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center justify-between w-full ml-2 overflow-hidden"
                            >
                              <span className="truncate">{item.title}</span>
                              
                              <div className="flex items-center gap-1">
                                {item.badge && (
                                  <Badge 
                                    variant={item.badge === "Live" ? "default" : "secondary"}
                                    className="text-xs px-1.5 py-0.5"
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                                
                                {item.subItems && (
                                  <ChevronRight 
                                    className={`w-3 h-3 transition-transform ${
                                      expandedGroups.includes(item.title) ? "rotate-90" : ""
                                    }`}
                                  />
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.a>
                    </SidebarMenuButton>

                    {/* Sub-menu */}
                    {item.subItems && !isCollapsed && expandedGroups.includes(item.title) && (
                      <SidebarMenuSub>
                        <AnimatePresence>
                          {item.subItems.map((subItem, subIndex) => (
                            <motion.div
                              key={subItem.title}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                            >
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url} className="text-sm">
                                    {subItem.title}
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-emerald via-accent-cyan to-primary p-[1px]">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-accent-emerald/20 to-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
            {notifications > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">{notifications}</span>
              </div>
            )}
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between w-full overflow-hidden"
              >
                <div>
                  <p className="text-sm font-medium">Camila</p>
                  <p className="text-xs text-muted-foreground">Force of Nature</p>
                </div>
                <NotificationCenter />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
