
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "Is QRForge really free?",
      answer: "Yes! QRForge is 100% free with unlimited QR code generation. No hidden fees or registration required."
    },
    {
      question: "What types of QR codes can I create?",
      answer: "You can create QR codes for URLs, text, email, phone numbers, WiFi credentials, business cards, and more."
    },
    {
      question: "Can I customize my QR codes?",
      answer: "Absolutely! You can change colors, add logos, remove backgrounds, apply gradients, and choose from different shapes."
    },
    {
      question: "What formats can I download?",
      answer: "You can download QR codes in PNG, JPG, SVG, WebP, PDF formats, or get all formats in a ZIP file."
    },
    {
      question: "Can I use QR codes commercially?",
      answer: "Yes, all QR codes generated are free to use for personal and commercial purposes."
    },
    {
      question: "Do QR codes expire?",
      answer: "No, static QR codes never expire. They will work as long as the content they point to exists."
    }
  ];

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
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800 dark:text-slate-200">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
