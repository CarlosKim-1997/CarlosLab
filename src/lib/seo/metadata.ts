import type { Metadata } from "next";
import type { ProjectMeta } from "@/lib/project/types";

const SITE_NAME = "프로젝트 랩";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const DEFAULT_DESCRIPTION =
  "브라우저에서 직접 체험하는 인터랙티브 프로젝트 뮤지엄.";

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
