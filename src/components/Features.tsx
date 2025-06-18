
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Download, Upload, Image, Shield, Zap, Palette, Globe } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: QrCode,
      title: 'Multiple Content Types',
      description: 'Create QR codes for URLs, text, emails, phone numbers, WiFi credentials, and more.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Palette,
      title: 'Custom Styling',
      description: 'Personalize your QR codes with custom colors, shapes, gradients, and logo overlays.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Download,
      title: 'Multiple Formats',
      description: 'Download your QR codes in PNG, SVG, or PDF formats for any use case.',
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: Upload,
      title: 'Logo Integration',
      description: 'Add your brand logo to QR codes while maintaining perfect scannability.',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Generate professional QR codes in seconds with our lightning-fast tool.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Privacy Focused',
      description: 'No registration, no data collection. Your privacy is our priority.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Smart Links',
      description: 'Create trackable smart links with analytics and password protection.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Image,
      title: 'Batch Processing',
      description: 'Generate multiple QR codes at once to save time and increase productivity.',
      gradient: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50/50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Why Choose Qrenzo?
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Everything you need to create professional QR codes that represent your brand perfectly. 
            Fast, easy, and completely free forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md hover:scale-105"
            >
              <CardHeader className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              How It Works
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
              <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Enter Content</h4>
              <p className="text-slate-600 dark:text-slate-400">Add your URL, text, or other content you want to encode</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
              <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Customize Style</h4>
              <p className="text-slate-600 dark:text-slate-400">Choose colors, add your logo, and make it uniquely yours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
              <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Download & Use</h4>
              <p className="text-slate-600 dark:text-slate-400">Download in your preferred format and start using immediately</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Free</div>
            </div>
            <div className="h-12 w-px bg-slate-300 dark:bg-slate-600"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">∞</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Unlimited</div>
            </div>
            <div className="h-12 w-px bg-slate-300 dark:bg-slate-600"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600 mb-1">24/7</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
