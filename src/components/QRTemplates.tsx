
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QRData } from '@/components/QRGenerator';
import { Eye } from 'lucide-react';
import { toast } from 'sonner';

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
  const templates: QRTemplate[] = [
    {
      id: 'business',
      name: 'Business Card',
      description: 'Professional business contact',
      preview: '🏢',
      data: {
        type: 'text',
        content: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Company Inc\nTEL:+1234567890\nEMAIL:john@company.com\nEND:VCARD',
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
      name: 'WiFi Access',
      description: 'Quick WiFi connection',
      preview: '📶',
      data: {
        type: 'wifi',
        content: 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;',
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
        content: 'https://instagram.com/yourprofile',
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
        content: 'https://yourmenu.com',
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
      description: 'Event information',
      preview: '🎫',
      data: {
        type: 'text',
        content: 'Event: Conference 2024\nDate: Dec 15, 2024\nVenue: Convention Center',
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
      description: 'Bitcoin address',
      preview: '₿',
      data: {
        type: 'text',
        content: 'bitcoin:1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
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

  const handleViewExample = (template: QRData) => {
    // Create a temporary QR code preview for the template
    console.log('Viewing example for:', template);
    toast.info('Template preview loaded');
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
                  onClick={() => handleViewExample(template.data)}
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
    </div>
  );
};
