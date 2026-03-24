import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  Banknote, 
  Search, 
  ArrowRight, 
  ArrowLeft,
  UserPlus,
  UserCheck,
  Stethoscope,
  Activity
} from 'lucide-react';
import { cn } from '../lib/utils';
import { format, addDays, isBefore, startOfDay } from 'date-fns';

// --- MOCK DATA ---
const SERVICES = [
  { id: 's1', name: 'General Consultation', price: 500, duration: 30, category: 'General' },
  { id: 's2', name: 'Dental Cleaning', price: 1200, duration: 45, category: 'Dental' },
  { id: 's3', name: 'Eye Checkup', price: 800, duration: 30, category: 'Vision' },
  { id: 's4', name: 'Physiotherapy', price: 1500, duration: 60, category: 'Therapy' },
  { id: 's5', name: 'Blood Test', price: 400, duration: 15, category: 'Lab' },
  { id: 's6', name: 'X-Ray', price: 1000, duration: 20, category: 'Lab' },
];

const DOCTORS = [
  { id: 'd1', name: 'Dr. Sarah Smith', spec: 'General Physician', serviceIds: ['s1', 's5'] },
  { id: 'd2', name: 'Dr. John Doe', spec: 'Dentist', serviceIds: ['s2'] },
  { id: 'd3', name: 'Dr. Emily Chen', spec: 'Ophthalmologist', serviceIds: ['s3'] },
  { id: 'd4', name: 'Dr. Michael Brown', spec: 'Physiotherapist', serviceIds: ['s4'] },
  { id: 'd5', name: 'Dr. Anita Patel', spec: 'Radiologist', serviceIds: ['s6'] },
];

const SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

const STEPS = ['Service', 'Doctor', 'Date & Time', 'Details', 'Payment', 'Confirm'];

export default function BookingWidget() {
  const [tab, setTab] = useState<'new' | 'existing'>('new');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Form State
  const [serviceId, setServiceId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [payment, setPayment] = useState<'cash' | 'card' | ''>('');

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [availableSlots, setAvailableSlots] = useState<{time: string, booked: boolean}[]>([]);

  // Existing Patient State
  const [exSearchType, setExSearchType] = useState<'id' | 'phone'>('id');
  const [exSearchQuery, setExSearchQuery] = useState('');
  const [exPatientFound, setExPatientFound] = useState<any>(null);
  const [exError, setExError] = useState('');

  // Derived Data
  const categories = ['All', ...Array.from(new Set(SERVICES.map(s => s.category)))];
  const filteredServices = SERVICES.filter(s => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
  const filteredDoctors = DOCTORS.filter(d => d.serviceIds.includes(serviceId));
  const selectedService = SERVICES.find(s => s.id === serviceId);
  const selectedDoctor = DOCTORS.find(d => d.id === doctorId);

  // Handlers
  const handleNext = () => {
    if (step === 1 && !serviceId) return alert('Please select a service');
    if (step === 2 && !doctorId) return alert('Please select a doctor');
    if (step === 3 && (!date || !time)) return alert('Please select a date and time');
    if (step === 4 && (!name || !phone)) return alert('Please enter your name and phone number');
    if (step === 5 && !payment) return alert('Please select a payment method');

    if (step < 6) {
      setStep(s => s + 1);
    } else {
      submitBooking();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const submitBooking = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setBookingId(`BK-${Math.floor(Math.random() * 1000000)}`);
    setSuccess(true);
  };

  const fetchExistingPatient = async () => {
    if (!exSearchQuery) return setExError('Please enter a value');
    setLoading(true);
    setExError('');
    setExPatientFound(null);
    
    // Simulate API call
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);

    if (exSearchQuery === '12345' || exSearchQuery.includes('9876')) {
      setExPatientFound({
        id: 'PT-8829',
        name: 'Jane Doe',
        phone: '9876543210',
        email: 'jane@example.com'
      });
      setName('Jane Doe');
      setPhone('9876543210');
      setEmail('jane@example.com');
    } else {
      setExError('No patient found with these details.');
    }
  };

  // Effect to load slots when date changes
  useEffect(() => {
    if (date) {
      // Simulate fetching slots
      const slots = SLOTS.map(t => ({
        time: t,
        booked: Math.random() > 0.7 // Randomly book some slots
      }));
      setAvailableSlots(slots);
      setTime(''); // Reset time when date changes
    }
  }, [date, doctorId]);

  // Reset doctor when service changes
  useEffect(() => {
    setDoctorId('');
  }, [serviceId]);

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
        <p className="text-gray-500 mb-6">Your appointment has been successfully booked. We've sent a confirmation to your phone.</p>
        
        <div className="bg-blue-50 text-blue-700 font-mono font-bold py-3 px-6 rounded-xl inline-block mb-8 text-lg">
          {bookingId}
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 active:bg-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setTab('new')}
          className={cn(
            "flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
            tab === 'new' ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
          )}
        >
          <UserPlus className="w-4 h-4" />
          New Booking
        </button>
        <button
          onClick={() => setTab('existing')}
          className={cn(
            "flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500",
            tab === 'existing' ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
          )}
        >
          <UserCheck className="w-4 h-4" />
          Existing Patient
        </button>
      </div>

      <div className="p-6 md:p-8 min-h-[500px] flex flex-col">
        {tab === 'existing' ? (
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome Back</h3>
            <p className="text-gray-500 text-sm mb-6">Enter your details to quickly book your next appointment.</p>

            <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
              <button
                onClick={() => setExSearchType('id')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500",
                  exSearchType === 'id' ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Patient ID
              </button>
              <button
                onClick={() => setExSearchType('phone')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500",
                  exSearchType === 'phone' ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Phone Number
              </button>
            </div>

            <div className="flex gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={exSearchType === 'id' ? 'text' : 'tel'}
                  placeholder={exSearchType === 'id' ? 'e.g. PT-8829' : 'e.g. 9876543210'}
                  value={exSearchQuery}
                  onChange={(e) => setExSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <button
                onClick={fetchExistingPatient}
                disabled={loading}
                className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 active:bg-gray-950 transition-colors disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                {loading ? 'Searching...' : 'Find'}
              </button>
            </div>

            {exError && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm mb-4">
                {exError}
              </div>
            )}

            {exPatientFound && (
              <div className="mt-4 flex-1 flex flex-col">
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl mb-6">
                  <div className="font-semibold text-green-800 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    {exPatientFound.name}
                  </div>
                  <div className="text-green-600 text-sm mt-1 ml-7">
                    {exPatientFound.phone} • {exPatientFound.email}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setTab('new');
                    setStep(1);
                  }}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors mt-auto flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Continue Booking <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Stepper Progress */}
            <div className="relative mb-8 px-2">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full"></div>
              <div 
                className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
              ></div>
              <div className="relative flex justify-between">
                {STEPS.map((label, i) => {
                  const isActive = step === i + 1;
                  const isCompleted = step > i + 1;
                  return (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <div 
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 z-10",
                          isActive ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                          isCompleted ? "bg-blue-600 text-white" :
                          "bg-white text-gray-400 border-2 border-gray-200"
                        )}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className={cn(
                        "text-[10px] uppercase tracking-wider font-semibold absolute -bottom-6 w-24 text-center hidden sm:block",
                        isActive ? "text-blue-600" : "text-gray-400"
                      )}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 relative sm:mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  {/* STEP 1: SERVICE */}
                  {step === 1 && (
                    <div className="flex flex-col h-full">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Select a Service</h3>
                      <p className="text-gray-500 text-sm mb-6">Choose the medical service you need.</p>
                      
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search services..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
                        />
                      </div>

                      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
                        {categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                              "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                              activeCategory === cat 
                                ? "bg-gray-900 text-white" 
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            )}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-2 pb-4">
                        {filteredServices.map(s => (
                          <div
                            key={s.id}
                            onClick={() => setServiceId(s.id)}
                            className={cn(
                              "p-4 rounded-xl border-2 cursor-pointer transition-all",
                              serviceId === s.id 
                                ? "border-blue-600 bg-blue-50" 
                                : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                            )}
                          >
                            <div className="font-semibold text-gray-900 mb-1">{s.name}</div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {s.duration} min
                              </span>
                              <span className="font-bold text-blue-600">₹{s.price}</span>
                            </div>
                          </div>
                        ))}
                        {filteredServices.length === 0 && (
                          <div className="col-span-full py-8 text-center text-gray-500">
                            No services found matching your search.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: DOCTOR */}
                  {step === 2 && (
                    <div className="flex flex-col h-full">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Select a Doctor</h3>
                      <p className="text-gray-500 text-sm mb-6">Choose your preferred healthcare provider for {selectedService?.name}.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {filteredDoctors.map(d => (
                          <div
                            key={d.id}
                            onClick={() => setDoctorId(d.id)}
                            className={cn(
                              "p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4",
                              doctorId === d.id 
                                ? "border-blue-600 bg-blue-50" 
                                : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                            )}
                          >
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
                              {d.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{d.name}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <Stethoscope className="w-3 h-3" /> {d.spec}
                              </div>
                            </div>
                          </div>
                        ))}
                        {filteredDoctors.length === 0 && (
                          <div className="col-span-full py-8 text-center text-gray-500">
                            No doctors available for this service.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: DATE & TIME */}
                  {step === 3 && (
                    <div className="flex flex-col h-full">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Pick Your Slot</h3>
                      <p className="text-gray-500 text-sm mb-6">Select a date and time for your appointment.</p>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="date"
                              min={format(new Date(), 'yyyy-MM-dd')}
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                        </div>

                        {date && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                              Available Slots for {format(new Date(date), 'MMM d, yyyy')}
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                              {availableSlots.map((slot) => (
                                <button
                                  key={slot.time}
                                  disabled={slot.booked}
                                  onClick={() => setTime(slot.time)}
                                  className={cn(
                                    "py-2.5 rounded-lg text-sm font-medium transition-all border focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    slot.booked 
                                      ? "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed line-through" 
                                      : time === slot.time
                                        ? "bg-blue-600 border-blue-600 text-white shadow-md"
                                        : "bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600"
                                  )}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: DETAILS */}
                  {step === 4 && (
                    <div className="flex flex-col h-full">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Your Details</h3>
                      <p className="text-gray-500 text-sm mb-6">Enter your contact information.</p>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              placeholder="John Doe"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address (Optional)</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              placeholder="john@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: PAYMENT */}
                  {step === 5 && (
                    <div className="flex flex-col h-full">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Payment Method</h3>
                      <p className="text-gray-500 text-sm mb-6">Select how you'd like to pay.</p>
                      
                      <div className="bg-blue-50 rounded-xl p-5 mb-6 flex justify-between items-center border border-blue-100">
                        <span className="text-blue-800 font-medium">Amount to Pay</span>
                        <span className="text-2xl font-bold text-blue-600">₹{selectedService?.price}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setPayment('cash')}
                          className={cn(
                            "p-6 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500",
                            payment === 'cash' 
                              ? "border-blue-600 bg-blue-50 text-blue-700" 
                              : "border-gray-200 hover:border-blue-300 text-gray-600"
                          )}
                        >
                          <Banknote className={cn("w-8 h-8", payment === 'cash' ? "text-blue-600" : "text-gray-400")} />
                          <div className="font-semibold">Cash at Clinic</div>
                        </button>
                        <button
                          onClick={() => setPayment('card')}
                          className={cn(
                            "p-6 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500",
                            payment === 'card' 
                              ? "border-blue-600 bg-blue-50 text-blue-700" 
                              : "border-gray-200 hover:border-blue-300 text-gray-600"
                          )}
                        >
                          <CreditCard className={cn("w-8 h-8", payment === 'card' ? "text-blue-600" : "text-gray-400")} />
                          <div className="font-semibold">Pay Online</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: CONFIRM */}
                  {step === 6 && (
                    <div className="flex flex-col h-full">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">Confirm Booking</h3>
                      <p className="text-gray-500 text-sm mb-6">Review your details before confirming.</p>
                      
                      <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
                        <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Service</div>
                            <div className="font-semibold text-gray-900">{selectedService?.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">Doctor</div>
                            <div className="font-semibold text-gray-900">{selectedDoctor?.name}</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Date & Time</div>
                            <div className="font-semibold text-gray-900">
                              {date ? format(new Date(date), 'MMM d, yyyy') : ''} at {time}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Patient Details</div>
                            <div className="font-semibold text-gray-900">{name}</div>
                            <div className="text-sm text-gray-600">{phone}</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <div className="text-gray-600 font-medium">Total Amount</div>
                          <div className="text-2xl font-bold text-blue-600">₹{selectedService?.price}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  disabled={loading}
                  className="px-6 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={loading}
                className="flex-1 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? 'Processing...' : step === 6 ? 'Confirm Booking' : 'Next Step'} 
                {!loading && step < 6 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
