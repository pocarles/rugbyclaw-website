import {
  AGENT_COMMANDS,
  AGENT_DOC_ENDPOINTS,
  CLI_VERSION,
  DOCS_LAST_UPDATED,
  PROJECT_CHANGELOG_URL,
  PROJECT_COMMITS_FEED_URL,
  PROJECT_RELEASES_FEED_URL,
  PROJECT_REPO_URL,
  SITE_URL,
} from '../../lib/site-meta';

export const prerender = true;

export function GET() {
  const body = {
    name: 'RugbyClaw',
    type: 'cli',
    version: CLI_VERSION,
    homepage: SITE_URL,
    repository: PROJECT_REPO_URL,
    docs_last_updated: DOCS_LAST_UPDATED,
    docs: {
      human: `${SITE_URL}/docs/`,
      llms: AGENT_DOC_ENDPOINTS.llmsIndex,
      llms_full: AGENT_DOC_ENDPOINTS.llmsFull,
      updates_feed: AGENT_DOC_ENDPOINTS.updatesFeed,
      changelog: PROJECT_CHANGELOG_URL,
      release_feed: PROJECT_RELEASES_FEED_URL,
      commit_feed: PROJECT_COMMITS_FEED_URL,
    },
    runtime_contracts: {
      json: {
        option: '--json',
        guarantee: 'Machine-readable JSON payload',
      },
      agent: {
        option: '--agent',
        envelope_fields: ['ok', 'exit_code', 'error_type', 'data', 'trace_id'],
        guarantee: 'Single-line, automation-safe output contract',
      },
    },
    global_options: ['--json', '--agent', '--tz <IANA timezone>', '--config <path>', '--quiet'],
    commands: AGENT_COMMANDS,
    standards: {
      changelog: 'Keep a Changelog',
      versioning: 'SemVer',
      source_of_truth: 'GitHub repository + releases',
    },
    generated_at: new Date().toISOString(),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=900',
    },
  });
}

