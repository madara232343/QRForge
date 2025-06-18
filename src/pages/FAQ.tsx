
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqData = [
    {
      question: "What is a QR Code and how does it work?",
      answer: "A QR Code (Quick Response Code) is a type of barcode that can store various types of information like URLs, text, contact information, and more. When scanned with a smartphone camera or QR reader app, it instantly takes the user to the encoded content. QR codes work by encoding data in a pattern of black squares arranged on a white background."
    },
    {
      question: "Are QR codes free to create with Qrenzo?",
      answer: "Yes! Qrenzo is completely free to use. You can create unlimited QR codes without any cost, registration, or hidden fees. There are no limits on the number of QR codes you can generate."
    },
    {
      question: "How do I make a QR code for my website?",
      answer: "Creating a QR code for your website is simple: 1) Select 'URL' as your content type, 2) Enter your website URL, 3) Customize the design with colors and logos if desired, 4) Click generate, and 5) Download your QR code. It takes less than 30 seconds!"
    },
    {
      question: "Can I customize the appearance of my QR codes?",
      answer: "Absolutely! Qrenzo offers extensive customization options including custom colors, gradients, different shapes (square, rounded, dots), logo integration, and various design templates. You can make your QR codes match your brand perfectly."
    },
    {
      question: "What file formats can I download my QR codes in?",
      answer: "You can download your QR codes in multiple formats: PNG (for web and print), SVG (scalable vector format), and PDF (for professional printing). Each format is optimized for different use cases."
    },
    {
      question: "Are QR codes safe to use?",
      answer: "QR codes themselves are safe, but always be cautious about scanning unknown QR codes as they can direct you to malicious websites. When creating QR codes with Qrenzo, your data is processed securely and we don't store any personal information."
    },
    {
      question: "Do I need to sign up or register to use Qrenzo?",
      answer: "No registration required! You can start creating QR codes immediately without providing any personal information. This ensures your privacy and makes the process quick and hassle-free."
    },
    {
      question: "Can I track how many people scan my QR codes?",
      answer: "Yes! With our Smart Link feature, you can create trackable QR codes that provide analytics on scan counts, locations, and more. You can also add password protection and expiry dates to your smart links."
    },
    {
      question: "What types of content can I encode in QR codes?",
      answer: "Qrenzo supports various content types including: URLs/websites, plain text, email addresses, phone numbers, WiFi credentials, contact information (vCard), SMS messages, and more. Each type is optimized for the best user experience."
    },
    {
      question: "Can I add my logo to QR codes?",
      answer: "Yes! You can upload your logo and integrate it into your QR codes. Our system automatically optimizes the logo size and placement to maintain scannability while showcasing your brand."
    },
    {
      question: "Will my QR codes work on all devices?",
      answer: "Yes! QR codes created with Qrenzo work on all smartphones, tablets, and devices with camera functionality. They're compatible with built-in camera apps on iOS and Android, as well as dedicated QR reader apps."
    },
    {
      question: "Can I create multiple QR codes at once?",
      answer: "Yes! Our Batch Generator feature allows you to create multiple QR codes simultaneously, perfect for events, product catalogs, or large campaigns. Simply upload your data and generate hundreds of QR codes in minutes."
    }
  ];

  const useCases = [
    "Business cards and networking",
    "Restaurant menus and contactless ordering", 
    "Event tickets and check-ins",
    "Product packaging and authentication",
    "WiFi password sharing",
    "Social media profile sharing",
    "Marketing campaigns and promotions",
    "Real estate listings and virtual tours",
    "Educational materials and resources",
    "Contact information sharing"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <Header />
      
      <main className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to know about creating QR codes with Qrenzo
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-semibold">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Top 10 Uses for QR Codes in 2025
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {useCases.map((useCase, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{useCase}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
