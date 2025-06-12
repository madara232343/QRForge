
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center">
              <Shield className="h-8 w-8 mr-3" />
              Privacy Policy
            </h1>
          </div>

          <Card className="animate-fade-in">
            <CardContent className="p-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">Data Collection</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  QRForge operates on a privacy-first principle. We do not collect, store, or share any personal data. 
                  All QR code generation happens locally in your browser.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Local Storage</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  We may store your QR code history and preferences locally in your browser for your convenience. 
                  This data never leaves your device and can be cleared at any time.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Analytics</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  We use Google Analytics to understand how our service is used. This helps us improve QRForge. 
                  No personally identifiable information is collected.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Cookies</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  We use minimal cookies for theme preferences and analytics. No tracking cookies are used.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Since we don't collect personal data, there's nothing to delete or modify. You have complete control 
                  over your data at all times.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Contact</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  If you have any questions about this Privacy Policy, please contact us at hello@qrforge.com
                </p>
              </div>

              <div className="text-sm text-slate-500 pt-4 border-t">
                Last updated: January 2025
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
