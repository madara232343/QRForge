
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
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
              <FileText className="h-8 w-8 mr-3" />
              Terms of Service
            </h1>
          </div>

          <Card className="animate-fade-in">
            <CardContent className="p-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  By using QRForge, you agree to these Terms of Service. If you do not agree, please do not use our service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Service Description</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  QRForge is a free QR code generator that allows users to create, customize, and download QR codes 
                  for various purposes including URLs, text, email, phone numbers, and more.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Usage Rights</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  You may use QRForge for personal and commercial purposes. All generated QR codes are yours to use 
                  without restrictions. We claim no ownership over your generated content.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Prohibited Uses</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  You may not use QRForge to create content that is illegal, harmful, threatening, abusive, 
                  defamatory, or violates any laws or regulations.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Service Availability</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  We strive to keep QRForge available 24/7, but we cannot guarantee uninterrupted service. 
                  We may perform maintenance or updates that temporarily affect availability.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  QRForge is provided "as is" without warranties of any kind. We are not responsible for any 
                  damages arising from the use of our service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Changes to Terms</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  We may update these Terms of Service from time to time. Continued use of the service 
                  constitutes acceptance of any changes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Contact</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  If you have any questions about these Terms of Service, please contact us at contact@qrforge.com
                </p>
              </div>

              <div className="text-sm text-slate-500 pt-4 border-t">
                Last updated: December 2024
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
