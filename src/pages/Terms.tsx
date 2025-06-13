import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Terms = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="mr-4">
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
                <p className="text-slate-600 dark:text-slate-400">By accessing and using Qrenzo, you accept and agree to be bound by the terms and provision of this agreement.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Use License</h2>
                <p className="text-slate-600 dark:text-slate-400">Permission is granted to temporarily download one copy of Qrenzo for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">QR Code Usage</h2>
                <p className="text-slate-600 dark:text-slate-400">All QR codes generated using Qrenzo are free to use for personal and commercial purposes. You retain full ownership and rights to your generated QR codes.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Service Availability</h2>
                <p className="text-slate-600 dark:text-slate-400">Qrenzo is provided "as is" without any warranties. We do not guarantee continuous availability of the service and may suspend or discontinue it at any time.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Prohibited Uses</h2>
                <p className="text-slate-600 dark:text-slate-400">You may not use Qrenzo for any unlawful purpose or to generate QR codes containing malicious, harmful, or illegal content.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  In no event shall QRForge or its creators be liable for any damages arising out of the use or 
                  inability to use the service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                <p className="text-slate-600 dark:text-slate-400">If you have any questions about these Terms of Service, please contact us </p>
              </div>

              <div className="text-sm text-slate-500 pt-4 border-t">
                Last updated: January 2025
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>;
};
export default Terms;