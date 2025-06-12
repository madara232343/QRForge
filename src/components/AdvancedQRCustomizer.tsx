
import React, { useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { QRData } from '@/components/QRGenerator';
import { Upload, Trash, Image } from 'lucide-react';
import { toast } from 'sonner';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

interface AdvancedQRCustomizerProps {
  qrData: QRData;
  setQRData: (data: QRData) => void;
}

export const AdvancedQRCustomizer: React.FC<AdvancedQRCustomizerProps> = ({ qrData, setQRData }) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const updateStyle = (styleUpdate: Partial<QRData['style']>) => {
    setQRData({
      ...qrData,
      style: { ...qrData.style, ...styleUpdate }
    });
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateStyle({ logo: e.target?.result as string });
        toast.success('Logo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to upload logo');
    }
  };

  const handleBackgroundUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateStyle({ customBackground: e.target?.result as string });
        toast.success('Background uploaded successfully!');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to upload background');
    }
  };

  const handleRemoveBackground = async () => {
    if (!qrData.style.logo) {
      toast.error('Please upload a logo first');
      return;
    }

    try {
      toast.info('Removing background... This may take a moment.');
      
      // Convert base64 to blob
      const response = await fetch(qrData.style.logo);
      const blob = await response.blob();
      
      // Load as image
      const imageElement = await loadImage(blob);
      
      // Remove background
      const processedBlob = await removeBackground(imageElement);
      
      // Convert back to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        updateStyle({ logo: e.target?.result as string });
        toast.success('Background removed successfully!');
      };
      reader.readAsDataURL(processedBlob);
    } catch (error) {
      console.error('Background removal error:', error);
      toast.error('Failed to remove background. Please try again.');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Logo Upload Section */}
      <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900">
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Logo Customization
        </Label>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => logoInputRef.current?.click()}
            className="flex items-center justify-center space-x-2 text-sm"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Logo</span>
          </Button>
          
          {qrData.style.logo && (
            <>
              <Button
                variant="outline"
                onClick={handleRemoveBackground}
                className="flex items-center justify-center space-x-2 text-blue-600 text-sm"
              >
                <Image className="h-4 w-4" />
                <span className="hidden sm:inline">Remove BG</span>
                <span className="sm:hidden">Remove</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => updateStyle({ logo: undefined })}
                className="flex items-center justify-center space-x-2 text-red-600 text-sm"
              >
                <Trash className="h-4 w-4" />
                <span>Remove</span>
              </Button>
            </>
          )}
        </div>
        
        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
        
        {qrData.style.logo && (
          <div className="space-y-3">
            <div className="flex justify-center">
              <img
                src={qrData.style.logo}
                alt="Logo preview"
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain border border-slate-300 dark:border-slate-600 rounded"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-slate-600 dark:text-slate-400">
                Logo Size: {qrData.style.logoSize || 20}%
              </Label>
              <Input
                type="range"
                min="10"
                max="40"
                value={qrData.style.logoSize || 20}
                onChange={(e) => updateStyle({ logoSize: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Custom Background Section */}
      <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900">
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Background Customization
        </Label>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => backgroundInputRef.current?.click()}
            className="flex items-center justify-center space-x-2 text-sm"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Background</span>
          </Button>
          
          {qrData.style.customBackground && (
            <Button
              variant="outline"
              onClick={() => updateStyle({ customBackground: undefined })}
              className="flex items-center justify-center space-x-2 text-red-600 text-sm"
            >
              <Trash className="h-4 w-4" />
              <span>Remove</span>
            </Button>
          )}
        </div>
        
        <input
          ref={backgroundInputRef}
          type="file"
          accept="image/*"
          onChange={handleBackgroundUpload}
          className="hidden"
        />
        
        {qrData.style.customBackground && (
          <img
            src={qrData.style.customBackground}
            alt="Background preview"
            className="w-full h-16 sm:h-20 object-cover border border-slate-300 dark:border-slate-600 rounded"
          />
        )}
      </div>

      {/* Gradient Options */}
      <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Gradient Colors
          </Label>
          <Switch
            checked={qrData.style.useGradient || false}
            onCheckedChange={(checked) => updateStyle({ useGradient: checked })}
          />
        </div>
        
        {qrData.style.useGradient && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label className="text-xs text-slate-600 dark:text-slate-400">Start Color</Label>
              <input
                type="color"
                value={qrData.style.gradientColors?.[0] || '#8b5cf6'}
                onChange={(e) => updateStyle({ 
                  gradientColors: [e.target.value, qrData.style.gradientColors?.[1] || '#3b82f6'] 
                })}
                className="w-full h-8 sm:h-10 rounded border border-slate-300 dark:border-slate-600"
              />
            </div>
            <div>
              <Label className="text-xs text-slate-600 dark:text-slate-400">End Color</Label>
              <input
                type="color"
                value={qrData.style.gradientColors?.[1] || '#3b82f6'}
                onChange={(e) => updateStyle({ 
                  gradientColors: [qrData.style.gradientColors?.[0] || '#8b5cf6', e.target.value] 
                })}
                className="w-full h-8 sm:h-10 rounded border border-slate-300 dark:border-slate-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
