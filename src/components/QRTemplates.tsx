
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QRData } from '@/components/QRGenerator';
import { Eye, X } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode';

interface QRTemplate {
  id: string;
  name: string;
  description: string;
  data: QRData;
  preview: string;
}

interface QRTemplatesProps {
  onSelectTemplate: (template: QRData) => void;
}

export const QRTemplates: React.FC<QRTemplatesProps> = ({ onSelectTemplate }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState<string>('');

  const templates: QRTemplate[] = [
    {
      id: 'business',
      name: 'Business Card',
      description: 'Professional business contact',
      preview: '🏢',
      data: {
        type: 'text',
        content: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Tech Corp\nTEL:+1-555-0123\nEMAIL:john@techcorp.com\nURL:https://techcorp.com\nEND:VCARD',
        style: {
          foregroundColor: '#1e293b',
          backgroundColor: '#ffffff',
          shape: 'square',
          errorCorrectionLevel: 'M'
        }
      }
    },
    {
      id: 'wifi',
      name: 'WiFi Network',
      description: 'Quick WiFi connection',
      preview: '📶',
      data: {
        type: 'wifi',
        content: 'WIFI:T:WPA;S:HomeNetwork;P:SecurePassword123;;',
        style: {
          foregroundColor: '#3b82f6',
          backgroundColor: '#ffffff',
          shape: 'rounded',
          errorCorrectionLevel: 'H'
        }
      }
    },
    {
      id: 'social',
      name: 'Social Media',
      description: 'Instagram profile link',
      preview: '📱',
      data: {
        type: 'url',
        content: 'https://instagram.com/qrforge_official',
        style: {
          foregroundColor: '#e91e63',
          backgroundColor: '#ffffff',
          shape: 'rounded',
          errorCorrectionLevel: 'M'
        }
      }
    },
    {
      id: 'restaurant',
      name: 'Restaurant Menu',
      description: 'Digital menu access',
      preview: '🍽️',
      data: {
        type: 'url',
        content: 'https://restaurant-delicious.com/menu',
        style: {
          foregroundColor: '#f59e0b',
          backgroundColor: '#ffffff',
          shape: 'rounded',
          errorCorrectionLevel: 'M'
        }
      }
    },
    {
      id: 'event',
      name: 'Event Ticket',
      description: 'Event information & registration',
      preview: '🎫',
      data: {
        type: 'text',
        content: 'Event: Tech Conference 2025\nDate: March 15, 2025\nTime: 9:00 AM - 6:00 PM\nVenue: Convention Center Hall A\nTicket ID: TC2025-001\nRegister: https://techconf2025.com',
        style: {
          foregroundColor: '#8b5cf6',
          backgroundColor: '#ffffff',
          shape: 'square',
          errorCorrectionLevel: 'H'
        }
      }
    },
    {
      id: 'crypto',
      name: 'Crypto Wallet',
      description: 'Bitcoin payment address',
      preview: '₿',
      data: {
        type: 'text',
        content: 'bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        style: {
          foregroundColor: '#f97316',
          backgroundColor: '#ffffff',
          shape: 'square',
          errorCorrectionLevel: 'H'
        }
      }
    }
  ];

  const handleTemplateSelect = (template: QRData) => {
    console.log('Template selected:', template);
    onSelectTemplate(template);
    toast.success('Template applied successfully!');
  };

  const handleViewExample = async (template: QRData, templateName: string) => {
    try {
      console.log('Generating preview for:', templateName, template);
      
      const qrImageUrl = await QRCode.toDataURL(template.content, {
        color: {
          dark: template.style.foregroundColor,
          light: template.style.backgroundColor
        },
        width: 300,
        margin: 2,
        errorCorrectionLevel: template.style.errorCorrectionLevel as 'L' | 'M' | 'Q' | 'H'
      });
      
      setPreviewImage(qrImageUrl);
      setPreviewTitle(templateName);
      setIsPreviewOpen(true);
      toast.success('Template preview generated!');
    } catch (error) {
      console.error('Error generating preview:', error);
      toast.error('Failed to generate preview');
    }
  };

  return (
    <div id="templates" className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          QR Templates
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Choose from our pre-designed templates to get started quickly
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="group relative overflow-hidden border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
          >
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {template.preview}
              </div>
              <h4 className="font-semibold text-base sm:text-lg mb-2">{template.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {template.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => handleTemplateSelect(template.data)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105 text-sm"
                >
                  Use Template
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleViewExample(template.data, template.name)}
                  className="flex-1 sm:flex-none transition-all duration-300 hover:scale-105 text-sm"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsPreviewOpen(false)}>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-sm w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{previewTitle} Preview</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsPreviewOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-center mb-4">
              <img src={previewImage} alt="QR Code Preview" className="w-64 h-64 object-contain border rounded" />
            </div>
            <Button 
              onClick={() => setIsPreviewOpen(false)}
              className="w-full"
              variant="outline"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
