
import React from 'react';
import { QrCode, Heart } from 'lucide-react';

export const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                QRForge
              </span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Create beautiful, professional QR codes in seconds. Perfect for businesses, events, and personal use. 100% free, unlimited usage.
            </p>
            <div className="flex items-center space-x-1 text-sm text-slate-500 mb-2">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by Raval Dhwanil</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2025 QRForge. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <button 
                  onClick={() => scrollToSection('generator')} 
                  className="hover:text-white transition-colors duration-300 text-left"
                >
                  Generator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="hover:text-white transition-colors duration-300 text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('templates')} 
                  className="hover:text-white transition-colors duration-300 text-left"
                >
                  Templates
                </button>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">Free Forever</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="hover:text-white transition-colors duration-300 text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <a 
                  href="mailto:contact@qrforge.com" 
                  className="hover:text-white transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('generator')} 
                  className="hover:text-white transition-colors duration-300 text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('generator')} 
                  className="hover:text-white transition-colors duration-300 text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400">
              QRForge - Professional QR Code Generator
            </p>
            <div className="flex items-center space-x-1 text-slate-400">
              <span>Powered by innovation & creativity</span>
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
