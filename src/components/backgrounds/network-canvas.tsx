"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { clamp, cn, lerp } from "@/lib/utils";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type Packet = {
  edge: number;
  t: number;
  speed: number;
};

type Edge = { a: number; b: number; dist: number };

type NetworkCanvasProps = {
  className?: string;
  /** Approximate nodes per 100k px². Keep low for subtlety. */
  density?: number;
  /** Overall opacity of the whole layer. */
  opacity?: number;
};

const ACCENT = "94, 149, 255"; // rgb of the premium blue
const LINE = "120, 132, 156";
const PARALLAX = 18; // max px the field drifts toward the cursor
const CURSOR_LINK_DIST = 170;

/**
 * A quiet, self-contained network graph rendered to canvas: drifting nodes,
 * proximity edges, packets flowing along links, and a cursor that softly
 * "connects" to nearby nodes with a gentle parallax drift — services
 * exchanging messages, and a system that reacts to you. Pauses off-screen
 * and respects reduced motion.
 */
export function NetworkCanvas({
  className,
  density = 0.9,
  opacity = 1,
}: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let packets: Packet[] = [];
    let raf = 0;
    let running = true;
    let lastTime = performance.now();

    const mouse = { x: -9999, y: -9999, active: false };
    const offset = { x: 0, y: 0 };

    const linkDistance = () => Math.min(200, Math.max(120, width / 8));

    const build = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const count = Math.round((area / 100000) * density);
      const target = Math.max(14, Math.min(56, count));

      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.1 + 0.7,
      }));

      computeEdges();
      seedPackets();
    };

    const computeEdges = () => {
      edges = [];
      const max = linkDistance();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < max) edges.push({ a: i, b: j, dist });
        }
      }
    };

    const seedPackets = () => {
      if (edges.length === 0 || reducedMotion) {
        packets = [];
        return;
      }
      const packetCount = Math.max(3, Math.min(10, Math.round(edges.length / 14)));
      packets = Array.from({ length: packetCount }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.12 + Math.random() * 0.22,
      }));
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);
      const max = linkDistance();

      // Gentle parallax toward the cursor.
      if (!reducedMotion) {
        const targetX = mouse.active ? clamp((mouse.x - width / 2) / width, -0.5, 0.5) : 0;
        const targetY = mouse.active ? clamp((mouse.y - height / 2) / height, -0.5, 0.5) : 0;
        offset.x = lerp(offset.x, targetX * PARALLAX, 0.05);
        offset.y = lerp(offset.y, targetY * PARALLAX, 0.05);
      }

      ctx.save();
      ctx.translate(offset.x, offset.y);

      if (!reducedMotion) {
        for (const n of nodes) {
          n.x += n.vx * dt * 0.06;
          n.y += n.vy * dt * 0.06;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
          n.y = Math.max(0, Math.min(height, n.y));
        }
        computeEdges();
      }

      // edges
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const alpha = (1 - e.dist / max) * 0.5;
        ctx.strokeStyle = `rgba(${LINE}, ${alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${LINE}, 0.55)`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // packets
      if (!reducedMotion) {
        for (const p of packets) {
          const e = edges[p.edge];
          if (!e) {
            p.edge = Math.floor(Math.random() * Math.max(1, edges.length));
            p.t = 0;
            continue;
          }
          p.t += (p.speed * dt) / 1000;
          if (p.t >= 1) {
            p.t = 0;
            p.edge = Math.floor(Math.random() * edges.length);
            continue;
          }
          const a = nodes[e.a];
          const b = nodes[e.b];
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;

          const glow = ctx.createRadialGradient(x, y, 0, x, y, 6);
          glow.addColorStop(0, `rgba(${ACCENT}, 0.9)`);
          glow.addColorStop(1, `rgba(${ACCENT}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(${ACCENT}, 1)`;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // cursor "connects" to the nearest nodes
      if (mouse.active && !reducedMotion) {
        const fx = mouse.x - offset.x;
        const fy = mouse.y - offset.y;
        for (const n of nodes) {
          const d = Math.hypot(n.x - fx, n.y - fy);
          if (d < CURSOR_LINK_DIST) {
            const alpha = (1 - d / CURSOR_LINK_DIST) * 0.5;
            ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(fx, fy);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
        const halo = ctx.createRadialGradient(fx, fy, 0, fx, fy, 10);
        halo.addColorStop(0, `rgba(${ACCENT}, 0.55)`);
        halo.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(fx, fy, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const loop = (time: number) => {
      const dt = Math.min(48, time - lastTime);
      lastTime = time;
      if (running) draw(dt);
      raf = requestAnimationFrame(loop);
    };

    build();

    if (reducedMotion) {
      // Render a single static frame — no animation loop.
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => build();
    window.addEventListener("resize", onResize);

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouse.x = x;
      mouse.y = y;
      mouse.active = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
    };
    const onPointerLeave = () => {
      mouse.active = false;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onPointerLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, [density, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
    />
  );
}
