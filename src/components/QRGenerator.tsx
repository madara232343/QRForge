
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QRContentForm } from '@/components/QRContentForm';
import { QRStylePanel } from '@/components/QRStylePanel';
import { QRPreview } from '@/components/QRPreview';
import { QRDownload } from '@/components/QRDownload';

export interface QRData {
  type: 'url' | 'text' | 'email' | 'phone' | 'wifi';
  content: string;
  style: {
    foregroundColor: string;
    backgroundColor: string;
    shape: 'square' | 'rounded' | 'dots';
    logo?: string;
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  };
}

export const QRGenerator = () => {
  const [qrData, setQRData] = useState<QRData>({
    type: 'url',
    content: 'https://example.com',
    style: {
      foregroundColor: '#1e293b',
      backgroundColor: '#ffffff',
      shape: 'square',
      errorCorrectionLevel: 'M'
    }
  });

  const [qrElement, setQRElement] = useState<HTMLElement | null>(null);

  return (
    <section id="generator" className="py-20 bg-white/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              QR Code Generator
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Create your custom QR code with our powerful generator. Choose your content, customize the design, and download in multiple formats.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Configuration */}
            <div className="space-y-6">
              <Card className="border-slate-200 dark:border-slate-700 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
                <CardContent className="p-6">
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="content" className="text-sm">Content</TabsTrigger>
                      <TabsTrigger value="style" className="text-sm">Style</TabsTrigger>
                    </TabsList>
                    <TabsContent value="content">
                      <QRContentForm qrData={qrData} setQRData={setQRData} />
                    </TabsContent>
                    <TabsContent value="style">
                      <QRStylePanel qrData={qrData} setQRData={setQRData} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <QRDownload qrElement={qrElement} qrData={qrData} />
            </div>

            {/* Right Panel - Preview */}
            <div className="lg:sticky lg:top-24">
              <QRPreview qrData={qrData} onQRGenerated={setQRElement} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
