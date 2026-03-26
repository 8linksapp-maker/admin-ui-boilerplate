/**
 * GitHub CMS API helper.
 * Calls /api/admin/github on the host project.
 *
 * Supported actions: 'read' | 'write' | 'delete' | 'list'
 */
export async function githubApi(
  action: 'read' | 'write' | 'delete' | 'list',
  path: string,
  extra?: Record<string, unknown>,
): Promise<any> {
  const res = await fetch('/api/admin/github', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, path, ...extra }),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error((payload as any).error || `Error ${res.status} from API`);
  }

  return res.json();
}
