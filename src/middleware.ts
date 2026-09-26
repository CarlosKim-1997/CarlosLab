import { NextResponse, type NextRequest } from "next/server";

const observedCrawlers = [
  { name: "OAI-SearchBot", category: "ai-search", pattern: /\bOAI-SearchBot\b/i },
  { name: "ChatGPT-User", category: "ai-user-fetch", pattern: /\bChatGPT-User\b/i },
  { name: "GPTBot", category: "ai-training", pattern: /\bGPTBot\b/i },
  { name: "ClaudeBot", category: "ai-search", pattern: /\bClaudeBot\b/i },
  { name: "Claude-User", category: "ai-user-fetch", pattern: /\bClaude-User\b/i },
  { name: "anthropic-ai", category: "ai-training", pattern: /\banthropic-ai\b/i },
  { name: "PerplexityBot", category: "ai-search", pattern: /\bPerplexityBot\b/i },
  { name: "Perplexity-User", category: "ai-user-fetch", pattern: /\bPerplexity-User\b/i },
  { name: "Googlebot", category: "search", pattern: /\bGooglebot\b/i },
  { name: "bingbot", category: "search", pattern: /\bbingbot\b/i },
] as const;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const crawler = observedCrawlers.find(({ pattern }) => pattern.test(userAgent));

  if (crawler) {
    console.info(
      "[crawler-observation]",
      JSON.stringify({
        crawler: crawler.name,
        category: crawler.category,
        path: request.nextUrl.pathname,
      }),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
