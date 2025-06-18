import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shield, ExternalLink, Clock, AlertCircle } from 'lucide-react';
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
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const findSmartLink = () => {
      if (!shortCode) {
        console.log('No short code provided');
        setLoading(false);
        return;
      }

      console.log('Looking for smart link with code:', shortCode);

      try {
        // Get smart link data from localStorage with better error handling
        const smartLinksData = localStorage.getItem('qrenzo-smart-links');
        console.log('Raw localStorage data:', smartLinksData);
        
        if (!smartLinksData) {
          console.log('No smart links data in localStorage');
          setLoading(false);
          return;
        }

        const smartLinks = JSON.parse(smartLinksData);
        console.log('All stored smart links:', smartLinks);
        console.log('Available short codes:', Object.keys(smartLinks));
        
        const linkData = smartLinks[shortCode];
        console.log('Found link data for', shortCode, ':', linkData);

        if (!linkData) {
          console.log('No link data found for code:', shortCode);
          setLoading(false);
          return;
        }

        // Check if expired
        if (linkData.expiry) {
          const expiryDate = new Date(linkData.expiry);
          const now = new Date();
          console.log('Checking expiry:', expiryDate, 'vs', now);
          
          if (expiryDate < now) {
            console.log('Link has expired');
            setExpired(true);
            setLoading(false);
            return;
          }
        }

        console.log('Smart link is valid:', linkData);
        setSmartLink(linkData);

        // Check if password required
        if (linkData.password) {
          console.log('Password required for this link');
          setPasswordRequired(true);
        } else {
          console.log('No password required, starting auto-redirect timer');
          // Auto-redirect after 3 seconds for non-password protected links
          setTimeout(() => {
            handleRedirect(linkData);
          }, 3000);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error processing smart link:', error);
        setLoading(false);
      }
    };

    // Small delay to ensure localStorage is ready
    setTimeout(findSmartLink, 100);
  }, [shortCode]);

  const trackClick = (code: string, linkData: SmartLinkData) => {
    if (!linkData.tracking) {
      console.log('Tracking disabled for this link');
      return;
    }
    
    console.log('Tracking click for:', code);
    try {
      const smartLinksData = localStorage.getItem('qrenzo-smart-links');
      if (smartLinksData) {
        const smartLinks = JSON.parse(smartLinksData);
        if (smartLinks[code]) {
          smartLinks[code] = {
            ...smartLinks[code],
            clicks: smartLinks[code].clicks + 1
          };
          localStorage.setItem('qrenzo-smart-links', JSON.stringify(smartLinks));
          console.log('Click tracked successfully, new count:', smartLinks[code].clicks);
        }
      }
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const handleRedirect = (linkData: SmartLinkData) => {
    console.log('Starting redirect to:', linkData.originalUrl);
    setRedirecting(true);
    
    // Track the click
    if (shortCode) {
      trackClick(shortCode, linkData);
    }

    // Redirect to original URL
    setTimeout(() => {
      console.log('Executing redirect...');
      window.location.href = linkData.originalUrl;
    }, 1500);
  };

  const handlePasswordSubmit = () => {
    if (!smartLink || !password.trim()) {
      toast.error('Please enter a password');
      return;
    }

    if (password.trim() !== smartLink.password) {
      toast.error('Incorrect password');
      return;
    }

    toast.success('Password correct! Redirecting...');
    setTimeout(() => {
      handleRedirect(smartLink);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!smartLink) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600 flex items-center justify-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Link Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              This smart link doesn't exist or has been removed.
            </p>
            <p className="text-sm text-gray-500">
              Short code: {shortCode}
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
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
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
            <Button onClick={handlePasswordSubmit} className="w-full" disabled={!password}>
              Access Link
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show redirect screen for non-password protected links
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-purple-600">
            {redirecting ? 'Redirecting...' : 'Smart Link Found'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {redirecting ? (
            <div>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Taking you to your destination...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                You will be redirected to:
              </p>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-mono break-all">{smartLink?.originalUrl}</p>
              </div>
              <p className="text-xs text-gray-500">
                Redirecting automatically in 2 seconds...
              </p>
            </div>
          )}
          
          {!redirecting && smartLink && (
            <Button onClick={() => handleRedirect(smartLink)} className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Go Now
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
