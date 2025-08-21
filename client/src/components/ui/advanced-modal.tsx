
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  disabled?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: ModalAction[];
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showBackButton?: boolean;
  onBack?: () => void;
  preventClose?: boolean;
  className?: string;
}

export function AdvancedModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  actions = [],
  size = "md",
  showBackButton = false,
  onBack,
  preventClose = false,
  className = ""
}: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !preventClose) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, preventClose]);

  const handleClose = () => {
    if (preventClose) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg", 
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[95vw] max-h-[95vh]"
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className={`${sizeClasses[size]} ${className}`}
        onInteractOutside={(e) => {
          if (preventClose) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <div className="flex items-center gap-3">
            {showBackButton && onBack && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="p-1"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="flex-1">
              <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
              {description && (
                <DialogDescription className="mt-1">
                  {description}
                </DialogDescription>
              )}
            </div>
            {!preventClose && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClose}
                className="p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="py-4"
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {actions.length > 0 && (
          <DialogFooter>
            <div className="flex gap-2 justify-end">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  onClick={action.onClick}
                  disabled={action.disabled}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Hook for managing multiple modals
export function useAdvancedModal() {
  const [modals, setModals] = useState<Record<string, boolean>>({});

  const openModal = (id: string) => {
    setModals(prev => ({ ...prev, [id]: true }));
  };

  const closeModal = (id: string) => {
    setModals(prev => ({ ...prev, [id]: false }));
  };

  const isModalOpen = (id: string) => {
    return modals[id] || false;
  };

  return {
    openModal,
    closeModal,
    isModalOpen
  };
}
