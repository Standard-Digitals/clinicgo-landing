import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Bot, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'bot' | 'user';
  text: string;
  options?: string[];
}

const OPTIONS = {
  INITIAL: ['Plugin Features', 'Pricing Plans', 'Installation Guide', 'Contact Support'],
  FEATURES: ['Calendar Sync', 'Payment Integration', 'Custom Forms', 'Back to Main Menu'],
  PRICING: ['Starter Plan', 'Professional Plan', 'Business Plan', 'Back to Main Menu'],
};

const RESPONSES: Record<string, { text: string; options?: string[] }> = {
  'Plugin Features': {
    text: 'SD Booking offers powerful features to automate your scheduling:\n\n• Customizable booking forms\n• Real-time calendar synchronization\n• Automated email/SMS notifications\n• Secure payment integrations (Stripe/PayPal)\n• Multi-service and multi-staff support',
    options: OPTIONS.FEATURES
  },
  'Pricing Plans': {
    text: 'We have three flexible pricing plans:\n\n• Starter: $49/year (Basic features)\n• Professional: $99/year (Advanced features + Sync)\n• Business: $199/year (All features + Priority Support)',
    options: OPTIONS.PRICING
  },
  'Installation Guide': {
    text: 'Installing SD Booking is easy:\n\n1. Download the plugin .zip file\n2. Go to your WordPress Dashboard > Plugins > Add New\n3. Upload the .zip file and click Install Now\n4. Activate the plugin and follow the setup wizard.',
    options: ['Back to Main Menu']
  },
  'Contact Support': {
    text: 'You can reach our support team via:\n\n📧 Email: support@standarddigitals.com\n📞 Phone: +91 9056347061\n📍 Address: Zirakpur, PIN-140603',
    options: ['Back to Main Menu']
  },
  'Calendar Sync': {
    text: 'Our plugin syncs perfectly with Google Calendar and Outlook, ensuring you never double-book an appointment.',
    options: ['Back to Main Menu']
  },
  'Payment Integration': {
    text: 'Accept payments directly through your booking forms using Stripe, PayPal, or Razorpay.',
    options: ['Back to Main Menu']
  },
  'Custom Forms': {
    text: 'Create unlimited custom fields to collect exactly the information you need from your clients.',
    options: ['Back to Main Menu']
  },
  'Starter Plan': {
    text: 'The Starter Plan ($49/year) is perfect for small businesses needing basic booking functionality.',
    options: ['Back to Main Menu']
  },
  'Professional Plan': {
    text: 'The Professional Plan ($99/year) includes calendar sync and automated reminders. Our most popular choice!',
    options: ['Back to Main Menu']
  },
  'Business Plan': {
    text: 'The Business Plan ($199/year) offers multi-staff support and priority developer assistance.',
    options: ['Back to Main Menu']
  },
  'Back to Main Menu': {
    text: 'How else can I help you today?',
    options: OPTIONS.INITIAL
  }
};

export default function AIChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: 'Hi! I am your SD Booking assistant. How can I help you today?',
      options: OPTIONS.INITIAL
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (option: string) => {
    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: option }]);
    
    // Simulate bot thinking
    setTimeout(() => {
      const response = RESPONSES[option] || { text: "I'm sorry, I don't have information on that. Would you like to contact support?", options: ['Contact Support', 'Back to Main Menu'] };
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: response.text,
        options: response.options
      }]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-200"
        aria-label="Toggle Support Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">SD Booking Support</h3>
                <p className="text-xs text-blue-100">Automated Assistant</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, idx) => (
                <div key={idx} className="space-y-3">
                  <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  
                  {/* Options Buttons */}
                  {msg.role === 'bot' && msg.options && idx === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="text-xs bg-white border border-blue-200 text-blue-600 px-3 py-2 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center gap-1 font-medium"
                        >
                          {opt}
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer Info */}
            <div className="p-3 border-t border-slate-100 bg-white text-center">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Need more help? <a href="mailto:support@standarddigitals.com" className="text-blue-600 hover:underline">Email us</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
