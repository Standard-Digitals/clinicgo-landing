import React, { useRef } from "react";
import { cn } from "@/src/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight, Play, CheckCircle2, Zap } from "lucide-react";
import { 
  motion, 
  useMotionValue, 
  useMotionTemplate, 
  useAnimationFrame 
} from "framer-motion";

export const TheInfiniteGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.5; 
  const speedY = 0.5;

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
      )}
    >
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div 
        className="absolute inset-0 z-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-orange-500/40 dark:bg-orange-600/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-blue-500/40 dark:bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 border border-blue-200/50 backdrop-blur-xl"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-blue-600 rounded-full"
          />
          <span className="text-sm font-semibold text-blue-600">
            WordPress Plugin for Clinics
          </span>
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-tight">
            Clinic Management<br/>Made Simple
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Clinic Go streamlines your clinic operations. Manage appointments, patients, billing, and more — all from your WordPress dashboard.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-slate-700">
          {[
            { icon: CheckCircle2, text: 'HIPAA Compliant' },
            { icon: Zap, text: 'Easy Setup' },
            { icon: CheckCircle2, text: '24/7 Support' }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-emerald-500" />
                {item.text}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all shadow-md active:scale-95"
          >
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-all active:scale-95">
            <Play className="w-5 h-5" /> Watch Demo
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-6 border-t border-slate-200/50">
          {[
            { value: '10K+', label: 'Active Users' },
            { value: '4.9★', label: 'Rating' },
            { value: '100%', label: 'Uptime' }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GridPattern = ({ offsetX, offsetY }: { offsetX: any, offsetY: any }) => {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground" 
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
};
