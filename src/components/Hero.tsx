
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, QrCode } from 'lucide-react';

export const Hero = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const scrollToTemplates = () => {
    document.getElementById('templates')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-slate-200 dark:border-slate-700">
            <QrCode className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Professional QR Code Generator
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">Free QR Code Generator</span>
            <br />
            <span className="text-slate-900 dark:text-white text-3xl md:text-4xl">
              Create Custom QR Codes in Seconds
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Welcome to Qrenzo! Generate beautiful, customizable QR codes instantly - completely free, no signup required. 
            Perfect for businesses, events, and personal use. Your creative QR code journey starts here!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToGenerator} 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Creating Free
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToTemplates}
              className="px-8 py-4 text-lg rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              View Examples
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-slate-700 dark:text-slate-300 font-medium">Free Forever</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">No hidden costs</div>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-blue-600 mb-2">∞</div>
              <div className="text-slate-700 dark:text-slate-300 font-medium">Unlimited QR Codes</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Create as many as you need</div>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-cyan-600 mb-2">0</div>
              <div className="text-slate-700 dark:text-slate-300 font-medium">No Signup Required</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Start creating instantly</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
