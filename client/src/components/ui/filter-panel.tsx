
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Calendar, Tag, User, TrendingUp } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Checkbox } from './checkbox';
import { Label } from './label';
import { DatePicker } from './calendar';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  options: FilterOption[];
}

interface FilterPanelProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFiltersChange: (filters: Record<string, string[]>) => void;
  className?: string;
}

export function FilterPanel({ 
  filters, 
  activeFilters, 
  onFiltersChange, 
  className 
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalActiveFilters = Object.values(activeFilters).flat().length;

  const handleFilterToggle = (groupId: string, optionValue: string) => {
    const currentGroupFilters = activeFilters[groupId] || [];
    const newGroupFilters = currentGroupFilters.includes(optionValue)
      ? currentGroupFilters.filter(f => f !== optionValue)
      : [...currentGroupFilters, optionValue];

    onFiltersChange({
      ...activeFilters,
      [groupId]: newGroupFilters
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const clearGroupFilters = (groupId: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[groupId];
    onFiltersChange(newFilters);
  };

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 relative"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {totalActiveFilters > 0 && (
              <Badge 
                variant="destructive" 
                className="ml-1 h-5 min-w-5 text-xs rounded-full p-0 flex items-center justify-center"
              >
                {totalActiveFilters}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-0" align="end">
          <div className="border-b border-border p-4 flex items-center justify-between">
            <h3 className="font-semibold">Filters</h3>
            {totalActiveFilters > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs h-auto p-1"
              >
                Clear all
              </Button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filters.map((group) => {
              const groupActiveFilters = activeFilters[group.id] || [];
              const Icon = group.icon;

              return (
                <div key={group.id} className="border-b border-border last:border-b-0">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{group.label}</span>
                      </div>
                      {groupActiveFilters.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => clearGroupFilters(group.id)}
                          className="text-xs h-auto p-1 text-muted-foreground hover:text-foreground"
                        >
                          Clear
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {group.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`${group.id}-${option.id}`}
                            checked={groupActiveFilters.includes(option.value)}
                            onCheckedChange={() => handleFilterToggle(group.id, option.value)}
                          />
                          <Label
                            htmlFor={`${group.id}-${option.id}`}
                            className="text-sm flex-1 cursor-pointer flex items-center justify-between"
                          >
                            <span>{option.label}</span>
                            {option.count !== undefined && (
                              <span className="text-muted-foreground text-xs">
                                {option.count}
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters Display */}
      <AnimatePresence>
        {totalActiveFilters > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {Object.entries(activeFilters).map(([groupId, values]) =>
              values.map((value) => {
                const group = filters.find(f => f.id === groupId);
                const option = group?.options.find(o => o.value === value);
                
                return (
                  <motion.div
                    key={`${groupId}-${value}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="gap-1 pr-1"
                    >
                      {option?.label || value}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto w-auto p-0.5 hover:bg-destructive/20 rounded-sm"
                        onClick={() => handleFilterToggle(groupId, value)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Example usage with sample data
export const sampleFilters: FilterGroup[] = [
  {
    id: 'category',
    label: 'Category',
    icon: Tag,
    options: [
      { id: 'commits', label: 'Commits', value: 'commits', count: 12 },
      { id: 'insights', label: 'AI Insights', value: 'insights', count: 8 },
      { id: 'docs', label: 'Documentation', value: 'docs', count: 5 },
    ]
  },
  {
    id: 'priority',
    label: 'Priority',
    icon: TrendingUp,
    options: [
      { id: 'high', label: 'High', value: 'high', count: 3 },
      { id: 'medium', label: 'Medium', value: 'medium', count: 7 },
      { id: 'low', label: 'Low', value: 'low', count: 2 },
    ]
  },
  {
    id: 'author',
    label: 'Author',
    icon: User,
    options: [
      { id: 'camila', label: 'Camila', value: 'camila', count: 15 },
      { id: 'system', label: 'System', value: 'system', count: 5 },
    ]
  }
];
