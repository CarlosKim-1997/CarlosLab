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
          "웹 데모는 아직 없습니다. 아래 GitHub에서 코드를 볼 수 있습니다."}
      </p>
    </div>
  );
}
