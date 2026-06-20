import { syncAllProjects } from "../src/lib/deploy/syncProjects";

const triggerDeploy = process.argv.includes("--deploy");

async function main() {
  const summary = await syncAllProjects({ triggerDeploy });

  console.log(`\nDeploy sync (${triggerDeploy ? "check + deploy" : "check only"})`);
  console.log(`Checked at: ${summary.checkedAt}`);
  console.log(
    `Ready: ${summary.summary.ready}, Stale: ${summary.summary.stale}, Missing: ${summary.summary.missing}, Building: ${summary.summary.building}, Skipped: ${summary.summary.skipped}`,
  );

  if (triggerDeploy) {
    console.log(`Deploy hooks triggered: ${summary.summary.deploysTriggered}`);
  }

  for (const row of summary.results) {
    console.log(`\n[${row.status}] ${row.slug}`);
    console.log(`  ${row.message}`);
  }

  if (summary.persistenceNote) {
    console.log(`\nNote: ${summary.persistenceNote}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
