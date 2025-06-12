
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QRData } from '@/components/QRGenerator';

interface QRStylePanelProps {
  qrData: QRData;
  setQRData: (data: QRData) => void;
}

export const QRStylePanel: React.FC<QRStylePanelProps> = ({ qrData, setQRData }) => {
  const updateStyle = (styleUpdate: Partial<QRData['style']>) => {
    setQRData({
      ...qrData,
      style: { ...qrData.style, ...styleUpdate }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="foreground" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Foreground Color
          </Label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              id="foreground"
              value={qrData.style.foregroundColor}
              onChange={(e) => updateStyle({ foregroundColor: e.target.value })}
              className="w-12 h-10 rounded border border-slate-300 dark:border-slate-600"
            />
            <input
              type="text"
              value={qrData.style.foregroundColor}
              onChange={(e) => updateStyle({ foregroundColor: e.target.value })}
              className="flex-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="background" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
            Background Color
          </Label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              id="background"
              value={qrData.style.backgroundColor}
              onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
              className="w-12 h-10 rounded border border-slate-300 dark:border-slate-600"
            />
            <input
              type="text"
              value={qrData.style.backgroundColor}
              onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
              className="flex-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="shape" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
          Shape Style
        </Label>
        <Select value={qrData.style.shape} onValueChange={(shape: 'square' | 'rounded' | 'dots') => updateStyle({ shape })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="rounded">Rounded</SelectItem>
            <SelectItem value="dots">Dots</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="errorCorrection" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
          Error Correction Level
        </Label>
        <Select 
          value={qrData.style.errorCorrectionLevel} 
          onValueChange={(level: 'L' | 'M' | 'Q' | 'H') => updateStyle({ errorCorrectionLevel: level })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">Low (7%)</SelectItem>
            <SelectItem value="M">Medium (15%)</SelectItem>
            <SelectItem value="Q">Quartile (25%)</SelectItem>
            <SelectItem value="H">High (30%)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
