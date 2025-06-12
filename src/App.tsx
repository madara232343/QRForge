
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // SEO Meta Tags for better Google AdSense compatibility
    const metaTags = [
      { name: 'description', content: 'QRForge - Free unlimited QR code generator with advanced customization. Create professional QR codes for URLs, WiFi, business cards, and more. No registration required.' },
      { name: 'keywords', content: 'qr code generator, free qr code, qr code maker, custom qr code, wifi qr code, business card qr code, url qr code' },
      { name: 'author', content: 'Raval Dhwanil' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { property: 'og:title', content: 'QRForge - Free QR Code Generator' },
      { property: 'og:description', content: 'Create unlimited professional QR codes with advanced customization. 100% free forever.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'QRForge - Free QR Code Generator' },
      { name: 'twitter:description', content: 'Create unlimited professional QR codes with advanced customization. 100% free forever.' }
    ];

    metaTags.forEach(tag => {
      const existingTag = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        if (tag.name) meta.name = tag.name;
        if (tag.property) meta.setAttribute('property', tag.property);
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    // Set page title
    document.title = 'QRForge - Free Unlimited QR Code Generator | Create Professional QR Codes';

    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "QRForge",
      "description": "Free unlimited QR code generator with advanced customization",
      "url": window.location.origin,
      "applicationCategory": "Utility",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Person",
        "name": "Raval Dhwanil"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="qrforge-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
