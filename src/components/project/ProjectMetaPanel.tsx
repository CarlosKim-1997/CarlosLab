import type { ProjectMeta } from "@/lib/project/types";

type ProjectMetaPanelProps = {
  project: Pick<ProjectMeta, "problem" | "solution" | "highlights">;
};

export function ProjectMetaPanel({ project }: ProjectMetaPanelProps) {
  return (
    <section className="grid gap-6 rounded-xl border border-white/10 bg-zinc-900/40 p-6 md:grid-cols-3">
      <div>
        <h2 className="mb-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
          문제
        </h2>
        <p className="text-sm leading-relaxed text-zinc-300">{project.problem}</p>
      </div>
      <div>
        <h2 className="mb-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
          해결
        </h2>
        <p className="text-sm leading-relaxed text-zinc-300">{project.solution}</p>
      </div>
      <div>
        <h2 className="mb-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
          하이라이트
        </h2>
        <ul className="space-y-2">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-zinc-300">
              <span className="text-cyan-400">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
