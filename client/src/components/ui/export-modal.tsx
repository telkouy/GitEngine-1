
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Image, Database, Calendar, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Label } from './label';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { DatePicker } from './calendar';
import { Progress } from './progress';
import { useToast } from '@/hooks/use-toast';

interface ExportOption {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface ExportModalProps {
  trigger?: React.ReactNode;
  data: any;
  filename?: string;
}

const exportFormats = [
  { value: 'json', label: 'JSON', icon: Database },
  { value: 'csv', label: 'CSV', icon: FileText },
  { value: 'pdf', label: 'PDF Report', icon: FileText },
  { value: 'png', label: 'PNG Image', icon: Image },
];

const dataTypes: ExportOption[] = [
  {
    id: 'stats',
    label: 'Statistics',
    description: 'Daily coding stats and metrics',
    icon: Calendar
  },
  {
    id: 'commits',
    label: 'Commits',
    description: 'Git commit history and details',
    icon: Database
  },
  {
    id: 'insights',
    label: 'AI Insights',
    description: 'Generated insights and recommendations',
    icon: CheckCircle2
  },
  {
    id: 'documentation',
    label: 'Documentation',
    description: 'All documentation entries',
    icon: FileText
  }
];

export function ExportModal({ trigger, data, filename = 'dashboard-export' }: ExportModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['stats']);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const handleExport = async () => {
    if (selectedTypes.length === 0) {
      toast({
        title: 'No data selected',
        description: 'Please select at least one data type to export.',
        variant: 'destructive'
      });
      return;
    }

    setIsExporting(true);
    setProgress(0);

    // Simulate export progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Filter data based on selections
      const exportData = selectedTypes.reduce((acc, type) => {
        if (data[type]) {
          acc[type] = data[type];
        }
        return acc;
      }, {} as any);

      // Apply date filtering if specified
      if (dateRange.from || dateRange.to) {
        // Filter data by date range (implementation would depend on data structure)
      }

      // Generate export based on format
      let blob: Blob;
      let fileExtension: string;
      let mimeType: string;

      switch (selectedFormat) {
        case 'json':
          blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
          fileExtension = 'json';
          mimeType = 'application/json';
          break;
        case 'csv':
          const csv = convertToCSV(exportData);
          blob = new Blob([csv], { type: 'text/csv' });
          fileExtension = 'csv';
          mimeType = 'text/csv';
          break;
        case 'pdf':
          // For PDF, you'd typically use a library like jsPDF
          blob = new Blob(['PDF generation would go here'], { type: 'application/pdf' });
          fileExtension = 'pdf';
          mimeType = 'application/pdf';
          break;
        case 'png':
          // For PNG, you'd capture the dashboard as image
          blob = new Blob(['Image data would go here'], { type: 'image/png' });
          fileExtension = 'png';
          mimeType = 'image/png';
          break;
        default:
          throw new Error('Unsupported format');
      }

      setProgress(100);

      // Download the file
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}-${new Date().toISOString().split('T')[0]}.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setTimeout(() => {
        setIsExporting(false);
        setProgress(0);
        setIsOpen(false);
        toast({
          title: 'Export successful',
          description: `Your data has been exported as ${selectedFormat.toUpperCase()}.`,
        });
      }, 500);

    } catch (error) {
      setIsExporting(false);
      setProgress(0);
      toast({
        title: 'Export failed',
        description: 'There was an error exporting your data. Please try again.',
        variant: 'destructive'
      });
    }

    clearInterval(progressInterval);
  };

  const convertToCSV = (data: any): string => {
    // Simple CSV conversion - you'd want to make this more robust
    const items = Object.values(data).flat() as any[];
    if (items.length === 0) return '';

    const headers = Object.keys(items[0]);
    const csvContent = [
      headers.join(','),
      ...items.map(item => headers.map(header => `"${item[header] || ''}"`).join(','))
    ].join('\n');

    return csvContent;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export Dashboard Data</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Data Types Selection */}
          <div>
            <h4 className="font-medium mb-3">Select Data Types</h4>
            <div className="grid grid-cols-2 gap-3">
              {dataTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedTypes.includes(type.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleTypeToggle(type.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={selectedTypes.includes(type.id)}
                        onChange={() => handleTypeToggle(type.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm">{type.label}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Export Format */}
          <div>
            <h4 className="font-medium mb-3">Export Format</h4>
            <RadioGroup value={selectedFormat} onValueChange={setSelectedFormat}>
              <div className="grid grid-cols-2 gap-3">
                {exportFormats.map((format) => {
                  const Icon = format.icon;
                  return (
                    <div key={format.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={format.value} id={format.value} />
                      <Label
                        htmlFor={format.value}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{format.label}</span>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Date Range (Optional) */}
          <div>
            <h4 className="font-medium mb-3">Date Range (Optional)</h4>
            <div className="flex items-center space-x-4">
              <div>
                <Label className="text-sm text-muted-foreground">From</Label>
                <DatePicker
                  date={dateRange.from}
                  onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">To</Label>
                <DatePicker
                  date={dateRange.to}
                  onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                />
              </div>
            </div>
          </div>

          {/* Progress */}
          {isExporting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Exporting data...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting || selectedTypes.length === 0}
              className="gap-2"
            >
              {isExporting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Download className="w-4 h-4" />
                </motion.div>
              ) : (
                <Download className="w-4 h-4" />
              )}
              Export Data
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
