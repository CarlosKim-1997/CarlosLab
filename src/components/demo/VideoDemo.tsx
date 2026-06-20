"use client";

import { getAspectRatioClass } from "@/lib/demo/demoModes";
import type { ProjectDemo } from "@/lib/project/types";

type VideoDemoProps = {
  demo: Extract<ProjectDemo, { mode: "video" }>;
};

export function VideoDemo({ demo }: VideoDemoProps) {
  const aspectClass = getAspectRatioClass(demo.aspectRatio);

  return (
    <div className="space-y-3">
      {demo.warning && (
        <p className="text-sm text-amber-400/90">{demo.warning}</p>
      )}
      <div
        className={`relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950 ${aspectClass}`}
      >
        <video
          src={demo.videoUrl}
          poster={demo.posterUrl}
          controls
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          브라우저가 video 태그를 지원하지 않습니다.
        </video>
      </div>
    </div>
  );
}
