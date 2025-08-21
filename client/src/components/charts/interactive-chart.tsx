
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ChartData {
  name: string;
  value: number;
  category?: string;
  date?: string;
}

interface InteractiveChartProps {
  data: ChartData[];
  title: string;
  type?: 'line' | 'bar' | 'pie';
  showControls?: boolean;
  height?: number;
}

export function InteractiveChart({ 
  data, 
  title, 
  type = 'line', 
  showControls = true, 
  height = 300 
}: InteractiveChartProps) {
  const [chartType, setChartType] = useState(type);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--accent-violet))',
    'hsl(var(--accent-cyan))',
    'hsl(var(--accent-emerald))',
    'hsl(var(--accent-amber))',
  ];

  const filteredData = useMemo(() => {
    // Filter data based on selected period
    const now = new Date();
    const days = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90;
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    return data.filter(item => {
      if (!item.date) return true;
      return new Date(item.date) >= cutoff;
    });
  }, [data, selectedPeriod]);

  const trend = useMemo(() => {
    if (filteredData.length < 2) return 0;
    const first = filteredData[0].value;
    const last = filteredData[filteredData.length - 1].value;
    return ((last - first) / first) * 100;
  }, [filteredData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neo-card p-3 shadow-lg border">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, className: "drop-shadow-lg" }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <motion.div
      className="neo-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Trend:</span>
            <div className={`flex items-center space-x-1 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm font-medium">{Math.abs(trend).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {showControls && (
          <div className="flex items-center space-x-2">
            {/* Period Selector */}
            <div className="flex rounded-lg border border-border">
              {['7d', '30d', '90d'].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className="rounded-none first:rounded-l-lg last:rounded-r-lg"
                >
                  {period}
                </Button>
              ))}
            </div>

            {/* Chart Type Selector */}
            <div className="flex rounded-lg border border-border">
              <Button
                variant={chartType === 'line' ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType('line')}
                className="rounded-none rounded-l-lg"
              >
                <Activity className="w-4 h-4" />
              </Button>
              <Button
                variant={chartType === 'bar' ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType('bar')}
                className="rounded-none"
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
              <Button
                variant={chartType === 'pie' ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType('pie')}
                className="rounded-none rounded-r-lg"
              >
                <PieChartIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="w-full">
        {renderChart()}
      </div>
    </motion.div>
  );
}
