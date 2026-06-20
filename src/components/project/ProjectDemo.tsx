import { IframeDemo } from "@/components/demo/IframeDemo";
import { VideoDemo } from "@/components/demo/VideoDemo";
import { LocalDemo } from "@/components/demo/LocalDemo";
import { SandboxDemoPlaceholder } from "@/components/demo/SandboxDemoPlaceholder";
import { DemoUnavailable } from "@/components/demo/DemoUnavailable";
import { Button } from "@/components/ui/Button";
import type { ProjectDemo as ProjectDemoType, ProjectLinks } from "@/lib/project/types";

type ProjectDemoProps = {
  demo: ProjectDemoType;
  links: ProjectLinks;
};

export function ProjectDemo({ demo, links }: ProjectDemoProps) {
  let demoContent: React.ReactNode;

  switch (demo.mode) {
    case "iframe":
      demoContent = <IframeDemo demo={demo} />;
      break;
    case "video":
      demoContent = <VideoDemo demo={demo} />;
      break;
    case "local-component":
      demoContent = <LocalDemo demo={demo} />;
      break;
    case "sandbox":
      demoContent = <SandboxDemoPlaceholder demo={demo} />;
      break;
    case "none":
    default:
      demoContent = <DemoUnavailable demo={demo} />;
      break;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-400">
          체험하기
        </h2>
        <div className="flex flex-wrap gap-2">
          {links.demo && (
            <Button href={links.demo} external variant="secondary">
              데모 열기
            </Button>
          )}
          {links.github && (
            <Button href={links.github} external variant="ghost">
              GitHub
            </Button>
          )}
        </div>
      </div>
      {demoContent}
    </section>
  );
}
