# Carlos Lab — Interactive Project Lab

Next.js 포트폴리오. 프로젝트마다 iframe·영상·임베드 데모를 붙일 수 있는 구조입니다.

**Repo**: https://github.com/CarlosKim-1997/CarlosLab

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run validate:content` | Validate project metadata and content |
| `npm run create:project -- <slug>` | Scaffold a new project |
| `npm run check:demo-links` | List iframe/demo URLs to verify |

## Add a project

1. Run `npm run create:project -- my-new-project`
2. Edit `src/content/projects/my-new-project/meta.ts`
3. Write `src/content/projects/my-new-project/index.mdx`
4. Add assets under `public/media/projects/my-new-project/`
5. Run `npm run validate:content`

## Architecture

- **Content**: `src/content/projects/[slug]/meta.ts` + `index.mdx`
- **Loading**: `src/lib/content/*`
- **Demo abstraction**: `src/components/project/ProjectDemo.tsx`
- **Local demos**: register keys in `src/components/demo/LocalDemo.tsx`
- **Deploy pre-warm**: `/lab` 페이지 또는 `npm run sync:deploys`

## Deploy pre-warm (GitHub ↔ demo cache)

1. `meta.ts`에 `links.github` + iframe `demo.url` 설정
2. `deploy.hookEnvKey` 로 `.env.local` 의 Vercel hook 연결
3. `/lab` 에서 **상태 검사** 또는 **검사 + 배포 트리거** 클릭

```bash
npm run sync:deploys           # 검사만
npm run sync:deploys -- --deploy  # stale/missing 시 hook POST
```

## Vercel 배포

1. [Vercel](https://vercel.com) → **Add New Project** → `CarlosKim-1997/CarlosLab` import
2. Framework: **Next.js** (자동 감지)
3. Environment Variable: `NEXT_PUBLIC_SITE_URL` = 배포 URL (예: `https://carlos-lab.vercel.app`)
4. Deploy

CLI:

```bash
npx vercel login
npx vercel --prod
```
