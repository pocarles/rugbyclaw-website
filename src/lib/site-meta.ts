export const SITE_URL = 'https://rugbyclaw.com';
export const CLI_VERSION = '0.1.10';
export const DOCS_LAST_UPDATED = '2026-02-21';

export const PROJECT_REPO_URL = 'https://github.com/pocarles/rugbyclaw';
export const PROJECT_RELEASES_URL = `${PROJECT_REPO_URL}/releases`;
export const PROJECT_CHANGELOG_URL = `${PROJECT_REPO_URL}/blob/main/CHANGELOG.md`;
export const PROJECT_DOCS_URL = `${PROJECT_REPO_URL}/tree/main/docs`;
export const PROJECT_RELEASES_FEED_URL = `${PROJECT_REPO_URL}/releases.atom`;
export const PROJECT_COMMITS_FEED_URL = `${PROJECT_REPO_URL}/commits/main.atom`;

export const AGENT_DOC_ENDPOINTS = {
  llmsIndex: `${SITE_URL}/llms.txt`,
  llmsFull: `${SITE_URL}/llms-full.txt`,
  manifest: `${SITE_URL}/docs/agent.json`,
  updatesFeed: `${SITE_URL}/docs/updates.xml`,
} as const;

export const AGENT_COMMANDS = [
  { name: 'start', usage: 'rugbyclaw start [--guided|--yes]' },
  { name: 'config', usage: 'rugbyclaw config' },
  { name: 'scores', usage: 'rugbyclaw scores [--json|--agent]' },
  { name: 'fixtures', usage: 'rugbyclaw fixtures [league] [--json|--agent]' },
  { name: 'results', usage: 'rugbyclaw results [league] [--json|--agent]' },
  { name: 'team', usage: 'rugbyclaw team search|next|last <name> [--json|--agent]' },
  { name: 'calendar', usage: 'rugbyclaw calendar <matchId> [--out|--stdout]' },
  { name: 'doctor', usage: 'rugbyclaw doctor [--json|--agent]' },
  { name: 'status', usage: 'rugbyclaw status [--json|--agent]' },
  { name: 'openclaw init', usage: 'rugbyclaw openclaw init [--json|--agent]' },
] as const;

export function buildLlmsText(full = false): string {
  const lines = [
    '# RugbyClaw',
    '',
    '> Rugby Union CLI + OpenClaw skill for scores, fixtures, results, and automation-safe output.',
    '',
    `Version: ${CLI_VERSION}`,
    `Last-Updated: ${DOCS_LAST_UPDATED}`,
    '',
    '## Canonical Documentation',
    `- Docs home: ${SITE_URL}/docs/`,
    `- GitHub docs source: ${PROJECT_DOCS_URL}`,
    `- Changelog: ${PROJECT_CHANGELOG_URL}`,
    `- Releases: ${PROJECT_RELEASES_URL}`,
    '',
    '## Agent Endpoints',
    `- llms index: ${AGENT_DOC_ENDPOINTS.llmsIndex}`,
    `- llms full: ${AGENT_DOC_ENDPOINTS.llmsFull}`,
    `- manifest json: ${AGENT_DOC_ENDPOINTS.manifest}`,
    `- docs updates feed: ${AGENT_DOC_ENDPOINTS.updatesFeed}`,
    '',
    '## Feeds',
    `- releases atom: ${PROJECT_RELEASES_FEED_URL}`,
    `- commits atom: ${PROJECT_COMMITS_FEED_URL}`,
    '',
    '## Runtime Contracts',
    '- Use `--json` for structured output.',
    '- Use `--agent` for one-line envelopes: ok, exit_code, error_type, data, trace_id.',
  ];

  if (full) {
    lines.push('', '## Commands');
    for (const command of AGENT_COMMANDS) {
      lines.push(`- ${command.usage}`);
    }
    lines.push(
      '',
      '## Documentation Standards',
      '- Keep a Changelog structure for releases.',
      '- SemVer versioning.',
      '- Stable URLs for machine-readable docs.',
      '- GitHub is source of truth for code and release history.'
    );
  }

  return `${lines.join('\n')}\n`;
}
