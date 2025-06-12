
import React from 'react';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              QRForge
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('generator')}
              className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-105 story-link"
            >
              Generator
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-105 story-link"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('templates')}
              className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:scale-105 story-link"
            >
              Templates
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button 
              onClick={() => scrollToSection('generator')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
