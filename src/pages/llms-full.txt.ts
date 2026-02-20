import { buildLlmsText } from '../lib/site-meta';

export const prerender = true;

export function GET() {
  return new Response(buildLlmsText(true), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=900',
    },
  });
}

