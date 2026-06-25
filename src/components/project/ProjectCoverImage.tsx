import Image from "next/image";

type ProjectCoverImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function ProjectCoverImage({
  src,
  alt,
  priority = false,
}: ProjectCoverImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
