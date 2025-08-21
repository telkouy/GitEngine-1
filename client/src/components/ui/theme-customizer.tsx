
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Download, Upload, RotateCcw, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useTheme } from '@/components/ui/theme-provider';

interface ColorScheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
}

const presetThemes: ColorScheme[] = [
  {
    name: 'Cyberpunk',
    primary: '#ff0080',
    secondary: '#00ffff',
    accent: '#ffff00',
    background: '#0a0a0a',
    foreground: '#ffffff'
  },
  {
    name: 'Ocean',
    primary: '#0066cc',
    secondary: '#00cccc',
    accent: '#66ccff',
    background: '#f0f8ff',
    foreground: '#003366'
  },
  {
    name: 'Forest',
    primary: '#228b22',
    secondary: '#32cd32',
    accent: '#90ee90',
    background: '#f0fff0',
    foreground: '#006400'
  }
];

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [currentScheme, setCurrentScheme] = useState<ColorScheme>({
    name: 'Custom',
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    accent: '#10b981',
    background: '#ffffff',
    foreground: '#0a0a0a'
  });

  const [glassEffect, setGlassEffect] = useState(50);
  const [borderRadius, setBorderRadius] = useState(8);
  const [animations, setAnimations] = useState(true);

  const applyTheme = (scheme: ColorScheme) => {
    setCurrentScheme(scheme);
    
    // Apply CSS custom properties
    const root = document.documentElement;
    root.style.setProperty('--primary', scheme.primary);
    root.style.setProperty('--secondary', scheme.secondary);
    root.style.setProperty('--accent', scheme.accent);
    root.style.setProperty('--background', scheme.background);
    root.style.setProperty('--foreground', scheme.foreground);
    root.style.setProperty('--glass-opacity', (glassEffect / 100).toString());
    root.style.setProperty('--border-radius', `${borderRadius}px`);
  };

  const generateRandomTheme = () => {
    const randomColor = () => {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 50 + Math.floor(Math.random() * 50);
      const lightness = 40 + Math.floor(Math.random() * 20);
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    const newScheme: ColorScheme = {
      name: 'Random',
      primary: randomColor(),
      secondary: randomColor(),
      accent: randomColor(),
      background: theme === 'dark' ? '#0a0a0a' : '#ffffff',
      foreground: theme === 'dark' ? '#ffffff' : '#0a0a0a'
    };

    applyTheme(newScheme);
  };

  const exportTheme = () => {
    const themeData = {
      scheme: currentScheme,
      glassEffect,
      borderRadius,
      animations
    };
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentScheme.name.toLowerCase()}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const themeData = JSON.parse(e.target?.result as string);
        setCurrentScheme(themeData.scheme);
        setGlassEffect(themeData.glassEffect || 50);
        setBorderRadius(themeData.borderRadius || 8);
        setAnimations(themeData.animations !== false);
        applyTheme(themeData.scheme);
      } catch (error) {
        console.error('Failed to import theme:', error);
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50"
      >
        <Palette className="w-4 h-4 mr-2" />
        Customize Theme
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-0 top-0 h-full w-80 bg-background/95 backdrop-blur-lg border-l border-border z-50 overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Theme Customizer</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </Button>
        </div>

        {/* Preset Themes */}
        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">Preset Themes</Label>
          <div className="grid grid-cols-1 gap-2">
            {presetThemes.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                className="justify-start"
                onClick={() => applyTheme(preset)}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: preset.secondary }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: preset.accent }}
                    />
                  </div>
                  <span>{preset.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {/* Custom Colors */}
        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">Custom Colors</Label>
          <div className="space-y-3">
            {Object.entries(currentScheme).slice(1).map(([key, value]) => (
              <div key={key}>
                <Label className="text-xs capitalize mb-1 block">{key}</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={value}
                    onChange={(e) => {
                      const newScheme = { ...currentScheme, [key]: e.target.value };
                      applyTheme(newScheme);
                    }}
                    className="w-12 h-8 rounded cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      const newScheme = { ...currentScheme, [key]: e.target.value };
                      applyTheme(newScheme);
                    }}
                    className="flex-1 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Effects */}
        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">Effects</Label>
          <div className="space-y-4">
            <div>
              <Label className="text-xs mb-2 block">Glass Effect: {glassEffect}%</Label>
              <Slider
                value={[glassEffect]}
                onValueChange={(value) => setGlassEffect(value[0])}
                max={100}
                step={1}
              />
            </div>
            
            <div>
              <Label className="text-xs mb-2 block">Border Radius: {borderRadius}px</Label>
              <Slider
                value={[borderRadius]}
                onValueChange={(value) => setBorderRadius(value[0])}
                max={24}
                step={1}
              />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col space-y-2">
          <Button onClick={generateRandomTheme} className="w-full">
            <Wand2 className="w-4 h-4 mr-2" />
            Random Theme
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={exportTheme}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button variant="outline" asChild>
              <label>
                <Upload className="w-4 h-4 mr-2" />
                Import
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={importTheme}
                />
              </label>
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
