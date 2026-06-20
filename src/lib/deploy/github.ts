const GITHUB_REPO_PATTERN =
  /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\/|$)/;

export type ParsedGithubRepo = {
  owner: string;
  repo: string;
  url: string;
};

export function parseGithubRepoUrl(url: string): ParsedGithubRepo | null {
  const match = url.match(GITHUB_REPO_PATTERN);
  if (!match?.[1] || !match?.[2]) {
    return null;
  }

  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, ""),
    url,
  };
}

export async function fetchLatestCommit(
  repo: ParsedGithubRepo,
  branch: string,
): Promise<{ sha: string; date: string } | null> {
  const token = process.env.GITHUB_TOKEN;
  const endpoint = `https://api.github.com/repos/${repo.owner}/${repo.repo}/commits/${encodeURIComponent(branch)}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "my-website-deploy-sync",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      sha: string;
      commit: { author: { date: string } };
    };

    return {
      sha: data.sha,
      date: data.commit.author.date,
    };
  } catch {
    return null;
  }
}
