import React from 'react';
import { Users, Target, ShieldCheck, Code, Linkedin, Twitter, Mail } from 'lucide-react';

export default function About() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Clinic Go</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            We are the team behind Clinic Go, building the most reliable healthcare appointment booking system for clinics and medical practices.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            We believe that accepting patient appointments shouldn't be complicated. Clinic Go was created to give healthcare providers an enterprise-grade scheduling tool that installs in seconds.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Whether you run a medical clinic, dental practice, therapy center, or any healthcare facility, our platform adapts to your needs, saving you hours of administrative work every week.
          </p>
        </div>
        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl bg-slate-100 flex items-center justify-center border border-slate-200">
          <Code className="w-32 h-32 text-slate-300" />
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">The principles that guide our platform and our code.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: "Developer-Friendly", desc: "Clean code, extensive hooks, and easy-to-use shortcodes." },
              { icon: ShieldCheck, title: "Secure & Reliable", desc: "Built with WordPress security best practices in mind." },
              { icon: Target, title: "Conversion-Focused", desc: "Designed to turn your website visitors into booked appointments." },
              { icon: Users, title: "Customer Support", desc: "We stand by our plugin with dedicated 24/7 technical support." }
            ].map((val, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                <p className="text-slate-600 text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meet the Minds Behind Clinic Go</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our dedicated team of experts is committed to driving innovation and delivering exceptional healthcare solutions for your clinic.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {[
            { 
              name: "Gagandeep Singh", 
              role: "Founder", 
              img: "https://standarddigitals.com/wp-content/uploads/2025/05/1.png",
              description: "As the visionary Founder of Standard Digitals, Gagandeep drives innovation and success in the digital space. With a strategic mindset, he is dedicated to helping businesses thrive by applying the latest technology to optimize operational growth."
            },
            { 
              name: "Taranpreet Kaur", 
              role: "Client Relation Head", 
              img: "https://standarddigitals.com/wp-content/uploads/2025/05/2.png",
              description: "Taranpreet leads our client relations, serving as your dedicated partner in ensuring exceptional experiences. With a deep focus on understanding unique business needs, she is committed to delivering tailored solutions and fostering long-lasting, successful relationships."
            },
            { 
              name: "Ranjit Kairi", 
              role: "Tech Lead", 
              img: "https://lh3.googleusercontent.com/a/ACg8ocIVUBUe5l9g0TJJ5QDuIRxuEgUhasgacPxsTtgxg8lzw_WCOdFZWw=s800-c",
              description: "Ranjit is a results-driven Tech Lead who spearheads scalable, high-performance solutions for SD Booking. With deep expertise in modern web technologies and system architecture, he builds efficient, user-centric products that deliver real business impact through innovation."
            }
          ].map((member, i) => (
            <div key={i} className="group relative h-[450px] sm:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-slate-900">
              
              {/* Background Image */}
              <img 
                src={member.img} 
                alt={member.name} 
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay (Darkens on hover for text readability) */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 group-hover:from-slate-900 group-hover:via-slate-900/80 transition-all duration-500" />

              {/* Content Wrapper */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8">
                
                {/* Header (Always visible, bottom-left aligned) */}
                <div className="flex flex-col items-start text-left transform transition-transform duration-500 group-hover:-translate-y-2">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg mb-3">
                    {member.role}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {member.name}
                  </h3>
                </div>
                
                {/* Body (Revealed on hover, expands upwards) */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out w-full">
                  <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex flex-col items-start text-left">
                    <p className="text-slate-200 text-sm leading-relaxed mt-4">
                      {member.description}
                    </p>
                    
                    {/* Social Icons */}
                    <div className="mt-6 flex gap-3 pb-2">
                      <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all shadow-lg hover:scale-110">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-blue-400 hover:border-blue-400 transition-all shadow-lg hover:scale-110">
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all shadow-lg hover:scale-110">
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
