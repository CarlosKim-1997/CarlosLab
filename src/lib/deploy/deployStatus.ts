import fs from "fs";
import path from "path";
import type { DeployStatusStore } from "./types";

const STATUS_PATH = path.join(process.cwd(), "data/deploy-status.json");
const TMP_STATUS_PATH = path.join("/tmp", "my-website-deploy-status.json");

function emptyStore(): DeployStatusStore {
  return { updatedAt: new Date().toISOString(), projects: {} };
}

export function loadDeployStatusStore(): DeployStatusStore {
  for (const filePath of [STATUS_PATH, TMP_STATUS_PATH]) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(raw) as DeployStatusStore;
      }
    } catch {
      continue;
    }
  }

  return emptyStore();
}

export function saveDeployStatusStore(store: DeployStatusStore): {
  ok: boolean;
  path: string | null;
  note: string | null;
} {
  store.updatedAt = new Date().toISOString();

  for (const filePath of [STATUS_PATH, TMP_STATUS_PATH]) {
    try {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(store, null, 2), "utf-8");
      return {
        ok: true,
        path: filePath,
        note:
          filePath === TMP_STATUS_PATH
            ? "상태가 /tmp에 저장되었습니다. 인스턴스 재시작 시 초기화될 수 있습니다."
            : null,
      };
    } catch {
      continue;
    }
  }

  return {
    ok: false,
    path: null,
    note: "상태 파일 저장 실패 — 이번 검사 결과만 표시됩니다.",
  };
}
