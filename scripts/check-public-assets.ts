/**
 * Smoke-check public assets (portfolio PDF + OG). Set BASE_URL or pass as argv.
 * Example: BASE_URL=https://your-domain npm run check:public-assets
 */
const base = process.argv[2] ?? process.env.BASE_URL ?? "http://localhost:3000";
const baseUrl = base.replace(/\/$/, "");

const paths = [
  "/downloads/kim-sung-ha-portfolio.pdf",
  "/og/carlos-lab.png",
  "/media/projects/calmmail/og.png",
];

async function check(pathname: string) {
  const url = baseUrl + pathname;
  const res = await fetch(url, { method: "HEAD", redirect: "follow" });
  const ok = res.ok;
  console.log(`${ok ? "OK" : "FAIL"} ${res.status} ${url}`);
  return ok;
}

async function main() {
  console.log("Base:", baseUrl);
  let failed = 0;
  for (const pathname of paths) {
    if (!(await check(pathname))) failed += 1;
  }
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(2);
});
