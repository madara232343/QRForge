
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shield, ExternalLink, Clock, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface SmartLinkData {
  originalUrl: string;
  shortCode: string;
  tracking: boolean;
  expiry: string | null;
  password: string | null;
  clicks: number;
  created: string;
}

export const SmartLinkHandler: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [smartLink, setSmartLink] = useState<SmartLinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!shortCode) {
      setLoading(false);
      return;
    }

    // Get smart link data from localStorage
    const smartLinks = JSON.parse(localStorage.getItem('qrenzo-smart-links') || '{}');
    const linkData = smartLinks[shortCode];

    if (!linkData) {
      setLoading(false);
      return;
    }

    // Check if expired
    if (linkData.expiry && new Date(linkData.expiry) < new Date()) {
      setExpired(true);
      setLoading(false);
      return;
    }

    // Check if password required
    if (linkData.password) {
      setPasswordRequired(true);
    }

    setSmartLink(linkData);
    setLoading(false);

    // Track click if tracking enabled and no password required
    if (linkData.tracking && !linkData.password) {
      trackClick(shortCode, linkData);
    }
  }, [shortCode]);

  const trackClick = (code: string, linkData: SmartLinkData) => {
    const smartLinks = JSON.parse(localStorage.getItem('qrenzo-smart-links') || '{}');
    smartLinks[code] = {
      ...linkData,
      clicks: linkData.clicks + 1
    };
    localStorage.setItem('qrenzo-smart-links', JSON.stringify(smartLinks));
  };

  const handlePasswordSubmit = () => {
    if (!smartLink || password !== smartLink.password) {
      toast.error('Incorrect password');
      return;
    }

    if (smartLink.tracking) {
      trackClick(shortCode!, smartLink);
    }

    // Redirect to original URL
    window.location.href = smartLink.originalUrl;
  };

  const handleDirectRedirect = () => {
    if (!smartLink) return;

    if (smartLink.tracking) {
      trackClick(shortCode!, smartLink);
    }

    // Redirect to original URL
    window.location.href = smartLink.originalUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!smartLink) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Link Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This smart link doesn't exist or has been removed.
            </p>
            <Button asChild>
              <a href="/">Create New QR Code</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (expired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-orange-600 flex items-center justify-center gap-2">
              <Clock className="h-5 w-5" />
              Link Expired
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This smart link has expired and is no longer accessible.
            </p>
            <Button asChild>
              <a href="/">Create New QR Code</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (passwordRequired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-purple-600 flex items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              Protected Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 text-center">
              This link is password protected. Enter the password to continue.
            </p>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
            </div>
            <Button onClick={handlePasswordSubmit} className="w-full">
              Access Link
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Auto-redirect for non-password protected links
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-purple-600">Redirecting...</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Taking you to: {smartLink.originalUrl}
          </p>
          <Button onClick={handleDirectRedirect} className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Go Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
