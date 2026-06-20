import { Badge } from "@/components/ui/Badge";
import type { ProjectMeta } from "@/lib/project/types";

type ProjectStackProps = {
  stack: ProjectMeta["stack"];
};

export function ProjectStack({ stack }: ProjectStackProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <Badge key={tech}>{tech}</Badge>
      ))}
    </div>
  );
}
