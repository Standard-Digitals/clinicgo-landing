import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { PremiumCard } from './PremiumCard';
import { ScrollReveal } from '../lib/animations';

const testimonials = [
  {
    name: 'Dr. Rajesh Patel',
    clinic: 'Metro Clinic, Delhi',
    role: 'Clinic Director',
    text: 'Clinic Go transformed our operations completely. We reduced no-shows by 45% and increased revenue by 30%. The team is incredibly responsive.',
    rating: 5,
    image: '👨‍⚕️'
  },
  {
    name: 'Dr. Priya Singh',
    clinic: 'Delhi Medical Center',
    role: 'Operations Manager',
    text: 'The analytics dashboard gives us insights we never had before. We can now make data-driven decisions about our clinic operations.',
    rating: 5,
    image: '👩‍⚕️'
  },
  {
    name: 'Dr. Amit Kumar',
    clinic: 'Bangalore Health Plus',
    role: 'Clinic Owner',
    text: 'Best investment we made for our clinic. The automation saved us 20 hours per week. Highly recommended for any healthcare business.',
    rating: 5,
    image: '👨‍⚕️'
  },
  {
    name: 'Dr. Neha Sharma',
    clinic: 'Mumbai Wellness',
    role: 'Head of IT',
    text: 'Security and compliance were our top concerns. Clinic Go exceeded our expectations with HIPAA compliance and data protection.',
    rating: 5,
    image: '👩‍⚕️'
  },
  {
    name: 'Dr. Vikram Desai',
    clinic: 'Pune Medical Group',
    role: 'Practice Manager',
    text: 'The patient portal has been a game-changer. Patients love the convenience, and we love the reduced administrative burden.',
    rating: 5,
    image: '👨‍⚕️'
  },
  {
    name: 'Dr. Anjali Verma',
    clinic: 'Hyderabad Healthcare',
    role: 'Clinic Administrator',
    text: 'Integration with our existing systems was seamless. The support team helped us through every step of the implementation.',
    rating: 5,
    image: '👩‍⚕️'
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200 mb-6"
          >
            <span className="w-2 h-2 bg-pink-600 rounded-full" />
            <span className="text-sm font-semibold text-pink-700">Trusted by Healthcare Leaders</span>
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl font-black text-slate-900 mb-6">
            Loved by Clinic Owners
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See what healthcare professionals are saying about Clinic Go
          </p>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PremiumCard hover glow gradient>
                <div className="p-8 h-full flex flex-col">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-slate-700 mb-6 flex-1 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-200">
                    <div className="text-3xl">{testimonial.image}</div>
                    <div>
                      <p className="font-bold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                      <p className="text-xs text-blue-600 font-semibold mt-1">{testimonial.clinic}</p>
                    </div>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-4 gap-8 pt-20 border-t border-slate-200"
        >
          {[
            { value: '10,000+', label: 'Active Users' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '50+', label: 'Countries' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-slate-600 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
