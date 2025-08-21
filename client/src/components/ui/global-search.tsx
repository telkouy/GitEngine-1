
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock, Zap, FileText, Users, Target, Trophy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCommandPalette } from '@/hooks/use-command-palette';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'commits' | 'insights' | 'docs' | 'okrs' | 'achievements';
  relevance: number;
  lastUpdated: Date;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { key: 'commits', label: 'Commits', icon: Zap, color: 'bg-primary/20 text-primary' },
    { key: 'insights', label: 'AI Insights', icon: Search, color: 'bg-accent-violet/20 text-accent-violet' },
    { key: 'docs', label: 'Documentation', icon: FileText, color: 'bg-accent-cyan/20 text-accent-cyan' },
    { key: 'okrs', label: 'OKRs', icon: Target, color: 'bg-accent-emerald/20 text-accent-emerald' },
    { key: 'achievements', label: 'Achievements', icon: Trophy, color: 'bg-accent-amber/20 text-accent-amber' },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length >= 2) {
      performSearch(query);
    } else {
      setResults([]);
    }
  }, [query, filters]);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'Fix authentication bug',
          description: 'Resolved login issues for OAuth integration',
          category: 'commits',
          relevance: 95,
          lastUpdated: new Date()
        },
        {
          id: '2', 
          title: 'Code review velocity improvement',
          description: 'Your review turnaround time improved by 25%',
          category: 'insights',
          relevance: 87,
          lastUpdated: new Date()
        }
      ];

      const filteredResults = filters.length > 0 
        ? mockResults.filter(r => filters.includes(r.category))
        : mockResults;

      setResults(filteredResults.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      setIsLoading(false);
    }, 300);
  };

  const toggleFilter = (category: string) => {
    setFilters(prev => 
      prev.includes(category) 
        ? prev.filter(f => f !== category)
        : [...prev, category]
    );
  };

  const getCategoryConfig = (category: string) => {
    return categories.find(c => c.key === category) || categories[0];
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-auto p-4"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="neo-card p-6 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder="Search everything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-0 focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = filters.includes(category.key);
                const Icon = category.icon;
                
                return (
                  <Button
                    key={category.key}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(category.key)}
                    className={`${isActive ? category.color : ''} transition-all`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.label}
                  </Button>
                );
              })}
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto space-y-2">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : results.length > 0 ? (
                results.map((result) => {
                  const categoryConfig = getCategoryConfig(result.category);
                  const Icon = categoryConfig.icon;
                  
                  return (
                    <motion.div
                      key={result.id}
                      className="p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${categoryConfig.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground mb-1">{result.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {categoryConfig.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {result.lastUpdated.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : query.length >= 2 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Type at least 2 characters to search
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
