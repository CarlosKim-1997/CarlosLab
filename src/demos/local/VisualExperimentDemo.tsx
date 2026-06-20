"use client";

import { useEffect, useRef } from "react";

export function VisualExperimentDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;

    const draw = (time: number) => {
      frameRef.current = time * 0.001;
      const t = frameRef.current;

      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 24; i++) {
        const angle = t * 0.5 + (i / 24) * Math.PI * 2;
        const radius = 40 + Math.sin(t + i) * 20;
        const x = canvas.width / 2 + Math.cos(angle) * radius * (1 + i * 0.08);
        const y = canvas.height / 2 + Math.sin(angle) * radius * (1 + i * 0.08);
        const hue = (i * 15 + t * 40) % 360;

        ctx.beginPath();
        ctx.arc(x, y, 4 + (i % 3), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.85)`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="flex h-full min-h-[280px] items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        width={480}
        height={270}
        className="w-full max-w-xl rounded-lg border border-white/10"
      />
    </div>
  );
}
