import { getAspectRatioClass } from "@/lib/demo/demoModes";
import type { ProjectDemo } from "@/lib/project/types";

type SandboxDemoPlaceholderProps = {
  demo: Extract<ProjectDemo, { mode: "sandbox" }>;
};

export function SandboxDemoPlaceholder({ demo }: SandboxDemoPlaceholderProps) {
  const aspectClass = getAspectRatioClass(demo.aspectRatio ?? "16/9");

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-violet-500/40 bg-violet-950/20 p-8 text-center ${aspectClass}`}
    >
      <p className="text-lg font-medium text-violet-200">샌드박스 데모 준비 중</p>
      <p className="mt-2 max-w-md text-sm text-violet-300/70">
        Sandpack, WebContainers 등 커스텀 런너를 연결할 예정입니다.
        {demo.sandboxKey && (
          <>
            {" "}
            키: <code className="text-violet-200">{demo.sandboxKey}</code>
          </>
        )}
      </p>
    </div>
  );
}
