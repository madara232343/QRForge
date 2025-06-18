import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { QRData } from '@/components/QRGenerator';
import { Link, Calendar, BarChart3, Shield, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface SmartLinkQRProps {
  qrData: QRData;
  setQRData: (data: QRData) => void;
}

export const SmartLinkQR: React.FC<SmartLinkQRProps> = ({ qrData, setQRData }) => {
  const [smartUrl, setSmartUrl] = useState('');
  const [expiryDays, setExpiryDays] = useState(30);
  const [enableTracking, setEnableTracking] = useState(true);
  const [enableExpiry, setEnableExpiry] = useState(false);
  const [password, setPassword] = useState('');
  const [enablePassword, setEnablePassword] = useState(false);

  const generateSmartLink = () => {
    if (!smartUrl.trim()) {
      toast.error('Please enter a destination URL');
      return;
    }

    // Validate URL
    let validUrl = smartUrl.trim();
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = 'https://' + validUrl;
    }

    try {
      new URL(validUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    if (enablePassword && !password.trim()) {
      toast.error('Please enter a password');
      return;
    }

    // Generate a unique short code
    const shortCode = Math.random().toString(36).substring(2, 8);
    const smartLinkUrl = `${window.location.origin}/s/${shortCode}`;
    
    const smartLinkData = {
      originalUrl: validUrl,
      shortCode,
      tracking: enableTracking,
      expiry: enableExpiry ? new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString() : null,
      password: enablePassword ? password.trim() : null,
      clicks: 0,
      created: new Date().toISOString()
    };

    console.log('Creating smart link:', smartLinkData);

    try {
      // Store smart link data in localStorage
      const existingData = localStorage.getItem('qrenzo-smart-links');
      const smartLinks = existingData ? JSON.parse(existingData) : {};
      smartLinks[shortCode] = smartLinkData;
      localStorage.setItem('qrenzo-smart-links', JSON.stringify(smartLinks));

      console.log('Smart link saved to localStorage');
      console.log('All stored links:', JSON.parse(localStorage.getItem('qrenzo-smart-links') || '{}'));

      // Update QR data with smart link
      setQRData({
        ...qrData,
        content: smartLinkUrl,
        smartLink: {
          originalUrl: validUrl,
          shortCode,
          tracking: enableTracking,
          expiry: enableExpiry ? new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000) : null,
          password: enablePassword ? password.trim() : null,
          clicks: 0,
          created: new Date()
        }
      });

      toast.success('Smart Link QR created successfully!');
    } catch (error) {
      console.error('Error saving smart link:', error);
      toast.error('Failed to create smart link');
    }
  };

  const copySmartLink = async () => {
    if (qrData.content) {
      try {
        await navigator.clipboard.writeText(qrData.content);
        toast.success('Smart link copied to clipboard!');
      } catch {
        toast.error('Failed to copy link');
      }
    }
  };

  const openSmartLink = () => {
    if (qrData.content) {
      window.open(qrData.content, '_blank');
    }
  };

  return (
    <Card className="border-purple-200 dark:border-purple-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-600">
          <Link className="h-5 w-5" />
          Smart Link QR
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">Premium</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="smart-url">Destination URL *</Label>
          <Input
            id="smart-url"
            value={smartUrl}
            onChange={(e) => setSmartUrl(e.target.value)}
            placeholder="example.com or https://example.com"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <Label>Enable Click Tracking</Label>
          </div>
          <Switch checked={enableTracking} onCheckedChange={setEnableTracking} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <Label>Set Expiry Date</Label>
          </div>
          <Switch checked={enableExpiry} onCheckedChange={setEnableExpiry} />
        </div>

        {enableExpiry && (
          <div>
            <Label htmlFor="expiry-days">Expires in (days)</Label>
            <Input
              id="expiry-days"
              type="number"
              value={expiryDays}
              onChange={(e) => setExpiryDays(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <Label>Password Protection</Label>
          </div>
          <Switch checked={enablePassword} onCheckedChange={setEnablePassword} />
        </div>

        {enablePassword && (
          <div>
            <Label htmlFor="qr-password">Password *</Label>
            <Input
              id="qr-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
        )}

        <Button 
          onClick={generateSmartLink} 
          disabled={!smartUrl.trim() || (enablePassword && !password.trim())}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          Create Smart Link QR
        </Button>

        {qrData.smartLink && (
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg space-y-3">
            <div>
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
                Smart Link Created:
              </p>
              <code className="text-xs bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded break-all">
                {qrData.content}
              </code>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={copySmartLink} className="flex items-center gap-1">
                <Copy className="h-3 w-3" />
                Copy
              </Button>
              <Button size="sm" variant="outline" onClick={openSmartLink} className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                Test
              </Button>
            </div>
            
            <div className="text-xs text-purple-600 dark:text-purple-400 space-y-1">
              <p>Original URL: {qrData.smartLink.originalUrl}</p>
              <p>Clicks: {qrData.smartLink.clicks} | Created: {qrData.smartLink.created.toLocaleDateString()}</p>
              {qrData.smartLink.expiry && (
                <p>Expires: {qrData.smartLink.expiry.toLocaleDateString()}</p>
              )}
              {qrData.smartLink.password && (
                <p>Password Protected: Yes</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
