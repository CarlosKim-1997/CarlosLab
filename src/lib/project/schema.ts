import { z } from "zod";

export const projectStatusSchema = z.enum([
  "idea",
  "prototype",
  "active",
  "archived",
]);

export const projectKindSchema = z.enum([
  "web",
  "ai",
  "tool",
  "game",
  "visual",
  "research",
  "system",
  "other",
]);

export const demoAspectRatioSchema = z.enum(["16/9", "4/3", "mobile", "full"]);

export const projectDemoSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("none"),
    warning: z.string().optional(),
  }),
  z.object({
    mode: z.literal("video"),
    videoUrl: z.string().min(1),
    posterUrl: z.string().optional(),
    aspectRatio: demoAspectRatioSchema.optional(),
    warning: z.string().optional(),
  }),
  z.object({
    mode: z.literal("iframe"),
    url: z.string().url(),
    aspectRatio: demoAspectRatioSchema.optional(),
    warning: z.string().optional(),
  }),
  z.object({
    mode: z.literal("local-component"),
    componentKey: z.string().min(1),
    aspectRatio: demoAspectRatioSchema.optional(),
    warning: z.string().optional(),
  }),
  z.object({
    mode: z.literal("sandbox"),
    sandboxKey: z.string().optional(),
    aspectRatio: demoAspectRatioSchema.optional(),
    warning: z.string().optional(),
  }),
]);

export const projectLinksSchema = z.object({
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  article: z.string().url().optional(),
  video: z.string().url().optional(),
});

export const projectMediaSchema = z.object({
  cover: z.string().min(1),
  og: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
});

export const projectDeploySchema = z
  .object({
    enabled: z.boolean().optional(),
    branch: z.string().min(1).optional(),
    hookUrl: z.string().url().optional(),
    hookEnvKey: z.string().min(1).optional(),
  })
  .optional();

export const projectMetaSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  status: projectStatusSchema,
  kind: projectKindSchema,
  year: z.number().int().min(2000).max(2100),
  summary: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
  highlights: z.array(z.string()).min(1),
  stack: z.array(z.string()).min(1),
  links: projectLinksSchema,
  demo: projectDemoSchema,
  media: projectMediaSchema,
  visibility: z.enum(["public", "hidden", "draft"]),
  featured: z.boolean().optional(),
  priority: z.number().int(),
  deploy: projectDeploySchema,
  demoNote: z.string().optional(),
});

export function parseProjectMeta(data: unknown) {
  return projectMetaSchema.parse(data);
}
