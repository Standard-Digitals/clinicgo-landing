"use client";
import { useState, useEffect, useRef, ElementType } from "react";
import type { MouseEvent } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  lightMode?: boolean;
}

export default function RadialOrbitalTimeline({
  timelineData,
  lightMode = false,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const bgColor = lightMode ? "bg-white" : "bg-black";
  const borderColor = lightMode ? "border-slate-300" : "border-white";
  const centerGradient = lightMode 
    ? "from-blue-400 via-indigo-500 to-purple-500" 
    : "from-purple-500 via-blue-500 to-teal-500";
  const nodeGradient = lightMode
    ? "from-blue-400 to-indigo-500"
    : "from-blue-500 to-purple-500";

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    if (lightMode) {
      switch (status) {
        case "completed":
          return "text-white bg-emerald-600 border-emerald-600";
        case "in-progress":
          return "text-white bg-blue-600 border-blue-600";
        case "pending":
          return "text-slate-700 bg-slate-200 border-slate-300";
        default:
          return "text-slate-700 bg-slate-200 border-slate-300";
      }
    }
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className={`w-full h-[70vh] flex flex-col items-center justify-center ${bgColor} overflow-hidden`}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className={`absolute w-16 h-16 rounded-full bg-gradient-to-br ${centerGradient} animate-pulse flex items-center justify-center z-10`}>
            <div className={`absolute w-20 h-20 rounded-full ${borderColor} border animate-ping opacity-70`}></div>
            <div
              className={`absolute w-24 h-24 rounded-full ${borderColor} border animate-ping opacity-50`}
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className={`w-8 h-8 rounded-full ${lightMode ? "bg-indigo-100" : "bg-white/80"} backdrop-blur-md`}></div>
          </div>

          <div className={`absolute w-96 h-96 rounded-full ${borderColor} border`}></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: lightMode
                      ? `radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)`
                      : `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? lightMode ? "bg-blue-600 text-white" : "bg-white text-black"
                      : isRelated
                      ? lightMode ? "bg-blue-200 text-blue-700" : "bg-white/50 text-black"
                      : lightMode ? "bg-slate-200 text-slate-700" : "bg-black text-white"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? lightMode ? "border-blue-600 shadow-lg shadow-blue-200" : "border-white shadow-lg shadow-white/30"
                      : isRelated
                      ? lightMode ? "border-blue-400 animate-pulse" : "border-white animate-pulse"
                      : lightMode ? "border-slate-300" : "border-white/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? lightMode ? "text-blue-600 scale-125" : "text-white scale-125" : lightMode ? "text-slate-600" : "text-white/70"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className={`absolute top-20 left-1/2 -translate-x-1/2 w-64 ${lightMode ? "bg-white" : "bg-black/90"} backdrop-blur-lg ${lightMode ? "border-slate-200" : "border-white/30"} border shadow-xl overflow-visible`}>
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 ${lightMode ? "bg-slate-300" : "bg-white/50"}`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span className={`text-xs font-mono ${lightMode ? "text-slate-500" : "text-white/50"}`}>
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className={`text-sm mt-2 ${lightMode ? "text-slate-900" : "text-white"}`}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={`text-xs ${lightMode ? "text-slate-600" : "text-white/80"}`}>
                      <p>{item.content}</p>

                      <div className={`mt-4 pt-3 border-t ${lightMode ? "border-slate-200" : "border-white/10"}`}>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className={`w-full h-1 rounded-full overflow-hidden ${lightMode ? "bg-slate-200" : "bg-white/10"}`}>
                          <div
                            className={`h-full bg-gradient-to-r ${nodeGradient}`}
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className={`mt-4 pt-3 border-t ${lightMode ? "border-slate-200" : "border-white/10"}`}>
                          <div className="flex items-center mb-2">
                            <Link size={10} className={`mr-1 ${lightMode ? "text-slate-500" : "text-white/70"}`} />
                            <h4 className={`text-xs uppercase tracking-wider font-medium ${lightMode ? "text-slate-600" : "text-white/70"}`}>
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className={`flex items-center h-6 px-2 py-0 text-xs rounded-none ${lightMode ? "border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900" : "border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white"} transition-all`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className={`ml-1 ${lightMode ? "text-slate-500" : "text-white/60"}`}
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
