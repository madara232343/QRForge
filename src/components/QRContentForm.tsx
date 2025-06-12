
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QRData } from '@/components/QRGenerator';

interface QRContentFormProps {
  qrData: QRData;
  setQRData: (data: QRData) => void;
}

export const QRContentForm: React.FC<QRContentFormProps> = ({ qrData, setQRData }) => {
  const updateContent = (content: string) => {
    setQRData({ ...qrData, content });
  };

  const updateType = (type: QRData['type']) => {
    let defaultContent = '';
    switch (type) {
      case 'url':
        defaultContent = 'https://example.com';
        break;
      case 'email':
        defaultContent = 'hello@example.com';
        break;
      case 'phone':
        defaultContent = '+1234567890';
        break;
      case 'wifi':
        defaultContent = 'WIFI:T:WPA;S:NetworkName;P:Password;;';
        break;
      default:
        defaultContent = 'Hello World';
    }
    setQRData({ ...qrData, type, content: defaultContent });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="type" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
          Content Type
        </Label>
        <Select value={qrData.type} onValueChange={updateType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="url">Website URL</SelectItem>
            <SelectItem value="text">Plain Text</SelectItem>
            <SelectItem value="email">Email Address</SelectItem>
            <SelectItem value="phone">Phone Number</SelectItem>
            <SelectItem value="wifi">WiFi Network</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="content" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
          Content
        </Label>
        {qrData.type === 'text' ? (
          <Textarea
            id="content"
            value={qrData.content}
            onChange={(e) => updateContent(e.target.value)}
            placeholder="Enter your text content..."
            rows={4}
            className="resize-none"
          />
        ) : (
          <Input
            id="content"
            value={qrData.content}
            onChange={(e) => updateContent(e.target.value)}
            placeholder={`Enter your ${qrData.type} content...`}
          />
        )}
        
        {qrData.type === 'wifi' && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Format: WIFI:T:WPA;S:NetworkName;P:Password;;
          </p>
        )}
      </div>
    </div>
  );
};
