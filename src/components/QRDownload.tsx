
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileImage, FileType, FileText, Package } from 'lucide-react';
import { QRData } from '@/components/QRGenerator';
import { toast } from 'sonner';

interface QRDownloadProps {
  qrElement: HTMLElement | null;
  qrData: QRData;
}

export const QRDownload: React.FC<QRDownloadProps> = ({ qrElement, qrData }) => {
  const downloadQR = async (format: 'png' | 'svg' | 'pdf' | 'jpg' | 'webp' | 'zip') => {
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
      const timestamp = Date.now();
      const filename = `qrforge-${qrData.type}-${timestamp}`;

      if (format === 'png') {
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        toast.success('PNG downloaded successfully!');
      } 
      else if (format === 'jpg') {
        const link = document.createElement('a');
        link.download = `${filename}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
        toast.success('JPG downloaded successfully!');
      }
      else if (format === 'webp') {
        const link = document.createElement('a');
        link.download = `${filename}.webp`;
        link.href = canvas.toDataURL('image/webp', 0.9);
        link.click();
        toast.success('WebP downloaded successfully!');
      }
      else if (format === 'svg') {
        const svgData = canvas.toDataURL('image/png');
        const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
            <image href="${svgData}" width="300" height="300"/>
          </svg>
        `;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${filename}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        toast.success('SVG downloaded successfully!');
      } 
      else if (format === 'pdf') {
        // Create a simple PDF using canvas data
        const imgData = canvas.toDataURL('image/png');
        const pdf = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 300 300]
/Contents 4 0 R
/Resources <<
  /XObject <<
    /Im1 5 0 R
  >>
>>
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
q
300 0 0 300 0 0 cm
/Im1 Do
Q
endstream
endobj

5 0 obj
<<
/Type /XObject
/Subtype /Image
/Width 300
/Height 300
/ColorSpace /DeviceRGB
/BitsPerComponent 8
/Length ${imgData.length}
/Filter /ASCIIHexDecode
>>
stream
${imgData.replace('data:image/png;base64,', '')}
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000292 00000 n 
0000000385 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
${600 + imgData.length}
%%EOF`;
        
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${filename}.pdf`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        toast.success('PDF downloaded successfully!');
      }
      else if (format === 'zip') {
        // Create a ZIP with multiple formats
        const { default: JSZip } = await import('jszip');
        const zip = new JSZip();
        
        // Add PNG
        const pngData = canvas.toDataURL('image/png').split(',')[1];
        zip.file(`${filename}.png`, pngData, { base64: true });
        
        // Add JPG
        const jpgData = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
        zip.file(`${filename}.jpg`, jpgData, { base64: true });
        
        // Add SVG
        const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
          <image href="data:image/png;base64,${pngData}" width="300" height="300"/>
        </svg>`;
        zip.file(`${filename}.svg`, svgData);
        
        // Add config file
        const config = JSON.stringify(qrData, null, 2);
        zip.file(`${filename}-config.json`, config);
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        const link = document.createElement('a');
        link.download = `${filename}.zip`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        toast.success('ZIP package downloaded successfully!');
      }
    } catch (error) {
      toast.error('Download failed. Please try again.');
      console.error('Download error:', error);
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-700 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="h-5 w-5 text-purple-600" />
          <span>Download Options</span>
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
            FREE UNLIMITED
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => downloadQR('png')}
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-800 transition-all duration-300 hover:scale-105"
          >
            <FileImage className="h-4 w-4" />
            <span>PNG</span>
          </Button>
          
          <Button
            onClick={() => downloadQR('jpg')}
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-800 transition-all duration-300 hover:scale-105"
          >
            <FileImage className="h-4 w-4" />
            <span>JPG</span>
          </Button>
          
          <Button
            onClick={() => downloadQR('svg')}
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-green-50 dark:hover:bg-green-900/20 border-green-200 dark:border-green-800 transition-all duration-300 hover:scale-105"
          >
            <FileType className="h-4 w-4" />
            <span>SVG</span>
          </Button>
          
          <Button
            onClick={() => downloadQR('webp')}
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 transition-all duration-300 hover:scale-105"
          >
            <FileImage className="h-4 w-4" />
            <span>WebP</span>
          </Button>
          
          <Button
            onClick={() => downloadQR('pdf')}
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800 transition-all duration-300 hover:scale-105"
          >
            <FileText className="h-4 w-4" />
            <span>PDF</span>
          </Button>
          
          <Button
            onClick={() => downloadQR('zip')}
            variant="outline"
            className="w-full justify-start space-x-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 border-amber-200 dark:border-amber-800 transition-all duration-300 hover:scale-105"
          >
            <Package className="h-4 w-4" />
            <span>ZIP Pack</span>
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
            ✓ High-quality downloads • ✓ Commercial use allowed • ✓ No watermarks • ✓ Unlimited downloads
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
