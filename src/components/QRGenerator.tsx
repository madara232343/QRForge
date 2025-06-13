
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QRContentForm } from '@/components/QRContentForm';
import { QRStylePanel } from '@/components/QRStylePanel';
import { QRPreview } from '@/components/QRPreview';
import { QRDownload } from '@/components/QRDownload';
import { QRTemplates } from '@/components/QRTemplates';
import { AdvancedQRCustomizer } from '@/components/AdvancedQRCustomizer';
import { SmartLinkQR } from '@/components/SmartLinkQR';
import { BatchGenerator } from '@/components/BatchGenerator';
import { QRGallery } from '@/components/QRGallery';
import { QRChatbot } from '@/components/QRChatbot';

export interface QRData {
  type: 'url' | 'text' | 'email' | 'phone' | 'wifi';
  content: string;
  style: {
    foregroundColor: string;
    backgroundColor: string;
    shape: 'square' | 'rounded' | 'dots';
    logo?: string;
    logoSize?: number;
    customBackground?: string;
    gradientColors?: [string, string];
    useGradient?: boolean;
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  };
  smartLink?: {
    originalUrl: string;
    shortCode: string;
    tracking: boolean;
    expiry: Date | null;
    password: string | null;
    clicks: number;
    created: Date;
  };
}

export const QRGenerator = () => {
  const [qrData, setQRData] = useState<QRData>({
    type: 'url',
    content: 'https://github.com/lovable-dev',
    style: {
      foregroundColor: '#1e293b',
      backgroundColor: '#ffffff',
      shape: 'square',
      logoSize: 20,
      useGradient: false,
      errorCorrectionLevel: 'M'
    }
  });

  const [qrElement, setQRElement] = useState<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState('content');

  // Save to localStorage
  useEffect(() => {
    const savedQRHistory = localStorage.getItem('qrenzo-history');
    const history = savedQRHistory ? JSON.parse(savedQRHistory) : [];
    history.unshift({ ...qrData, timestamp: Date.now() });
    localStorage.setItem('qrenzo-history', JSON.stringify(history.slice(0, 10)));
  }, [qrData]);

  const handleTemplateSelect = (templateData: QRData) => {
    console.log('Applying template:', templateData);
    setQRData(templateData);
    setActiveTab('content');
  };

  const handleChatbotQR = (chatbotQRData: QRData) => {
    setQRData(chatbotQRData);
    setActiveTab('content');
  };

  return (
    <>
      {/* Generator Section */}
      <section id="generator" className="py-12 lg:py-20 bg-white/50 dark:bg-slate-900/50 transition-all duration-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                FREE QR Code Generator
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Create unlimited, professional QR codes with advanced customization. 100% free forever!
            </p>
            <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mt-6">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                ✓ Unlimited Usage
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                ✓ All Formats
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                ✓ Advanced Customization
              </span>
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium">
                ✓ Smart Links & Analytics
              </span>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Panel - Configuration */}
              <div className="space-y-6">
                <Card className="border-slate-200 dark:border-slate-700 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
                  <CardContent className="p-4 lg:p-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-6 mb-6">
                        <TabsTrigger value="content" className="text-xs lg:text-sm">Content</TabsTrigger>
                        <TabsTrigger value="style" className="text-xs lg:text-sm">Style</TabsTrigger>
                        <TabsTrigger value="advanced" className="text-xs lg:text-sm">Advanced</TabsTrigger>
                        <TabsTrigger value="smart" className="text-xs lg:text-sm">Smart</TabsTrigger>
                        <TabsTrigger value="batch" className="text-xs lg:text-sm">Batch</TabsTrigger>
                        <TabsTrigger value="ai" className="text-xs lg:text-sm">AI Chat</TabsTrigger>
                      </TabsList>
                      <TabsContent value="content" className="animate-fade-in">
                        <QRContentForm qrData={qrData} setQRData={setQRData} />
                      </TabsContent>
                      <TabsContent value="style" className="animate-fade-in">
                        <QRStylePanel qrData={qrData} setQRData={setQRData} />
                      </TabsContent>
                      <TabsContent value="advanced" className="animate-fade-in">
                        <AdvancedQRCustomizer qrData={qrData} setQRData={setQRData} />
                      </TabsContent>
                      <TabsContent value="smart" className="animate-fade-in">
                        <SmartLinkQR qrData={qrData} setQRData={setQRData} />
                      </TabsContent>
                      <TabsContent value="batch" className="animate-fade-in">
                        <BatchGenerator />
                      </TabsContent>
                      <TabsContent value="ai" className="animate-fade-in">
                        <QRChatbot onQRGenerated={handleChatbotQR} />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <QRDownload qrElement={qrElement} qrData={qrData} />
              </div>

              {/* Right Panel - Preview */}
              <div className="xl:sticky xl:top-24">
                <QRPreview qrData={qrData} onQRGenerated={setQRElement} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 transition-all duration-500">
        <div className="container mx-auto px-4">
          <QRTemplates onSelectTemplate={handleTemplateSelect} />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 transition-all duration-500">
        <div className="container mx-auto px-4">
          <QRGallery onSelectFromGallery={handleTemplateSelect} />
        </div>
      </section>
    </>
  );
};
