import {
  AGENT_DOC_ENDPOINTS,
  CLI_VERSION,
  DOCS_LAST_UPDATED,
  PROJECT_COMMITS_FEED_URL,
  PROJECT_RELEASES_FEED_URL,
  PROJECT_RELEASES_URL,
  SITE_URL,
} from '../../lib/site-meta';

export const prerender = true;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const now = new Date().toUTCString();
  const docsUpdatedAt = new Date(`${DOCS_LAST_UPDATED}T00:00:00Z`).toUTCString();
  const items = [
    {
      title: `RugbyClaw docs snapshot v${CLI_VERSION}`,
      link: `${SITE_URL}/docs/`,
      description: 'Human docs with stable machine-readable endpoints for AI agents.',
      pubDate: docsUpdatedAt,
      guid: `${SITE_URL}/docs/#v${CLI_VERSION}`,
    },
    {
      title: 'Agent manifest (JSON)',
      link: AGENT_DOC_ENDPOINTS.manifest,
      description: 'Current command/output contracts for personal AI agents.',
      pubDate: now,
      guid: AGENT_DOC_ENDPOINTS.manifest,
    },
    {
      title: 'Releases feed (Atom)',
      link: PROJECT_RELEASES_FEED_URL,
      description: `Canonical release stream. Human release page: ${PROJECT_RELEASES_URL}`,
      pubDate: now,
      guid: PROJECT_RELEASES_FEED_URL,
    },
    {
      title: 'Commits feed (Atom)',
      link: PROJECT_COMMITS_FEED_URL,
      description: 'Implementation-level updates from main branch commits.',
      pubDate: now,
      guid: PROJECT_COMMITS_FEED_URL,
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>RugbyClaw Docs Updates</title>
    <link>${SITE_URL}/docs/</link>
    <description>Agent-friendly docs updates and canonical release feeds for RugbyClaw.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    ${items
      .map(
        (item) => `<item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${escapeXml(item.pubDate)}</pubDate>
      <guid>${escapeXml(item.guid)}</guid>
    </item>`
      )
      .join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900',
    },
  });
}

