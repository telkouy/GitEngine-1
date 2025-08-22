import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Commit, OKR, User as UserType } from "@shared/schema";
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
  Sparkles,
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
import { useNavigate, useLocation } from 'react-router-dom';

// Navigation items structure
interface SubItem {
  title: string;
  url: string;
  isActive?: boolean;
}

interface NavItem {
  title: string;
  url: string;
  icon: any;
  isActive?: boolean;
  badge?: string;
  subItems?: SubItem[];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export function AppSidebar() {
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch real data for dynamic badges
  const { data: dashboardData } = useQuery<{
    commits: Commit[];
    okrs: OKR[];
    insights: any[];
    achievements: any[];
  }>({
    queryKey: ["/api/dashboard", "demo-user"],
    retry: 3,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: user } = useQuery<UserType>({
    queryKey: ["/api/user/demo"],
    retry: 3,
  });

  // Calculate dynamic badge counts
  const pendingReviews = dashboardData?.commits?.filter(commit => 
    commit.createdAt && new Date(commit.createdAt).getTime() > Date.now() - (24 * 60 * 60 * 1000) // Last 24 hours
  ).length || 0;

  const activeOKRs = dashboardData?.okrs?.filter(okr => okr.progress < 100).length || 0;
  const recentInsights = dashboardData?.insights?.filter(insight =>
    insight.createdAt && new Date(insight.createdAt).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000) // Last 7 days
  ).length || 0;
  const recentAchievements = dashboardData?.achievements?.filter(achievement =>
    achievement.unlockedAt && new Date(achievement.unlockedAt).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000) // Last 7 days
  ).length || 0;

  const notifications = recentInsights + recentAchievements;

  // Dummy data for docsCount to show badge, replace with actual API call
  const docsCount = 5; 

  // Dynamic navigation items with improved organization
  const navigationItems: NavGroup[] = [
    {
      title: "Command Center",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: Home,
          isActive: true,
          badge: "Live",
        },
        {
          title: "Analytics Hub",
          url: "/analytics",
          icon: BarChart3,
          badge: dashboardData ? "Active" : undefined,
        },
      ],
    },
    {
      title: "AI Workspace",
      items: [
        {
          title: "AI Assistant",
          url: "/ai-insights",
          icon: Sparkles,
          badge: recentInsights > 0 ? "Active" : "New",
          subItems: [
            { title: "Code Insights", url: "/ai-insights" },
            { title: "Performance Analysis", url: "/ai-performance" },
            { title: "Code Reviews", url: "/ai-reviews" },
          ],
        },
        {
          title: "Campaign Velocity",
          url: "/campaign-velocity",
          icon: Zap,
          badge: "Live",
        },
        {
          title: "Documentation AI",
          url: "/ai-auto-docs",
          icon: Zap,
          badge: docsCount > 0 ? docsCount.toString() : "Smart",
        },
      ],
    },
    {
      title: "Development Hub",
      items: [
        {
          title: "Projects",
          url: "/projects",
          icon: FolderKanban,
          subItems: [
            { title: "Active Projects", url: "/projects/active" },
            { title: "Project Archive", url: "/projects/archive" },
            { title: "Templates", url: "/projects/templates" },
          ],
        },
        {
          title: "Code Reviews",
          url: "/reviews",
          icon: Code2,
          badge: pendingReviews > 0 ? pendingReviews.toString() : undefined,
        },
        {
          title: "Git Integration",
          url: "/git",
          icon: GitBranch,
          badge: "Connected",
        },
        {
          title: "Documentation",
          url: "/documentation",
          icon: BookOpen,
          subItems: [
            { title: "Manual Docs", url: "/documentation" },
            { title: "API Reference", url: "/api-docs" },
          ],
        },
      ],
    },
    {
      title: "Growth & Goals",
      items: [
        {
          title: "OKRs & Objectives",
          url: "/okrs",
          icon: Target,
          badge: activeOKRs > 0 ? activeOKRs.toString() : undefined,
        },
        {
          title: "Achievements",
          url: "/achievements",
          icon: Trophy,
          badge: recentAchievements > 0 ? "New!" : undefined,
        },
      ],
    },
    {
      title: "Configuration",
      items: [
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ],
    },
  ];

  const toggleGroup = (groupTitle: string) => {
    const newExpandedGroups = new Set(expandedGroups);
    if (newExpandedGroups.has(groupTitle)) {
      newExpandedGroups.delete(groupTitle);
    } else {
      newExpandedGroups.add(groupTitle);
    }
    setExpandedGroups(newExpandedGroups);
  };

  // Update navigation items to be active based on current route
  const updatedNavigationItems = navigationItems.map(group => ({
    ...group,
    items: group.items.map(item => ({
      ...item,
      isActive: location.pathname === item.url,
      subItems: item.subItems?.map((subItem: SubItem) => ({
        ...subItem,
        isActive: location.pathname === subItem.url
      }))
    }))
  }));


  // notifications is now calculated from real data above

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
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
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
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => {
                console.log("Search functionality clicked");
                // TODO: Implement search functionality
              }}
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Search... ⌘K</span>
            </Button>
          </motion.div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        {updatedNavigationItems.map((group, groupIndex) => (
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
                      isActive={item.isActive}
                      tooltip={isCollapsed ? item.title : undefined}
                      className="group relative"
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.subItems) {
                          toggleGroup(item.title);
                        } else {
                          console.log(`Navigating to: ${item.title} (${item.url})`);
                          navigate(item.url);
                        }
                      }}
                    >
                      <motion.div
                        className="flex items-center w-full cursor-pointer"
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
                                      expandedGroups.has(item.title) ? "rotate-90" : ""
                                    }`}
                                  />
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </SidebarMenuButton>

                    {/* Sub-menu */}
                    {item.subItems && !isCollapsed && expandedGroups.has(item.title) && (
                      <SidebarMenuSub>
                        <AnimatePresence>
                          {item.subItems.map((subItem: SubItem, subIndex: number) => (
                            <motion.div
                              key={subItem.title}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                            >
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton
                                  className="text-sm cursor-pointer"
                                  isActive={subItem.isActive}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    console.log(`Navigating to: ${subItem.title} (${subItem.url})`);
                                    navigate(subItem.url);
                                  }}
                                >
                                  {subItem.title}
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
                <span className="text-xs text-white font-medium">{Math.min(notifications, 9)}</span>
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
                  <p className="text-sm font-medium">{user?.name || "Camila"}</p>
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