import { Button } from "@/components/ui/Button";

type DesktopDownloadPanelProps = {
  downloadUrl: string;
  warning?: string;
};

export function DesktopDownloadPanel({
  downloadUrl,
  warning,
}: DesktopDownloadPanelProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-8">
      <p className="mb-2 text-lg font-medium text-zinc-100">
        Windows 데스크톱 앱
      </p>
      <p className="mb-6 max-w-xl text-sm leading-relaxed text-zinc-400">
        브라우저 iframe으로는 Electron 앱을 돌릴 수 없습니다. 아래 설치 파일을
        받아 PC에서 실행하세요. Gmail OAuth 등 초기 설정은 앱 안에서 진행합니다.
      </p>
      {warning && (
        <p className="mb-6 text-sm text-amber-400/90">{warning}</p>
      )}
      <div className="flex flex-wrap gap-3">
        <Button href={downloadUrl} external>
          CalmMail Windows 다운로드
        </Button>
        <Button
          href="https://github.com/CarlosKim-1997/CalmMail/releases/latest"
          external
          variant="ghost"
        >
          릴리스 노트
        </Button>
      </div>
      <p className="mt-6 text-xs text-zinc-600">
        서명되지 않은 빌드라 Windows SmartScreen 경고가 뜰 수 있습니다.
      </p>
    </div>
  );
}
