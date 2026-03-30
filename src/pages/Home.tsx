import React, { useState, useEffect } from 'react';
import BookingWidget from '../components/BookingWidget';
import { CalendarDays, Settings, Blocks, ChevronRight, Download, CheckCircle2, Clock, Users, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            v2.0 Now Available for WordPress
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] sm:leading-[1.1]">
            Standard Digital <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Booking System</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            The ultimate WordPress plugin for booking appointments, meetings, and services.
          </p>
          <p className="text-base sm:text-lg text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Turn your WordPress site into a powerful, automated scheduling machine. Perfect for clinics, salons, consultants, and any business that needs a reliable booking solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <Link 
              to="/#demo" 
              className="inline-flex justify-center items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Try Live Demo <ChevronRight className="w-4 h-4" />
            </Link>
            <a 
              href="/signup" 
              className="inline-flex justify-center items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 active:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
            >
              <Download className="w-4 h-4" /> Download Plugin
            </a>
          </div>
          {/* Plugin stats */}
          <div className="pt-6 sm:pt-8 flex flex-wrap justify-center lg:justify-start items-center gap-6 sm:gap-8 border-t border-slate-200">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                <AnimatedCounter end={10000} suffix="+" prefix="" />
              </div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">Active Installs</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                <AnimatedCounter end={5} suffix="/5" prefix="⭐ " />
              </div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">User Rating</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">WP Compatible</div>
            </div>
          </div>
        </div>
        
        <div className="relative h-[350px] sm:h-[450px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-slate-50 to-blue-50">
           {/* Realistic representation of a calendar/booking UI */}
           <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 sm:pb-4">
                <div className="h-4 sm:h-6 w-24 sm:w-32 bg-slate-200 rounded-md"></div>
                <div className="flex gap-2">
                  <div className="h-4 sm:h-6 w-4 sm:w-6 bg-slate-100 rounded-full"></div>
                  <div className="h-4 sm:h-6 w-4 sm:w-6 bg-slate-100 rounded-full"></div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="hidden sm:block w-1/3 space-y-3">
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                  <div className="h-10 w-full bg-blue-50 border border-blue-100 rounded-lg flex items-center px-3">
                    <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                    <div className="h-3 w-16 bg-blue-200 rounded"></div>
                  </div>
                  <div className="h-10 w-full bg-slate-50 border border-slate-100 rounded-lg flex items-center px-3">
                    <div className="h-4 w-4 rounded-full bg-slate-300 mr-2"></div>
                    <div className="h-3 w-20 bg-slate-200 rounded"></div>
                  </div>
                  <div className="h-10 w-full bg-slate-50 border border-slate-100 rounded-lg flex items-center px-3">
                    <div className="h-4 w-4 rounded-full bg-slate-300 mr-2"></div>
                    <div className="h-3 w-14 bg-slate-200 rounded"></div>
                  </div>
                </div>
                
                <div className="w-full sm:w-2/3">
                  <div className="grid grid-cols-4 gap-1 sm:gap-2 mb-2">
                    {['Mon', 'Tue', 'Wed', 'Thu'].map((day, i) => (
                      <div key={i} className="text-center text-[10px] sm:text-xs font-medium text-slate-400 py-1">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-1 sm:gap-2">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`h-8 sm:h-12 rounded-md sm:rounded-lg border ${i === 5 || i === 10 ? 'bg-blue-500 border-blue-600 shadow-md shadow-blue-200' : 'bg-white border-slate-100'} flex items-center justify-center`}>
                        {(i === 5 || i === 10) && <div className="h-1 sm:h-1.5 w-4 sm:w-6 bg-white rounded-full opacity-50"></div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-white to-transparent"></div>
              
              {/* Floating widget card */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white p-3 sm:p-4 rounded-xl shadow-xl border border-slate-100 w-48 sm:w-64 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">Booking Confirmed!</div>
                    <div className="text-[10px] sm:text-xs text-slate-500">Just now</div>
                  </div>
                </div>
                <div className="text-[10px] sm:text-xs text-slate-600 line-clamp-2 sm:line-clamp-none">New appointment scheduled for tomorrow at 10:00 AM via WordPress.</div>
              </div>
           </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">From Zero to Booked in Minutes</h2>
            <p className="text-base sm:text-lg text-slate-600">Get your WordPress booking system up and running in three simple steps. No coding required.</p>
          </div>
          
          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 z-0 rounded-full opacity-50"></div>
            
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-xl flex items-center justify-center mb-8 relative group-hover:border-blue-100 group-hover:scale-105 transition-all duration-300">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">1</div>
                  <Download className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Install Plugin</h3>
                <p className="text-slate-600 leading-relaxed">Download and install the SD Booking plugin directly from your WordPress dashboard in one click.</p>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-xl flex items-center justify-center mb-8 relative group-hover:border-blue-100 group-hover:scale-105 transition-all duration-300">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">2</div>
                  <Settings className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Configure Settings</h3>
                <p className="text-slate-600 leading-relaxed">Set your availability, add your services, and customize the booking form to perfectly match your brand.</p>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-xl flex items-center justify-center mb-8 relative group-hover:border-blue-100 group-hover:scale-105 transition-all duration-300">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">3</div>
                  <CalendarDays className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Accept Bookings</h3>
                <p className="text-slate-600 leading-relaxed">Place the <code className="bg-slate-200 px-2 py-1 rounded text-blue-700 text-sm font-mono font-semibold mx-1">[sd_booking]</code> shortcode anywhere and start receiving appointments instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything You Need to Accept Bookings</h2>
            <p className="text-base sm:text-lg text-slate-600">SD Booking provides a complete suite of tools to manage appointments directly from your WordPress dashboard.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Blocks className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Seamless WP Integration</h3>
              <p className="text-slate-600 leading-relaxed">Installs in seconds. Use our simple shortcode [sd_booking] to drop the booking widget anywhere on your site.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Automated Scheduling</h3>
              <p className="text-slate-600 leading-relaxed">Set your availability, block out holidays, and let the system handle the rest. No more double-bookings.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Highly Customizable</h3>
              <p className="text-slate-600 leading-relaxed">Customize colors, text, services, and staff members directly from the WordPress admin dashboard.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Time Zone Support</h3>
              <p className="text-slate-600 leading-relaxed">Automatically detects your clients' time zones, ensuring they book at the correct local time.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Data</h3>
              <p className="text-slate-600 leading-relaxed">All booking data is stored securely in your own WordPress database. You own your data.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
              <p className="text-slate-600 leading-relaxed">Built with modern technologies to ensure the booking widget loads instantly without slowing down your site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="demo" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50 rounded-3xl my-8 sm:my-12 border border-slate-200 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide uppercase">
            Live Plugin Demo
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">See SD Booking In Action</h2>
          <p className="text-slate-600">This is exactly how the Standard Digital Booking System widget will look on your WordPress website. Try booking a test appointment below.</p>
        </div>
        
        <BookingWidget />
      </section>
    </main>
  );
}
