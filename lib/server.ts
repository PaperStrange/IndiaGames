import { env } from 'cloudflare:workers';
export function db() { if (!env.DB)
    throw new Error('Storage is temporarily unavailable.'); return env.DB; }
export function bucket() { if (!env.BUCKET)
    throw new Error('Document storage is temporarily unavailable.'); return env.BUCKET; }
// This deployment is owner-only, with authentication enforced at the Sites edge.
// Local preview has no identity headers and uses a distinct development record.
export function owner(request: Request) { return request.headers.get('oai-authenticated-user-id') || request.headers.get('oai-authenticated-user-email') || 'private-site-owner'; }
export function sameOrigin(request: Request) { const origin = request.headers.get('origin'); return !origin || origin === new URL(request.url).origin; }
export const error = (message: string, status = 500) => Response.json({ error: message }, { status });
