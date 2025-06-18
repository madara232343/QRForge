
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import { SmartLinkHandler } from "./components/SmartLinkHandler";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Enhanced SEO Meta Tags for better Google AdSense compatibility
    const metaTags = [
      { name: 'description', content: 'Generate custom QR codes instantly for free with Qrenzo. No signup, no limits. Just fast, easy, beautiful QR code generation.' },
      { name: 'keywords', content: 'free qr code generator, qr code maker online, custom qr codes, qr generator no signup, qrenzo, wifi qr code, business card qr code' },
      { name: 'author', content: 'Qrenzo' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { property: 'og:title', content: 'Free QR Code Generator Online | Qrenzo' },
      { property: 'og:description', content: 'Generate custom QR codes instantly for free with Qrenzo. No signup, no limits. Just fast, easy, beautiful QR code generation.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'Qrenzo' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Free QR Code Generator Online | Qrenzo' },
      { name: 'twitter:description', content: 'Generate custom QR codes instantly for free with Qrenzo. No signup, no limits. Just fast, easy, beautiful QR code generation.' }
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

    // Set optimized page title
    document.title = 'Free QR Code Generator Online | Qrenzo';

    // Enhanced structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Qrenzo - Free QR Code Generator",
      "description": "Generate custom QR codes instantly for free with Qrenzo. No signup, no limits. Just fast, easy, beautiful QR code generation.",
      "url": window.location.origin,
      "applicationCategory": "Utility",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "Qrenzo"
      },
      "keywords": "free qr code generator, qr code maker online, custom qr codes, qr generator no signup, qrenzo"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="qrenzo-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/s/:shortCode" element={<SmartLinkHandler />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
