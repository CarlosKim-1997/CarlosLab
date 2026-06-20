import aiWorkflowOrchestratorMeta from "@/content/projects/ai-workflow-orchestrator/meta";
import bobkinatorMeta from "@/content/projects/bobkinator/meta";
import calmmailMeta from "@/content/projects/calmmail/meta";
import secureHybridRagMeta from "@/content/projects/secure-hybrid-rag-enterprise-assistant/meta";
import type { ProjectMeta } from "@/lib/project/types";

/** Central registry — create-project script appends new imports here. */
export const projectMetaEntries: ProjectMeta[] = [
  aiWorkflowOrchestratorMeta,
  calmmailMeta,
  secureHybridRagMeta,
  bobkinatorMeta,
];
