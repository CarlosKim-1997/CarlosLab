"use client";

import { useMemo, useState } from "react";
import type {
  PublicMaturity,
  PublicThinkingType,
  ThinkingEntry,
} from "@/lib/thinking/types";

const typeLabels: Record<PublicThinkingType, string> = {
  idea: "Idea",
  insight: "Insight",
  principle: "Principle",
  hypothesis: "Hypothesis",
  system: "System / Project",
};

const maturityLabels: Record<PublicMaturity, string> = {
  seed: "Seed",
  developing: "Developing",
  adopted: "Adopted",
  validated: "Validated",
};

const PAGE_SIZE = 24;

export function ArchiveExplorer({ entries }: { entries: ThinkingEntry[] }) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("all");
  const [type, setType] = useState<PublicThinkingType | "all">("all");
  const [maturity, setMaturity] = useState<PublicMaturity | "all">("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "id">("newest");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const domains = useMemo(
    () => [...new Set(entries.map((entry) => entry.domain))].sort(),
    [entries],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");
    const result = entries.filter((entry) => {
      if (domain !== "all" && entry.domain !== domain) return false;
      if (type !== "all" && entry.type !== type) return false;
      if (maturity !== "all" && entry.maturity !== maturity) return false;
      if (!normalizedQuery) return true;
      return `${entry.id} ${entry.title} ${entry.summary}`
        .toLocaleLowerCase("ko-KR")
        .includes(normalizedQuery);
    });

    return result.toSorted((a, b) => {
      if (sort === "id") return a.id.localeCompare(b.id);
      const delta = a.firstSeen.localeCompare(b.firstSeen);
      return sort === "oldest" ? delta : -delta;
    });
  }, [domain, entries, maturity, query, sort, type]);

  const visible = filtered.slice(0, limit);

  function resetLimit() {
    setLimit(PAGE_SIZE);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-2xl border border-white/10 bg-zinc-900/35 p-4 md:grid-cols-2 xl:grid-cols-5">
        <label className="xl:col-span-2">
          <span className="sr-only">검색</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetLimit();
            }}
            placeholder="ID, 제목, 내용 검색"
            className="h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50"
          />
        </label>

        <select
          aria-label="도메인"
          value={domain}
          onChange={(event) => {
            setDomain(event.target.value);
            resetLimit();
          }}
          className="h-11 rounded-lg border border-white/10 bg-[#0b1019] px-3 text-sm text-zinc-300 outline-none focus:border-cyan-400/50"
        >
          <option value="all">모든 도메인</option>
          {domains.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          aria-label="유형"
          value={type}
          onChange={(event) => {
            setType(event.target.value as PublicThinkingType | "all");
            resetLimit();
          }}
          className="h-11 rounded-lg border border-white/10 bg-[#0b1019] px-3 text-sm text-zinc-300 outline-none focus:border-cyan-400/50"
        >
          <option value="all">모든 유형</option>
          {Object.entries(typeLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          aria-label="정렬"
          value={sort}
          onChange={(event) => setSort(event.target.value as typeof sort)}
          className="h-11 rounded-lg border border-white/10 bg-[#0b1019] px-3 text-sm text-zinc-300 outline-none focus:border-cyan-400/50"
        >
          <option value="newest">최근 순</option>
          <option value="oldest">오래된 순</option>
          <option value="id">ID 순</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-500">
        <p>{filtered.length.toLocaleString()}개 항목</p>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(maturityLabels) as [PublicMaturity, string][]).map(
            ([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setMaturity(maturity === value ? "all" : value);
                  resetLimit();
                }}
                className={`rounded-full border px-3 py-1.5 transition ${
                  maturity === value
                    ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                    : "border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                }`}
              >
                {label}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((entry) => (
          <article
            id={entry.id}
            key={entry.id}
            className="rounded-2xl border border-white/10 bg-zinc-900/25 p-5 transition hover:border-cyan-400/25 hover:bg-zinc-900/45"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-cyan-300">{entry.id}</span>
              <span className="rounded-full border border-white/10 px-2 py-1 text-zinc-500">
                {typeLabels[entry.type]}
              </span>
              <span className="rounded-full border border-white/10 px-2 py-1 text-zinc-500">
                {maturityLabels[entry.maturity]}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-100">{entry.title}</h3>
            <p className="mb-5 text-sm leading-6 text-zinc-400">{entry.summary}</p>
            <div className="flex items-end justify-between gap-3 text-xs text-zinc-600">
              <span>{entry.domain}</span>
              <time dateTime={entry.firstSeen}>{entry.firstSeen}</time>
            </div>
          </article>
        ))}
      </div>

      {visible.length < filtered.length && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setLimit((current) => current + PAGE_SIZE)}
            className="rounded-lg border border-white/10 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-cyan-400/30 hover:text-cyan-200"
          >
            더 보기 ({filtered.length - visible.length}개 남음)
          </button>
        </div>
      )}
    </div>
  );
}
