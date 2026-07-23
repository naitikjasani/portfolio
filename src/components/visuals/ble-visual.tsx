"use client";

import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type Device = {
  id: string;
  x: number;
  y: number;
  rssi: number;
  band: "near" | "mid" | "far";
};

// Deterministic layout around the central scanner at (210, 170).
const CENTER = { x: 210, y: 170 };
const devices: Device[] = [
  { id: "d1:a4", x: 300, y: 96, rssi: -52, band: "near" },
  { id: "e7:2f", x: 116, y: 118, rssi: -61, band: "near" },
  { id: "b2:9c", x: 336, y: 196, rssi: -68, band: "mid" },
  { id: "9f:11", x: 96, y: 236, rssi: -74, band: "mid" },
  { id: "c3:80", x: 316, y: 276, rssi: -83, band: "far" },
];

const bandColor: Record<Device["band"], string> = {
  near: "hsl(var(--success))",
  mid: "hsl(var(--accent))",
  far: "hsl(var(--muted-foreground))",
};

/**
 * A BLE proximity map: a central scanner emitting signal rings, with nearby
 * devices ranked by RSSI. Reads as live infrastructure, not decoration.
 */
export function BleVisual() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative aspect-[4/3.4] w-full">
      <svg
        viewBox="0 0 420 360"
        className="h-full w-full"
        role="img"
        aria-label="Bluetooth proximity map with a central scanner and five nearby devices ranked by signal strength"
      >
        <defs>
          <radialGradient id="ble-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* static range rings */}
        {[70, 120, 168].map((r) => (
          <circle
            key={r}
            cx={CENTER.x}
            cy={CENTER.y}
            r={r}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={1}
            strokeDasharray="2 6"
          />
        ))}

        {/* emitted signal pulses */}
        {!reduced &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={CENTER.x}
              cy={CENTER.y}
              r={20}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth={1.5}
              initial={{ scale: 0.2, opacity: 0.6 }}
              animate={{ scale: 8.5, opacity: 0 }}
              transition={{
                duration: 4,
                delay: i * 1.33,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            />
          ))}

        {/* connections + devices */}
        {devices.map((d, i) => (
          <g key={d.id}>
            <line
              x1={CENTER.x}
              y1={CENTER.y}
              x2={d.x}
              y2={d.y}
              stroke={bandColor[d.band]}
              strokeWidth={1}
              strokeOpacity={0.28}
            />
            {/* traveling packet along the link */}
            {!reduced && (
              <motion.circle
                r={2.2}
                fill={bandColor[d.band]}
                initial={{ cx: CENTER.x, cy: CENTER.y, opacity: 0 }}
                animate={{
                  cx: [CENTER.x, d.x],
                  cy: [CENTER.y, d.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.2,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: "easeInOut",
                }}
              />
            )}
            <motion.circle
              cx={d.x}
              cy={d.y}
              r={5}
              fill="hsl(var(--background))"
              stroke={bandColor[d.band]}
              strokeWidth={1.5}
              initial={reduced ? false : { scale: 0.6, opacity: 0 }}
              whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              style={{ transformOrigin: `${d.x}px ${d.y}px` }}
            />
            <text
              x={d.x + 10}
              y={d.y - 6}
              className="fill-muted-foreground font-mono"
              fontSize="9"
            >
              {d.id}
            </text>
            <text
              x={d.x + 10}
              y={d.y + 6}
              className="font-mono"
              fill={bandColor[d.band]}
              fontSize="9"
            >
              {d.rssi} dBm
            </text>
          </g>
        ))}

        {/* central scanner */}
        <circle cx={CENTER.x} cy={CENTER.y} r={26} fill="url(#ble-core)" />
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={9}
          fill="hsl(var(--accent))"
          stroke="hsl(var(--background))"
          strokeWidth={2}
        />
        <text
          x={CENTER.x}
          y={CENTER.y + 44}
          textAnchor="middle"
          className="fill-foreground font-mono"
          fontSize="9"
        >
          scanner
        </text>
      </svg>

      {/* legend */}
      <div className="absolute bottom-2 left-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-2xs text-muted-foreground">
        <Legend color="hsl(var(--success))" label="near" />
        <Legend color="hsl(var(--accent))" label="mid" />
        <Legend color="hsl(var(--muted-foreground))" label="far" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
