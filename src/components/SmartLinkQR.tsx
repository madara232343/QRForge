
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { QRData } from '@/components/QRGenerator';
import { Link, Calendar, BarChart3, Shield } from 'lucide-react';
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
    // Generate a unique short code
    const shortCode = Math.random().toString(36).substring(2, 8);
    const smartLinkUrl = `https://qrenzo.app/s/${shortCode}`;
    
    // Update QR data with smart link
    setQRData({
      ...qrData,
      content: smartLinkUrl,
      smartLink: {
        originalUrl: smartUrl,
        shortCode,
        tracking: enableTracking,
        expiry: enableExpiry ? new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000) : null,
        password: enablePassword ? password : null,
        clicks: 0,
        created: new Date()
      }
    });

    toast.success('Smart Link QR created! You can change the destination URL anytime.');
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
          <Label htmlFor="smart-url">Destination URL</Label>
          <Input
            id="smart-url"
            value={smartUrl}
            onChange={(e) => setSmartUrl(e.target.value)}
            placeholder="https://example.com"
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
              onChange={(e) => setExpiryDays(parseInt(e.target.value))}
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
            <Label htmlFor="qr-password">Password</Label>
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
          disabled={!smartUrl}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          Create Smart Link QR
        </Button>

        {qrData.smartLink && (
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Smart Link Created: <code>{qrData.content}</code>
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              Clicks: {qrData.smartLink.clicks} | Created: {qrData.smartLink.created.toLocaleDateString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
