import type { Metadata } from "next";
import type { ProjectMeta } from "@/lib/project/types";

const SITE_NAME = "Carlos Lab";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const DEFAULT_DESCRIPTION =
  "만든 도구와 실험을 모아 둔 작업실. 설명과 함께, 되는 것은 브라우저에서 바로 확인할 수 있습니다.";

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
};

export function buildProjectMetadata(project: ProjectMeta): Metadata {
  const ogImage = project.media.og ?? project.media.cover;

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      images: [{ url: ogImage, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [ogImage],
    },
  };
}

export function buildPageMetadata(
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}
