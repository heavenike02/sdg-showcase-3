"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";

interface MapProps {
  countryPoints?: Array<{ lat: number; lng: number; name: string }>;
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  showLabels?: boolean;
}

export function WorldMap({
  countryPoints = [],
  dots = [],
  lineColor = "#0ea5e9",
  showLabels = false,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const controls = useAnimation();

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white",
  });

  // Start the continuous animation sequence
  useEffect(() => {
    const startAnimation = async () => {
      // Start all animations with the "loop" variant
      // which will handle each line's timing internally
      controls.start("loop");
    };

    startAnimation();
  }, [controls]);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Calculate a custom delay for each line based on its position
  // This creates a more natural, non-uniform flow pattern
  const getCustomDelay = (index: number, total: number) => {
    // Base delay pattern using prime number spacing to avoid synchronization
    const baseDelays = [0, 1.1, 2.3, 0.7, 1.9, 1.3];
    
    // If we have more lines than base delays, use modulo to cycle
    const delay = baseDelays[index % baseDelays.length];
    
    // Add a slight variation based on line index for more randomness
    return delay + (index * 0.2);
  };

  return (
    <div className="w-full aspect-[2/1] dark:bg-black rounded-lg relative font-sans">
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const customDelay = getCustomDelay(i, dots.length);
          
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0.2 }}
                variants={{
                  loop: { 
                    pathLength: [0, 1, 1, 0],
                    opacity: [0.2, 1, 1, 0.2], 
                    transition: { 
                      duration: 4.5,
                      times: [0, 0.4, 0.6, 1],
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      // Each line gets its own delay pattern
                      delay: customDelay
                    }
                  }
                }}
                animate={controls}
                key={`path-connection-${i}`}
              ></motion.path>
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Render country points */}
        {countryPoints.map((point, i) => (
          <g key={`country-point-${i}`}>
            <circle
              cx={projectPoint(point.lat, point.lng).x}
              cy={projectPoint(point.lat, point.lng).y}
              r="2"
              fill={lineColor}
            />
            <circle
              cx={projectPoint(point.lat, point.lng).x}
              cy={projectPoint(point.lat, point.lng).y}
              r="2"
              fill={lineColor}
              opacity="0.5"
            >
              <animate
                attributeName="r"
                from="2"
                to="8"
                dur="1.5s"
                begin="0s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="1.5s"
                begin="0s"
                repeatCount="indefinite"
              />
            </circle>
            {showLabels && (
              <text
                x={projectPoint(point.lat, point.lng).x + 10}
                y={projectPoint(point.lat, point.lng).y + 5}
                fontSize="8"
                fill={theme === "dark" ? "white" : "black"}
                className="text-xs"
              >
                {point.name}
              </text>
            )}
          </g>
        ))}

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
