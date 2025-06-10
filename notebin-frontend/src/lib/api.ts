const BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function api<T>(
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
