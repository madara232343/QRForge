
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shield, ExternalLink, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface SmartLinkData {
  id: string;
  short_code: string;
  original_url: string;
  password?: string;
  tracking: boolean;
  expiry?: string;
  clicks: number;
  created_at: string;
  updated_at: string;
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
    const findSmartLink = async () => {
      if (!shortCode) {
        console.log('No short code provided');
        setLoading(false);
        return;
      }

      console.log('Looking for smart link with code:', shortCode);

      try {
        const { data, error } = await supabase
          .from('smart_links')
          .select('*')
          .eq('short_code', shortCode)
          .single();

        if (error) {
          console.error('Error fetching smart link:', error);
          setLoading(false);
          return;
        }

        if (!data) {
          console.log('No smart link found for code:', shortCode);
          setLoading(false);
          return;
        }

        console.log('Found smart link data:', data);

        // Check if expired
        if (data.expiry) {
          const expiryDate = new Date(data.expiry);
          const now = new Date();
          console.log('Checking expiry:', expiryDate, 'vs', now);
          
          if (expiryDate < now) {
            console.log('Link has expired');
            setExpired(true);
            setLoading(false);
            return;
          }
        }

        setSmartLink(data);

        // Check if password required
        if (data.password) {
          console.log('Password required for this link');
          setPasswordRequired(true);
        } else {
          console.log('No password required, starting auto-redirect timer');
          // Auto-redirect after 3 seconds for non-password protected links
          setTimeout(() => {
            handleRedirect(data);
          }, 3000);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error processing smart link:', error);
        setLoading(false);
      }
    };

    findSmartLink();
  }, [shortCode]);

  const trackClick = async (linkData: SmartLinkData) => {
    if (!linkData.tracking) {
      console.log('Tracking disabled for this link');
      return;
    }
    
    console.log('Tracking click for:', linkData.short_code);
    try {
      const { error } = await supabase
        .from('smart_links')
        .update({ 
          clicks: linkData.clicks + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', linkData.id);

      if (error) {
        console.error('Error tracking click:', error);
      } else {
        console.log('Click tracked successfully, new count:', linkData.clicks + 1);
      }
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const handleRedirect = (linkData: SmartLinkData) => {
    console.log('Starting redirect to:', linkData.original_url);
    setRedirecting(true);
    
    // Track the click
    trackClick(linkData);

    // Redirect to original URL
    setTimeout(() => {
      console.log('Executing redirect...');
      window.location.href = linkData.original_url;
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
                <p className="text-sm font-mono break-all">{smartLink?.original_url}</p>
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
