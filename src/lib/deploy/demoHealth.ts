export async function checkDemoUrlReachable(
  url: string,
  timeoutMs = 8000,
): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
      next: { revalidate: 0 },
    });

    return response.status >= 200 && response.status < 400;
  } catch {
    try {
      const response = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        redirect: "follow",
        next: { revalidate: 0 },
      });
      return response.status >= 200 && response.status < 400;
    } catch {
      return false;
    }
  } finally {
    clearTimeout(timer);
  }
}

export async function triggerDeployHook(hookUrl: string): Promise<{
  ok: boolean;
  message: string;
}> {
  try {
    const response = await fetch(hookUrl, {
      method: "POST",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return {
        ok: false,
        message: `Deploy hook failed (${response.status})`,
      };
    }

    return { ok: true, message: "Deploy hook triggered." };
  } catch (error) {
    return {
      ok: false,
      message: `Deploy hook error: ${String(error)}`,
    };
  }
}
