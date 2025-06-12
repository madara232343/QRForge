
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QRData } from '@/components/QRGenerator';

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

  return (
    <Card className="border-slate-200 dark:border-slate-700 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          QR Templates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{template.preview}</div>
                <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                  {template.description}
                </p>
                <Button
                  size="sm"
                  onClick={() => onSelectTemplate(template.data)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
