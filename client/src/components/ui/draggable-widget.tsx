
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import { useDragDrop } from '@/hooks/use-drag-drop';

interface DraggableWidgetProps {
  id: string;
  type: string;
  data?: any;
  children: ReactNode;
  className?: string;
  isDraggable?: boolean;
}

export function DraggableWidget({ 
  id, 
  type, 
  data, 
  children, 
  className = "", 
  isDraggable = true 
}: DraggableWidgetProps) {
  const { startDrag, endDrag, isDragging } = useDragDrop();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDraggable) return;
    
    const element = e.currentTarget;
    startDrag({ id, type, data }, element);
    
    // Set drag data for native HTML5 drag and drop
    e.dataTransfer.setData('text/plain', JSON.stringify({ id, type, data }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    endDrag();
  };

  return (
    <motion.div
      className={`relative group ${className}`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: isDraggable ? 1.02 : 1 }}
      whileDrag={{ scale: 0.95, rotate: 2 }}
    >
      {isDraggable && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div className="p-1 rounded bg-background/80 backdrop-blur-sm border border-border">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      )}
      
      <div className={`${isDragging ? 'opacity-50' : 'opacity-100'} transition-opacity`}>
        {children}
      </div>
    </motion.div>
  );
}
