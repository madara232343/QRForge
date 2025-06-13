import React from 'react';
import { Heart } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  };
  return <footer className="bg-slate-900 text-white py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <img src="/lovable-uploads/15aab39f-9991-466f-9572-cb7cab456db4.png" alt="QRForge Logo" className="h-8 w-8 text-white object-contain" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Qrenzo</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Create beautiful, professional QR codes in seconds. Perfect for businesses, events, and personal use. 100% free, unlimited usage.
            </p>
            <div className="flex items-center space-x-1 text-sm text-slate-500 mb-2">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by mr robot</span>
            </div>
            <p className="text-sm text-slate-500">© 2025 Qrenzo. All rights reserved.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <button onClick={() => scrollToSection('generator')} className="hover:text-white transition-colors duration-300 text-left">
                  Generator
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors duration-300 text-left">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('templates')} className="hover:text-white transition-colors duration-300 text-left">
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
                <Link to="/faq" className="hover:text-white transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400">Qrenzo- Professional QR Code Generator</p>
            <div className="flex items-center space-x-1 text-slate-400">
              <span>Powered by innovation & creativity</span>
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>;
};