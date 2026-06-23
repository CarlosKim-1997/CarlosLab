import type { DemoMode, ProjectDemo } from "@/lib/project/types";

export const DEMO_MODES: DemoMode[] = [
  "none",
  "video",
  "iframe",
  "local-component",
  "sandbox",
];

export function isPlayableDemo(demo: ProjectDemo): boolean {
  return (
    demo.mode === "iframe" ||
    demo.mode === "local-component" ||
    demo.mode === "video"
  );
}

export function getAspectRatioClass(aspectRatio?: string): string {
  switch (aspectRatio) {
    case "4/3":
      return "aspect-[4/3]";
    case "mobile":
      return "aspect-[9/16] max-w-sm mx-auto";
    case "full":
      return "aspect-auto min-h-[400px]";
    case "16/9":
    default:
      return "aspect-video";
  }
}

/** Streamlit Cloud apps must use ?embed=true when loaded inside an iframe. */
export function normalizeIframeSrc(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;

    if (
      host === "share.streamlit.io" ||
      host.endsWith(".streamlit.app") ||
      host.endsWith(".streamlitapp.com")
    ) {
      if (
        !parsed.searchParams.has("embed") &&
        !parsed.searchParams.has("embedded")
      ) {
        parsed.searchParams.set("embed", "true");
      }
    }

    return parsed.toString();
  } catch {
    return url;
  }
}
