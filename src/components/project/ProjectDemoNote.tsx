type ProjectDemoNoteProps = {
  note: string;
};

export function ProjectDemoNote({ note }: ProjectDemoNoteProps) {
  return (
    <div className="rounded-xl border border-amber-500/25 bg-amber-950/20 px-5 py-4">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-amber-300/90">
        웹 시연 안내
      </p>
      <p className="text-sm leading-relaxed text-amber-100/90">{note}</p>
    </div>
  );
}
