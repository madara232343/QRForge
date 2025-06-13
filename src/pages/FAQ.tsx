
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
      question: "Is Qrenzo really free?",
      answer: "Yes! Qrenzo is 100% free with unlimited QR code generation. No hidden fees or registration required."
    },
    {
      question: "What types of QR codes can I create?",
      answer: "You can create QR codes for URLs, text, email, phone numbers, WiFi credentials, business cards, crypto wallets, event invites, and more."
    },
    {
      question: "Can I customize my QR codes?",
      answer: "Absolutely! You can change colors, add logos, apply gradients, choose different shapes (dots, round, hex), customize eye styles, and even add AI-generated backgrounds."
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
      answer: "Static QR codes never expire. Smart Link QR codes (premium feature) can have optional expiry dates."
    },
    {
      question: "What are Smart Link QR codes?",
      answer: "Smart Link QR codes redirect to a short URL that you can change later, include click tracking, analytics, and optional expiry dates."
    },
    {
      question: "Can I create password-protected QR codes?",
      answer: "Yes! Our Locked QR feature allows you to require a password before the QR code redirects to its destination."
    },
    {
      question: "Can I generate multiple QR codes at once?",
      answer: "Yes! Use our Batch Generator to upload a CSV file and create hundreds of QR codes at once, perfect for businesses and events."
    },
    {
      question: "Can I share my QR designs with others?",
      answer: "Yes! You can publish your custom QR designs to our public gallery where others can view, vote, and remix your creations."
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
