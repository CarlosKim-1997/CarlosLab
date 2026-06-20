export type ProjectStatus = "idea" | "prototype" | "active" | "archived";

export type ProjectKind =
  | "web"
  | "ai"
  | "tool"
  | "game"
  | "visual"
  | "research"
  | "system"
  | "other";

export type DemoMode =
  | "none"
  | "video"
  | "iframe"
  | "local-component"
  | "sandbox";

export type DemoAspectRatio = "16/9" | "4/3" | "mobile" | "full";

export type ProjectDemo =
  | {
      mode: "none";
      warning?: string;
    }
  | {
      mode: "video";
      videoUrl: string;
      posterUrl?: string;
      aspectRatio?: DemoAspectRatio;
      warning?: string;
    }
  | {
      mode: "iframe";
      url: string;
      aspectRatio?: DemoAspectRatio;
      warning?: string;
    }
  | {
      mode: "local-component";
      componentKey: string;
      aspectRatio?: DemoAspectRatio;
      warning?: string;
    }
  | {
      mode: "sandbox";
      sandboxKey?: string;
      aspectRatio?: DemoAspectRatio;
      warning?: string;
    };

export type ProjectLinks = {
  github?: string;
  demo?: string;
  article?: string;
  video?: string;
};

export type ProjectMedia = {
  cover: string;
  og?: string;
  screenshots?: string[];
  videos?: string[];
};

export type ProjectDeployConfig = {
  enabled?: boolean;
  branch?: string;
  hookUrl?: string;
  hookEnvKey?: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  kind: ProjectKind;
  year: number;

  summary: string;
  problem: string;
  solution: string;
  highlights: string[];

  stack: string[];
  links: ProjectLinks;
  demo: ProjectDemo;
  media: ProjectMedia;

  visibility: "public" | "hidden" | "draft";
  featured?: boolean;
  priority: number;
  deploy?: ProjectDeployConfig;
};

export type Project = ProjectMeta & {
  content: string;
};
