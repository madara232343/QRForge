
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Download } from 'lucide-react';

export const Hero = () => {
  const scrollToGenerator = () => {
    const generator = document.getElementById('qr-generator');
    generator?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 px-4 text-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-6xl mx-auto">
        {/* Main Hero Content */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            Free QR Code Generator Online
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto font-medium">
            Create Custom QR Codes Instantly - No Signup Required
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Generate professional QR codes for free with Qrenzo, the #1 online QR code generator. 
            Create QR codes for URLs, WiFi, business cards, and more with unlimited downloads and custom designs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToGenerator}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Create QR Code Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToGenerator}
              className="border-2 border-purple-200 hover:border-purple-300 px-8 py-4 text-lg font-semibold"
            >
              View Examples
            </Button>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100 hover:border-purple-200 transition-colors">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Instant Generation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create QR codes in seconds - no waiting, no processing delays
            </p>
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100 hover:border-purple-200 transition-colors">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              100% Free Forever
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No hidden costs, no premium plans - completely free QR code generator
            </p>
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100 hover:border-purple-200 transition-colors">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Download className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              High-Quality Downloads
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Download in PNG, SVG formats with customizable sizes and colors
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Trusted by thousands of users worldwide
          </p>
          <div className="flex justify-center items-center gap-8 text-gray-400">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1M+</div>
              <div className="text-xs">QR Codes Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-xs">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">4.9★</div>
              <div className="text-xs">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
