import type { ProjectMedia } from "@/lib/project/types";

type ProjectGalleryProps = {
  media: ProjectMedia;
  title: string;
};

function GalleryPlaceholder({ index, slug }: { index: number; slug: string }) {
  const hue = (slug.charCodeAt(0) + index * 40) % 360;

  return (
    <div
      className="aspect-video rounded-lg border border-white/10"
      style={{
        backgroundImage: `linear-gradient(160deg, hsl(${hue}, 35%, 14%), hsl(${(hue + 50) % 360}, 40%, 24%))`,
      }}
      aria-hidden
    />
  );
}

export function ProjectGallery({ media, title }: ProjectGalleryProps) {
  const screenshots = media.screenshots ?? [];

  if (screenshots.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400">
        갤러리
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {screenshots.map((path, index) => (
          <figure key={path} className="space-y-2">
            <GalleryPlaceholder index={index} slug={title} />
            <figcaption className="truncate text-xs text-zinc-600">{path}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
