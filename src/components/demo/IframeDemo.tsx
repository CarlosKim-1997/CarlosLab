"use client";

import { getAspectRatioClass } from "@/lib/demo/demoModes";
import type { ProjectDemo } from "@/lib/project/types";

type IframeDemoProps = {
  demo: Extract<ProjectDemo, { mode: "iframe" }>;
};

export function IframeDemo({ demo }: IframeDemoProps) {
  const aspectClass = getAspectRatioClass(demo.aspectRatio);

  return (
    <div className="space-y-3">
      {demo.warning && (
        <p className="text-sm text-amber-400/90">{demo.warning}</p>
      )}
      <div
        className={`relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950 ${aspectClass}`}
      >
        <iframe
          src={demo.url}
          title="프로젝트 데모"
          className="absolute inset-0 h-full w-full"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          loading="lazy"
        />
      </div>
      <p className="text-sm text-zinc-500">
        데모가 로드되지 않나요?{" "}
        <a
          href={demo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300"
        >
          새 탭에서 열기 →
        </a>
      </p>
    </div>
  );
}
