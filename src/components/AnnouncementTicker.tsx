import React from 'react';

const messages = [
  '🎉 ClinicGo is FREE until 31st August — Start managing your clinic smarter today 🚀',
  '💙 Appointments • Billing • Patients • WhatsApp • Inventory — All in One Platform ✨',
  '🌟 Introducing ClinicGo — All in One Platform ✨',
  '🔥 Limited Time Offer',
  '⚡ Scale Smarter. Heal Better. with ClinicGo',
];

const Sparkle = () => (
  <span className="inline-block mx-4 text-yellow-200 animate-pulse text-xs">✦</span>
);

const TickerContent = () => (
  <>
    {messages.map((msg, i) => (
      <React.Fragment key={i}>
        <span className="whitespace-nowrap font-semibold text-sm tracking-wide">{msg}</span>
        <Sparkle />
      </React.Fragment>
    ))}
  </>
);

export const AnnouncementTicker = () => (
  <div className="fixed top-0 left-0 right-0 z-[60] h-[42px] flex items-center overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 backdrop-blur-md border-b border-white/10 shadow-sm hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-shadow">
    <div className="ticker-track flex items-center text-white">
      <TickerContent />
      <TickerContent />
    </div>
    <style>{`
      .ticker-track {
        animation: ticker 35s linear infinite;
        width: max-content;
      }
      @keyframes ticker {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </div>
);
