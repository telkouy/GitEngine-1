
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const iconMap = {
  info: Info,
  success: Check,
  warning: AlertTriangle,
  error: AlertCircle,
};

const colorMap = {
  info: "bg-blue-500/10 border-blue-500/20 text-blue-600",
  success: "bg-green-500/10 border-green-500/20 text-green-600",
  warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-600",
  error: "bg-red-500/10 border-red-500/20 text-red-600",
};

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Commit Successful",
      message: "Your latest changes have been pushed to main branch",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: "2", 
      type: "info",
      title: "New Insight Available",
      message: "AI has generated new performance insights for your project",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      action: {
        label: "View Insights",
        onClick: () => console.log("Navigate to insights")
      }
    },
    {
      id: "3",
      type: "warning",
      title: "Code Review Pending",
      message: "3 pull requests are awaiting your review",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-1">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 mr-4" 
        align="end"
        sideOffset={4}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
          </div>
        </div>
        
        <ScrollArea className="h-80">
          <div className="p-2">
            <AnimatePresence>
              {notifications.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const Icon = iconMap[notification.type];
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className={`p-3 m-2 rounded-lg border-2 cursor-pointer transition-all ${
                        !notification.read ? colorMap[notification.type] : "bg-muted/50"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">
                              {notification.title}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-4 h-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                            {notification.action && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-xs h-6"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  notification.action!.onClick();
                                }}
                              >
                                {notification.action.label}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
