
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

        const size = 300;
        canvas.width = size;
        canvas.height = size;

        // Clear canvas
        ctx.clearRect(0, 0, size, size);

        // Draw custom background if exists
        if (qrData.style.customBackground) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, size, size);
            generateQRCode();
          };
          img.src = qrData.style.customBackground;
        } else {
          // Fill background with solid color or gradient
          if (qrData.style.useGradient && qrData.style.gradientColors) {
            const gradient = ctx.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, qrData.style.gradientColors[0]);
            gradient.addColorStop(1, qrData.style.gradientColors[1]);
            ctx.fillStyle = gradient;
          } else {
            ctx.fillStyle = qrData.style.backgroundColor;
          }
          ctx.fillRect(0, 0, size, size);
          generateQRCode();
        }

        async function generateQRCode() {
          // Generate QR code
          const foregroundColor = qrData.style.useGradient ? '#000000' : qrData.style.foregroundColor;
          const backgroundColor = qrData.style.customBackground ? 'transparent' : qrData.style.backgroundColor;

          await QRCode.toCanvas(canvas, qrData.content, {
            width: size,
            margin: 2,
            color: {
              dark: foregroundColor,
              light: backgroundColor,
            },
            errorCorrectionLevel: qrData.style.errorCorrectionLevel,
          });

          // Apply gradient overlay if enabled
          if (qrData.style.useGradient && qrData.style.gradientColors) {
            const imageData = ctx.getImageData(0, 0, size, size);
            const data = imageData.data;
            
            const gradient = ctx.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, qrData.style.gradientColors[0]);
            gradient.addColorStop(1, qrData.style.gradientColors[1]);
            
            // Create temporary canvas for gradient
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = size;
            tempCanvas.height = size;
            const tempCtx = tempCanvas.getContext('2d')!;
            tempCtx.fillStyle = gradient;
            tempCtx.fillRect(0, 0, size, size);
            const gradientData = tempCtx.getImageData(0, 0, size, size).data;

            // Apply gradient to dark pixels
            for (let i = 0; i < data.length; i += 4) {
              if (data[i] < 128) { // Dark pixel
                data[i] = gradientData[i];     // R
                data[i + 1] = gradientData[i + 1]; // G
                data[i + 2] = gradientData[i + 2]; // B
              }
            }
            
            ctx.putImageData(imageData, 0, 0);
          }

          // Add logo if exists
          if (qrData.style.logo) {
            const logoImg = new Image();
            logoImg.onload = () => {
              const logoSize = (size * (qrData.style.logoSize || 20)) / 100;
              const logoX = (size - logoSize) / 2;
              const logoY = (size - logoSize) / 2;
              
              // Draw white background for logo
              ctx.fillStyle = 'white';
              ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
              
              // Draw logo
              ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
              
              // Notify parent component
              if (containerRef.current) {
                onQRGenerated(containerRef.current);
              }
            };
            logoImg.src = qrData.style.logo;
          } else {
            // Notify parent component
            if (containerRef.current) {
              onQRGenerated(containerRef.current);
            }
          }
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [qrData, onQRGenerated]);

  return (
    <Card className="border-slate-200 dark:border-slate-700 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
      <CardHeader>
        <CardTitle className="text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="flex justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-lg transition-all duration-300">
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            style={{
              borderRadius: qrData.style.shape === 'rounded' ? '12px' : '4px'
            }}
          />
        </div>
        
        <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          <p className="font-medium">Content Type: {qrData.type.charAt(0).toUpperCase() + qrData.type.slice(1)}</p>
          <p className="truncate mt-1">Content: {qrData.content}</p>
          <p className="text-xs mt-2 text-green-600 dark:text-green-400">✓ Ready to download in all formats</p>
        </div>
      </CardContent>
    </Card>
  );
};
