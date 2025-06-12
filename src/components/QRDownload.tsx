
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { QRData } from '@/components/QRGenerator';
import { toast } from 'sonner';

interface QRDownloadProps {
  qrElement: HTMLElement | null;
  qrData: QRData;
}

export const QRDownload: React.FC<QRDownloadProps> = ({ qrElement, qrData }) => {
  const downloadQR = (format: 'png' | 'svg' | 'pdf') => {
    if (!qrElement) {
      toast.error('Please generate a QR code first');
      return;
    }

    const canvas = qrElement.querySelector('canvas');
    if (!canvas) {
      toast.error('QR code not found');
      return;
    }

    try {
      if (format === 'png') {
        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        toast.success('PNG downloaded successfully!');
      } else if (format === 'svg') {
        // For SVG, we'll convert the canvas to SVG
        const svgData = canvas.toDataURL('image/png');
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
            <image href="${svgData}" width="300" height="300"/>
          </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        toast.success('SVG downloaded successfully!');
      } else if (format === 'pdf') {
        // For PDF, we'll create a simple PDF with the image
        const imgData = canvas.toDataURL('image/png');
        // This is a simplified PDF creation - in a real app you'd use jsPDF
        toast.info('PDF download coming soon!');
      }
    } catch (error) {
      toast.error('Download failed. Please try again.');
      console.error('Download error:', error);
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-700 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="h-5 w-5 text-purple-600" />
          <span>Download Options</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          <Button
            onClick={() => downloadQR('png')}
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-800"
          >
            <Download className="h-4 w-4" />
            <span>Download PNG</span>
          </Button>
          
          <Button
            onClick={() => downloadQR('svg')}
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-800"
          >
            <Download className="h-4 w-4" />
            <span>Download SVG</span>
          </Button>
          
          <Button
            onClick={() => downloadQR('pdf')}
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
            High-quality downloads • Commercial use allowed
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
