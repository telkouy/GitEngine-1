
import { useState, useRef, useCallback } from 'react';

interface DragItem {
  id: string;
  type: string;
  data: any;
}

interface DropZone {
  id: string;
  accepts: string[];
  onDrop: (item: DragItem) => void;
}

export function useDragDrop() {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dropZones, setDropZones] = useState<Map<string, DropZone>>(new Map());
  const dragRef = useRef<HTMLElement | null>(null);

  const registerDropZone = useCallback((zone: DropZone) => {
    setDropZones(prev => new Map(prev).set(zone.id, zone));
  }, []);

  const unregisterDropZone = useCallback((id: string) => {
    setDropZones(prev => {
      const newZones = new Map(prev);
      newZones.delete(id);
      return newZones;
    });
  }, []);

  const startDrag = useCallback((item: DragItem, element: HTMLElement) => {
    setDraggedItem(item);
    dragRef.current = element;
    element.style.opacity = '0.5';
  }, []);

  const endDrag = useCallback(() => {
    if (dragRef.current) {
      dragRef.current.style.opacity = '1';
    }
    setDraggedItem(null);
    dragRef.current = null;
  }, []);

  const handleDrop = useCallback((zoneId: string) => {
    const zone = dropZones.get(zoneId);
    if (zone && draggedItem && zone.accepts.includes(draggedItem.type)) {
      zone.onDrop(draggedItem);
    }
    endDrag();
  }, [dropZones, draggedItem, endDrag]);

  return {
    draggedItem,
    startDrag,
    endDrag,
    handleDrop,
    registerDropZone,
    unregisterDropZone,
    isDragging: !!draggedItem
  };
}
