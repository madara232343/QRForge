
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
  gradient?: boolean;
  pattern?: string;
}

interface QRTemplatesProps {
  onSelectTemplate: (template: QRData) => void;
}

export const QRTemplates: React.FC<QRTemplatesProps> = ({ onSelectTemplate }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<QRTemplate | null>(null);
  const [previewContent, setPreviewContent] = useState<string>('');

  const templates: QRTemplate[] = [
    {
      id: 'modern-blue',
      name: 'Modern Blue',
      description: 'Clean blue gradient design',
      preview: '🔷',
      gradient: true,
      data: {
        type: 'url',
        content: 'https://example.com/modern-design',
        style: {
          foregroundColor: '#1e40af',
          backgroundColor: '#ffffff',
          shape: 'rounded',
          useGradient: true,
          gradientColors: ['#3b82f6', '#1e40af'],
          errorCorrectionLevel: 'M'
        }
      }
    },
    {
      id: 'elegant-purple',
      name: 'Elegant Purple',
      description: 'Sophisticated purple theme',
      preview: '🟣',
      gradient: true,
      data: {
        type: 'text',
        content: 'BEGIN:VCARD\nVERSION:3.0\nFN:Business Contact\nORG:Purple Corp\nTEL:+1-555-0199\nEMAIL:contact@purple.com\nEND:VCARD',
        style: {
          foregroundColor: '#7c3aed',
          backgroundColor: '#faf5ff',
          shape: 'rounded',
          useGradient: true,
          gradientColors: ['#8b5cf6', '#7c3aed'],
          errorCorrectionLevel: 'H'
        }
      }
    },
    {
      id: 'nature-green',
      name: 'Nature Green',
      description: 'Eco-friendly green design',
      preview: '🌿',
      data: {
        type: 'wifi',
        content: 'WIFI:T:WPA;S:EcoNetwork;P:GreenPass2024;;',
        style: {
          foregroundColor: '#059669',
          backgroundColor: '#f0fdf4',
          shape: 'dots',
          errorCorrectionLevel: 'H'
        }
      }
    },
    {
      id: 'sunset-orange',
      name: 'Sunset Orange',
      description: 'Warm sunset colors',
      preview: '🌅',
      gradient: true,
      data: {
        type: 'url',
        content: 'https://sunset-cafe.com/menu',
        style: {
          foregroundColor: '#ea580c',
          backgroundColor: '#fff7ed',
          shape: 'rounded',
          useGradient: true,
          gradientColors: ['#f97316', '#ea580c'],
          errorCorrectionLevel: 'M'
        }
      }
    },
    {
      id: 'tech-cyan',
      name: 'Tech Cyan',
      description: 'Futuristic cyan style',
      preview: '⚡',
      gradient: true,
      data: {
        type: 'text',
        content: 'Tech Conference 2025\nLocation: Silicon Valley\nDate: June 15-17\nTicket: TC2025-VIP\nWebsite: https://techconf2025.com',
        style: {
          foregroundColor: '#0891b2',
          backgroundColor: '#cffafe',
          shape: 'square',
          useGradient: true,
          gradientColors: ['#06b6d4', '#0891b2'],
          errorCorrectionLevel: 'H'
        }
      }
    },
    {
      id: 'royal-gold',
      name: 'Royal Gold',
      description: 'Luxurious gold theme',
      preview: '👑',
      data: {
        type: 'email',
        content: 'mailto:vip@royalhotel.com?subject=VIP Reservation&body=Hello, I would like to make a VIP reservation.',
        style: {
          foregroundColor: '#b45309',
          backgroundColor: '#fefce8',
          shape: 'rounded',
          errorCorrectionLevel: 'M'
        }
      }
    },
    {
      id: 'midnight-dark',
      name: 'Midnight Dark',
      description: 'Dark theme with white QR',
      preview: '🌙',
      data: {
        type: 'phone',
        content: 'tel:+1-555-NIGHT',
        style: {
          foregroundColor: '#ffffff',
          backgroundColor: '#0f172a',
          shape: 'square',
          errorCorrectionLevel: 'L'
        }
      }
    },
    {
      id: 'valentine-pink',
      name: 'Valentine Pink',
      description: 'Romantic pink design',
      preview: '💖',
      gradient: true,
      data: {
        type: 'url',
        content: 'https://valentine-special.com/romantic-dinner',
        style: {
          foregroundColor: '#ec4899',
          backgroundColor: '#fdf2f8',
          shape: 'rounded',
          useGradient: true,
          gradientColors: ['#f472b6', '#ec4899'],
          errorCorrectionLevel: 'M'
        }
      }
    }
  ];

  const handleTemplateSelect = (template: QRData) => {
    console.log('Template selected:', template);
    onSelectTemplate(template);
    toast.success('Template applied successfully!', {
      description: 'Your QR code has been updated with the new design.',
      duration: 3000,
    });
  };

  const handleViewExample = async (template: QRTemplate) => {
    try {
      console.log('Generating preview for template:', template.name);
      
      const options: any = {
        color: {
          dark: template.data.style.foregroundColor,
          light: template.data.style.backgroundColor
        },
        width: 400,
        margin: 2,
        errorCorrectionLevel: template.data.style.errorCorrectionLevel
      };

      const qrImageUrl = await QRCode.toDataURL(template.data.content, options);
      
      setPreviewImage(qrImageUrl);
      setCurrentTemplate(template);
      setPreviewContent(template.data.content);
      setIsPreviewOpen(true);
      toast.success('Preview generated!', {
        description: `Showing ${template.name} template example`,
      });
    } catch (error) {
      console.error('Error generating preview:', error);
      toast.error('Failed to generate preview', {
        description: 'Please try again later.',
      });
    }
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewImage(null);
    setCurrentTemplate(null);
    setPreviewContent('');
  };

  return (
    <div id="templates" className="space-y-6">
      <div className="text-center animate-fade-in">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          QR Templates Gallery
        </h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Choose from our professionally designed templates with unique styles and colors
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {templates.map((template, index) => (
          <Card
            key={template.id}
            className="group relative overflow-hidden border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in hover:rotate-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-125 transition-transform duration-500 group-hover:rotate-12">
                {template.preview}
              </div>
              <h4 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-purple-600 transition-colors duration-300">
                {template.name}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                {template.description}
              </p>
              
              {/* Style indicator */}
              <div className="flex justify-center mb-4">
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    backgroundColor: template.data.style.foregroundColor,
                    background: template.gradient 
                      ? `linear-gradient(45deg, ${template.data.style.gradientColors?.[0]}, ${template.data.style.gradientColors?.[1]})` 
                      : template.data.style.foregroundColor
                  }}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => handleTemplateSelect(template.data)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105 text-sm shadow-lg hover:shadow-xl"
                >
                  Use Template
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleViewExample(template)}
                  className="flex-1 sm:flex-none transition-all duration-300 hover:scale-105 text-sm hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-900/20"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Preview Modal */}
      {isPreviewOpen && previewImage && currentTemplate && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" 
          onClick={closePreview}
        >
          <div 
            className="bg-white dark:bg-slate-800 p-6 rounded-xl max-w-md mx-4 shadow-2xl animate-scale-in border border-slate-200 dark:border-slate-700" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {currentTemplate.name} Preview
              </h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={closePreview}
                className="hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mb-4">
              <img 
                src={previewImage} 
                alt={`${currentTemplate.name} QR Code Preview`} 
                className="w-full max-w-64 mx-auto animate-fade-in" 
              />
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 text-center">
                {currentTemplate.description}
              </p>
              <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded text-xs text-slate-700 dark:text-slate-300 break-all">
                Content: {previewContent}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  handleTemplateSelect(currentTemplate.data);
                  closePreview();
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Use This Template
              </Button>
              <Button 
                onClick={closePreview}
                variant="outline"
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
