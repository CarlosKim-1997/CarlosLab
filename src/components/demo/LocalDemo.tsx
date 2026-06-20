"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { getAspectRatioClass } from "@/lib/demo/demoModes";
import type { ProjectDemo } from "@/lib/project/types";

const localDemoRegistry: Record<string, ComponentType<Record<string, never>>> = {
  "visual-experiment": dynamic(
    () =>
      import("@/demos/local/VisualExperimentDemo").then(
        (mod) => mod.VisualExperimentDemo,
      ),
    { ssr: false },
  ),
  "interactive-maze": dynamic(
    () =>
      import("@/demos/local/InteractiveMazeDemo").then(
        (mod) => mod.InteractiveMazeDemo,
      ),
    { ssr: false },
  ),
};

type LocalDemoProps = {
  demo: Extract<ProjectDemo, { mode: "local-component" }>;
};

export function LocalDemo({ demo }: LocalDemoProps) {
  const aspectClass = getAspectRatioClass(demo.aspectRatio);
  const DemoComponent = localDemoRegistry[demo.componentKey];

  if (!DemoComponent) {
    return (
      <div className="rounded-xl border border-dashed border-amber-500/40 bg-amber-950/20 p-8 text-center">
        <p className="text-amber-300">
          로컬 데모 &quot;{demo.componentKey}&quot;가 등록되지 않았습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {demo.warning && (
        <p className="text-sm text-amber-400/90">{demo.warning}</p>
      )}
      <div
        className={`relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950 ${aspectClass}`}
      >
        <DemoComponent />
      </div>
    </div>
  );
}
