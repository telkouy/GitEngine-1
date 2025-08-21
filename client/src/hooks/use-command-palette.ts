
import { useState, useCallback } from "react";

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: "navigation" | "action" | "content" | "setting";
  url?: string;
  action?: () => void;
  icon?: string;
  category: string;
}

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  }, []);

  const search = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API search - replace with actual search logic
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: "1",
          title: "Dashboard Overview",
          description: "Main dashboard with stats and insights",
          type: "navigation",
          url: "/",
          category: "Pages"
        },
        {
          id: "2", 
          title: "Create New Project",
          description: "Start a new coding project",
          type: "action",
          action: () => console.log("Create project"),
          category: "Actions"
        }
      ].filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(mockResults);
      setIsLoading(false);
    }, 300);
  }, []);

  return {
    isOpen,
    open,
    close,
    query,
    results,
    isLoading,
    search
  };
}
