
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { QRData } from '@/components/QRGenerator';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface QRChatbotProps {
  onQRGenerated: (qrData: QRData) => void;
}

export const QRChatbot: React.FC<QRChatbotProps> = ({ onQRGenerated }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your QR assistant. What would you like to turn into a QR code today?",
      timestamp: new Date(),
      suggestions: ['Website URL', 'Business Card', 'WiFi Password', 'Phone Number']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateQRFromText = (content: string, type: QRData['type'] = 'text') => {
    const qrData: QRData = {
      type,
      content,
      style: {
        foregroundColor: '#1e293b',
        backgroundColor: '#ffffff',
        shape: 'square',
        errorCorrectionLevel: 'M'
      }
    };

    onQRGenerated(qrData);
    toast.success('QR code generated from your message!');
  };

  const processUserMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Detect intent and generate appropriate response
    if (lowerMessage.includes('website') || lowerMessage.includes('url') || lowerMessage.startsWith('http')) {
      return {
        response: "Great! I'll create a QR code for your website. Just paste the URL and I'll generate it for you.",
        suggestions: ['https://example.com', 'Generate QR', 'Change Style'],
        action: () => {
          if (message.startsWith('http')) {
            generateQRFromText(message, 'url');
          }
        }
      };
    } else if (lowerMessage.includes('business card') || lowerMessage.includes('contact')) {
      return {
        response: "Perfect! I'll help you create a business card QR code. This will contain your contact information in vCard format.",
        suggestions: ['Add my details', 'Use template', 'Generate now'],
        action: () => {
          const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:Your Name\nORG:Your Company\nTEL:+1234567890\nEMAIL:you@company.com\nEND:VCARD';
          generateQRFromText(vcard, 'text');
        }
      };
    } else if (lowerMessage.includes('wifi') || lowerMessage.includes('password')) {
      return {
        response: "I'll create a WiFi QR code for you! Guests can scan it to connect automatically. What's your network name and password?",
        suggestions: ['My Network, password123', 'Generate WiFi QR', 'Security tips'],
        action: () => {
          const wifi = 'WIFI:T:WPA;S:MyNetwork;P:password123;;';
          generateQRFromText(wifi, 'wifi');
        }
      };
    } else if (lowerMessage.includes('phone') || lowerMessage.includes('call')) {
      return {
        response: "I'll create a phone number QR code. When scanned, it will prompt to call the number directly.",
        suggestions: ['+1234567890', 'Generate Phone QR', 'Add more info'],
        action: () => {
          if (message.match(/[\d\+\-\(\)\s]+/)) {
            generateQRFromText(message, 'phone');
          }
        }
      };
    } else if (lowerMessage.includes('email')) {
      return {
        response: "I'll create an email QR code. Scanning it will open the email app with your address pre-filled.",
        suggestions: ['hello@example.com', 'Generate Email QR', 'Add subject'],
        action: () => {
          if (message.includes('@')) {
            generateQRFromText(message, 'email');
          }
        }
      };
    } else {
      return {
        response: "I can create a QR code with that text! Would you like me to generate it now, or would you like to customize the style first?",
        suggestions: ['Generate now', 'Customize style', 'Change content'],
        action: () => generateQRFromText(message)
      };
    }
  };

  const handleSendMessage = (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Process message and generate bot response
    setTimeout(() => {
      const { response, suggestions, action } = processUserMessage(messageContent);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
        suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Execute action if available
      if (action) {
        setTimeout(action, 500);
      }
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.startsWith('http') || suggestion.includes('@') || suggestion.includes('+')) {
      handleSendMessage(suggestion);
    } else if (suggestion === 'Generate now' || suggestion === 'Generate QR' || suggestion === 'Generate WiFi QR' || suggestion === 'Generate Phone QR' || suggestion === 'Generate Email QR') {
      // Trigger generation based on context
      handleSendMessage('generate');
    } else {
      handleSendMessage(suggestion);
    }
  };

  return (
    <Card className="border-blue-200 dark:border-blue-800 h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-600">
          <MessageCircle className="h-5 w-5" />
          QR Assistant
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">AI</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.type === 'bot' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-xs opacity-75">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
                
                {message.suggestions && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs h-6 px-2"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
