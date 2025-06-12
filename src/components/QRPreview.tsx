
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QRData } from '@/components/QRGenerator';
import QRCode from 'qrcode';

interface QRPreviewProps {
  qrData: QRData;
  onQRGenerated: (element: HTMLElement) => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ qrData, onQRGenerated }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;

      try {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const size = 300;
        canvas.width = size;
        canvas.height = size;

        // Clear canvas
        ctx.clearRect(0, 0, size, size);

        // Fill background
        ctx.fillStyle = qrData.style.backgroundColor;
        ctx.fillRect(0, 0, size, size);

        // Generate QR code
        await QRCode.toCanvas(canvas, qrData.content, {
          width: size,
          margin: 2,
          color: {
            dark: qrData.style.foregroundColor,
            light: qrData.style.backgroundColor,
          },
          errorCorrectionLevel: qrData.style.errorCorrectionLevel,
        });

        // Notify parent component
        if (containerRef.current) {
          onQRGenerated(containerRef.current);
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [qrData, onQRGenerated]);

  return (
    <Card className="border-slate-200 dark:border-slate-700 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="flex justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg"
            style={{
              borderRadius: qrData.style.shape === 'rounded' ? '12px' : '4px'
            }}
          />
        </div>
        
        <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          <p className="font-medium">Content Type: {qrData.type.charAt(0).toUpperCase() + qrData.type.slice(1)}</p>
          <p className="truncate mt-1">Content: {qrData.content}</p>
        </div>
      </CardContent>
    </Card>
  );
};
