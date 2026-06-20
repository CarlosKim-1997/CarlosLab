"use server";

import { syncAllProjects } from "@/lib/deploy/syncProjects";
import type { DeploySyncSummary } from "@/lib/deploy/types";
export async function runDeploySync(): Promise<DeploySyncSummary> {
  return syncAllProjects({ triggerDeploy: true });
}

export async function checkDeployStatusOnly(): Promise<DeploySyncSummary> {
  return syncAllProjects({ triggerDeploy: false });
}
