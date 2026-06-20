import type { ProjectDemo } from "@/lib/project/types";

type DemoUnavailableProps = {
  demo: Extract<ProjectDemo, { mode: "none" }>;
};

export function DemoUnavailable({ demo }: DemoUnavailableProps) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900/40 p-8 text-center">
      <p className="text-lg font-medium text-zinc-300">라이브 데모 없음</p>
      <p className="mt-2 max-w-md text-sm text-zinc-500">
        {demo.warning ??
          "이 프로젝트는 스크린샷과 설명 위주로 제공됩니다. GitHub에서 실행할 수 있습니다."}
      </p>
    </div>
  );
}
