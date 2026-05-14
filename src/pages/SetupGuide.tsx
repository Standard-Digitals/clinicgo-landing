import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ChevronDown, Check, Copy, ExternalLink, 
  Database, Calendar, Users, FileText, Settings, Mail
} from 'lucide-react';

interface Step {
  title: string;
  content: React.ReactNode;
}

export default function SetupGuide() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections: Step[] = [
    {
      title: 'Install Clinic Go',
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900">Installation Steps</h4>
          <ol className="list-decimal list-inside space-y-2 text-slate-600 ml-2">
            <li>Download the Clinic Go package from your account</li>
            <li>Extract the ZIP file to your server</li>
            <li>Run the installation script</li>
            <li>Follow the setup wizard</li>
          </ol>
        </div>
      ),
    },
    {
      title: 'Activate License',
      content: (
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-slate-600">
            <li>Go to Clinic Go → License in your admin panel</li>
            <li>Enter your license key (get it from your <Link to="/account" className="text-blue-600 hover:underline">account dashboard</Link>)</li>
            <li>Click "Activate License"</li>
            <li>You'll see a success message when activated</li>
          </ol>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Your license is domain-based. Each license key works on one domain only.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Add Doctors',
      content: (
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-slate-600">
            <li>Go to Clinic Go → Doctors in your admin</li>
            <li>Click "Add New Doctor"</li>
            <li>Fill in the doctor details:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Name (e.g., Dr. John Smith)</li>
                <li>Specialization (e.g., General Medicine)</li>
                <li>Photo (optional)</li>
                <li>Bio (optional)</li>
              </ul>
            </li>
            <li>Click "Save Doctor"</li>
            <li>Repeat for each doctor in your clinic</li>
          </ol>
        </div>
      ),
    },
    {
      title: 'Create Booking Calendars',
      content: (
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-slate-600">
            <li>Go to Clinic Go → Calendars</li>
            <li>Click "Add New Calendar"</li>
            <li>Configure calendar settings:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Select the doctor</li>
                <li>Set working hours (e.g., 9 AM to 5 PM)</li>
                <li>Set appointment duration (e.g., 30 minutes)</li>
                <li>Set days off (if any)</li>
              </ul>
            </li>
            <li>Click "Save Calendar"</li>
            <li>The calendar is now available for bookings</li>
          </ol>
        </div>
      ),
    },
    {
      title: 'Add Booking Form to Website',
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900">Method 1: Embed Code</h4>
          <div className="bg-slate-900 rounded-lg p-4">
            <code className="text-emerald-400 font-mono text-sm">&lt;clinic-go-booking&gt;&lt;/clinic-go-booking&gt;</code>
          </div>
          <p className="text-slate-600">Place this code on any page to show the booking form.</p>

          <h4 className="font-semibold text-slate-900 mt-6">Method 2: Direct Link</h4>
          <p className="text-slate-600">Share your booking page URL directly with patients.</p>
        </div>
      ),
    },
    {
      title: 'Configure Notifications',
      content: (
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-slate-600">
            <li>Go to Clinic Go → Settings → Notifications</li>
            <li>Configure email notifications:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><strong>Admin notifications:</strong> Get email when booking is made</li>
                <li><strong>Patient notifications:</strong> Confirmation email to patient</li>
                <li><strong>Reminder emails:</strong> Send reminder before appointment</li>
              </ul>
            </li>
            <li>Set up your email address in Settings → General</li>
            <li>Save settings</li>
          </ol>
        </div>
      ),
    },
    {
      title: 'Customize Booking Form',
      content: (
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-slate-600">
            <li>Go to Clinic Go → Settings → Form</li>
            <li>Customize form fields:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Patient name (required)</li>
                <li>Phone number (required)</li>
                <li>Email (optional)</li>
                <li>Notes (optional)</li>
              </ul>
            </li>
            <li>You can add custom fields too</li>
            <li>Save settings</li>
          </ol>
        </div>
      ),
    },
    {
      title: 'Troubleshooting',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-slate-900">Booking form not showing</h4>
            <ul className="list-disc list-inside text-slate-600 mt-1 ml-2">
              <li>Check the shortcode is correct</li>
              <li>Make sure the plugin is activated</li>
              <li>Check for JS errors in browser console</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Emails not being sent</h4>
            <ul className="list-disc list-inside text-slate-600 mt-1 ml-2">
              <li>Check email settings in plugin</li>
              <li>Check spam folder</li>
              <li>Verify WordPress can send emails</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Calendar not showing slots</h4>
            <ul className="list-disc list-inside text-slate-600 mt-1 ml-2">
              <li>Check working hours are set</li>
              <li>Verify calendar is published</li>
              <li>Check for date conflicts</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/account"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          ← Back to Account
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Setup Guide</h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Follow these steps to install and configure Clinic Go on your website.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {sections.map((section, index) => (
            <div key={index} className="border-b border-slate-100 last:border-b-0">
              <button
                onClick={() => toggleSection(index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    openSection === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-semibold text-slate-900">{section.title}</span>
                </div>
                {openSection === index ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              {openSection === index && (
                <div className="px-6 pb-6 pt-0 pl-[5.5rem] text-slate-600">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-600 mb-4">Need more help?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Contact Support <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}