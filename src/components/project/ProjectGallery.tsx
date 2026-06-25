import Image from "next/image";
import type { ProjectMedia } from "@/lib/project/types";

type ProjectGalleryProps = {
  media: ProjectMedia;
  title: string;
};

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
        {screenshots.map((path) => (
          <figure key={path} className="space-y-2">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10">
              <Image
                src={path}
                alt={`${title} 스크린샷`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
