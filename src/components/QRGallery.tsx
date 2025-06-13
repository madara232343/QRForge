
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QRData } from '@/components/QRGenerator';
import { Heart, Eye, Download, Share, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode';

interface GalleryItem {
  id: string;
  name: string;
  author: string;
  qrData: QRData;
  likes: number;
  views: number;
  featured: boolean;
  createdAt: Date;
  preview?: string;
}

interface QRGalleryProps {
  onSelectFromGallery?: (qrData: QRData) => void;
}

export const QRGallery: React.FC<QRGalleryProps> = ({ onSelectFromGallery }) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Load sample gallery items
    const sampleItems: GalleryItem[] = [
      {
        id: '1',
        name: 'Neon Gradient Business Card',
        author: 'DesignPro',
        qrData: {
          type: 'text',
          content: 'BEGIN:VCARD\nVERSION:3.0\nFN:Creative Designer\nORG:Design Studio\nEMAIL:hello@design.com\nEND:VCARD',
          style: {
            foregroundColor: '#ff006e',
            backgroundColor: '#ffffff',
            shape: 'rounded',
            useGradient: true,
            gradientColors: ['#ff006e', '#8338ec'],
            errorCorrectionLevel: 'M'
          }
        },
        likes: 142,
        views: 1205,
        featured: true,
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Minimalist Restaurant Menu',
        author: 'RestaurantHub',
        qrData: {
          type: 'url',
          content: 'https://restaurant-menu.com/delicious',
          style: {
            foregroundColor: '#2d3436',
            backgroundColor: '#ffffff',
            shape: 'square',
            errorCorrectionLevel: 'M'
          }
        },
        likes: 89,
        views: 756,
        featured: false,
        createdAt: new Date('2024-01-10')
      },
      {
        id: '3',
        name: 'Crypto Wallet - Bitcoin Orange',
        author: 'CryptoKing',
        qrData: {
          type: 'text',
          content: 'bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
          style: {
            foregroundColor: '#f7931a',
            backgroundColor: '#000000',
            shape: 'dots',
            errorCorrectionLevel: 'H'
          }
        },
        likes: 234,
        views: 1890,
        featured: true,
        createdAt: new Date('2024-01-12')
      }
    ];

    // Generate previews for each item
    const loadPreviews = async () => {
      const itemsWithPreviews = await Promise.all(
        sampleItems.map(async (item) => {
          try {
            const preview = await QRCode.toDataURL(item.qrData.content, {
              color: {
                dark: item.qrData.style.foregroundColor,
                light: item.qrData.style.backgroundColor
              },
              width: 200,
              margin: 2
            });
            return { ...item, preview };
          } catch {
            return item;
          }
        })
      );
      setGalleryItems(itemsWithPreviews);
    };

    loadPreviews();
  }, []);

  const handleLike = (id: string) => {
    setGalleryItems(items =>
      items.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
    toast.success('Liked!');
  };

  const handleView = (id: string) => {
    setGalleryItems(items =>
      items.map(item =>
        item.id === id ? { ...item, views: item.views + 1 } : item
      )
    );
  };

  const handleUseDesign = (item: GalleryItem) => {
    if (onSelectFromGallery) {
      onSelectFromGallery(item.qrData);
      toast.success(`Applied "${item.name}" design!`);
    }
  };

  const categories = ['all', 'business', 'crypto', 'restaurant', 'social'];

  const filteredItems = galleryItems.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.name.toLowerCase().includes(selectedCategory);
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          QR Design Gallery
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Discover amazing QR designs created by our community
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <CardHeader className="relative">
              {item.featured && (
                <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                  <Trophy className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              <div className="flex justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                {item.preview && (
                  <img
                    src={item.preview}
                    alt={item.name}
                    className="w-32 h-32 object-contain"
                    onClick={() => handleView(item.id)}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-lg">{item.name}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  by {item.author}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {item.views}
                  </span>
                </div>
                <span>{item.createdAt.toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleLike(item.id)}
                  className="flex-1"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Like
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleUseDesign(item)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  Use Design
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No designs found in this category.</p>
        </div>
      )}
    </div>
  );
};
