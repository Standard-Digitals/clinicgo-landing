import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ChevronDown } from 'lucide-react';




interface FAQ {
  question: string;
  answer: string;
}

export const FaqSection = () => {
const faqs: FAQ[] = [
    {
      question: 'Is ClinicGo beginner friendly?',
      answer: 'Yes! ClinicGo is designed with simplicity in mind. You can set up your clinic management system in minutes without any technical knowledge.'
    },
    {
      question: 'Does it support WhatsApp reminders?',
      answer: 'Absolutely! ClinicGo includes built-in WhatsApp integration to send automated appointment reminders to your patients.'
    },
    {
      question: 'Can patients book without registration?',
      answer: 'Yes, patients can book appointments as guests without creating an account, making the process quick and hassle-free.'
    },
    {
      question: 'Does it support Elementor?',
      answer: 'Yes! ClinicGo comes with beautiful Elementor widgets that you can easily add to your website pages.'
    },
    {
      question: 'Is Google Calendar supported?',
      answer: 'Yes, ClinicGo seamlessly integrates with Google Calendar to sync all your appointments automatically.'
    },
    {
      question: 'Can multiple doctors be managed?',
      answer: 'Absolutely! You can manage unlimited doctors, staff members, and departments with role-based access control.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant='outline' className="mb-4">FAQ</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about ClinicGo
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
