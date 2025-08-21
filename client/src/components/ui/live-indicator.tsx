
import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LiveIndicatorProps {
  isConnected: boolean;
  lastUpdate?: Date;
  className?: string;
}

export function LiveIndicator({ isConnected, lastUpdate, className }: LiveIndicatorProps) {
  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      className={cn(
        "flex items-center space-x-2 text-xs",
        isConnected ? "text-accent-emerald" : "text-muted-foreground",
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: isConnected ? Infinity : 0 }}
      >
        {isConnected ? (
          <Wifi className="w-3 h-3" />
        ) : (
          <WifiOff className="w-3 h-3" />
        )}
      </motion.div>
      
      <span className="font-medium">
        {isConnected ? 'Live' : 'Offline'}
      </span>

      {lastUpdate && (
        <>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{formatLastUpdate(lastUpdate)}</span>
          </div>
        </>
      )}

      {isConnected && (
        <motion.div
          className="w-2 h-2 bg-accent-emerald rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

export function ConnectionStatus({ isConnected }: { isConnected: boolean }) {
  return (
    <motion.div
      className={cn(
        "fixed top-4 right-4 z-50 px-3 py-2 rounded-lg backdrop-blur-sm border text-xs font-medium",
        isConnected 
          ? "bg-accent-emerald/10 border-accent-emerald/20 text-accent-emerald" 
          : "bg-destructive/10 border-destructive/20 text-destructive"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center space-x-2">
        {isConnected ? (
          <>
            <motion.div
              className="w-2 h-2 bg-accent-emerald rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span>Connected</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-destructive rounded-full" />
            <span>Connection lost</span>
          </>
        )}
      </div>
    </motion.div>
  );
}
