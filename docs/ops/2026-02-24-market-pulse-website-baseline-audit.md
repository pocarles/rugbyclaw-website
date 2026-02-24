# Market Pulse Website Baseline Audit (Market Pulse: Polymarket probabilities + confidence gating)

## 1) Current site/content architecture
- **Framework/output:** Astro 5 static site (`astro.config.mjs` sets `output: "static"`, sitemap integration). Content is written directly in `.astro` files (no CMS/MDX), split between landing (`src/pages/index.astro`, `privacy.astro`, `terms.astro`) and docs (`src/pages/docs/**`).
- **Layouts/navigation:** Single docs layout (`src/layouts/DocsLayout.astro`) controls docs chrome, sidebar links, canonical tags, and hard-coded docs version `0.1.3`.
- **Docs structure:** Sections by topic (`docs/installation`, `quickstart`, `config`, `commands/*`, `leagues`, `troubleshooting`, `changelog`). Sidebar links include `/docs/api-key/` but that page does not exist.
- **Styling/assets:** Global styles in `public/style.css`, docs styles in `public/docs.css`, shared assets (logo, og images, favicons) in `public/`.
- **SEO baseline:** Landing page defines extensive meta tags, OpenGraph/Twitter cards, and Schema.org `SoftwareApplication` + FAQ LD-JSON all scoped to existing CLI features. Canonicals set per page via layout or inline tags. Robots allows full crawl; sitemap plugin active.
- **Deployment markers:** `.vercel/project.json` present with project/org IDs; `.env.local` contains Vercel OIDC token; build scripts only `dev/build/preview` in `package.json`. No CI config checked in; `dist/` exists from a prior build.

## 2) Pages/components likely needing updates for Market Pulse launch
- **Landing page (`src/pages/index.astro`):** Hero/meta/OG/FAQ schema and `featureList` currently centered on live scores/fixtures; command list and features grid omit Market Pulse. OpenClaw examples and install CTAs do not mention probabilities/confidence gating.
- **Docs layout/sidebar (`src/layouts/DocsLayout.astro`):** Needs nav entry for a Market Pulse page; current missing API Key page link is a consistency gap to resolve while adding the new feature.
- **Docs pages:** Likely new/updated entries under `src/pages/docs/commands/` (if Market Pulse is a CLI command) and/or a guide page (e.g., `/docs/market-pulse/`). Existing `config`, `quickstart`, `installation`, and `troubleshooting` pages need copy on Polymarket integration, confidence thresholds, data sources, and safety limits.
- **Reference/help:** `docs/changelog` currently only links out; will need a release-note entry once the feature ships. `docs/leagues` may require a note if coverage differs from core leagues. Homepage command reference and sections like “Results with character”/notifications may need positioning tweaks.
- **Assets/structured data:** OG image/text and schema `featureList`/FAQ must incorporate Market Pulse claims and gating behavior; may need new imagery once feature copy is finalized (not implemented now).

## 3) SEO/docs/release-note implications
- Update landing title/description/keywords and schema to mention “Market Pulse”, “Polymarket probabilities”, “confidence gating”, and clarify model-based odds vs scores.
- Add an FAQ entry describing data source freshness, confidence thresholds, and disclaimers (non-betting, informational).
- Ensure sitemap inclusion for any new docs pages (handled automatically via Astro pages + sitemap integration) and check canonical URLs after adding routes.
- Release communications: GitHub Releases/CHANGELOG.md (referenced by `docs/changelog`) must carry a Market Pulse entry; homepage “Releases” link points to GitHub so messaging should match.
- Keep docs version marker (`DOCS_VERSION`) aligned with the CLI version that introduces Market Pulse to avoid mismatched UI/documentation expectations.

## 4) Deployment baseline and risks
- **Baseline:** Static build via `npm run build`; outputs to `dist/`. Vercel project info present, implying Vercel deploys; no explicit CI config or Node version pinning found.
- **Risks:** `.env.local` with Vercel OIDC token is committed; ensure it’s not used in production builds or leaked in logs. Absence of automated tests/preview checks increases risk of broken links or schema validation errors after copy changes. Missing `/docs/api-key/` route referenced in sidebar could produce 404s. `DOCS_VERSION` hard-coded may fall out of sync with new feature release.

## 5) Recommended update plan with acceptance criteria
1) **Define Market Pulse positioning/copy** for landing hero, features grid, command reference blurb, and OpenClaw examples—highlight Polymarket source and confidence gating.  
   - *Acceptance:* Landing page includes concise Market Pulse value prop and Polymarket attribution without breaking layout; copy reviewed for non-betting disclaimer.
2) **Add documentation page** (likely `/docs/market-pulse/` or `/docs/commands/market-pulse/`) covering usage, parameters (league/market filters), data cadence, confidence thresholds, and limitations.  
   - *Acceptance:* New doc page loads via sidebar, matches DocsLayout styling, and links to related commands/config.
3) **Update supporting docs** (`config`, `quickstart`, `installation`, `troubleshooting`) to mention Market Pulse setup (any flags, API key needs, confidence defaults) and safety/accuracy guidance.  
   - *Acceptance:* Each page includes at least one explicit Market Pulse reference where relevant; no dead links.
4) **Refresh SEO/structured data** on `src/pages/index.astro`: meta tags, `featureList`, FAQ entry, and OG copy to include Market Pulse while keeping rugby/CLI keywords.  
   - *Acceptance:* JSON-LD validates (no required fields dropped); canonical and robots remain unchanged.
5) **Release-note alignment**: Prep changelog entry (GitHub Releases/CHANGELOG.md referenced by docs) for Market Pulse launch and ensure docs `DOCS_VERSION` matches the shipping CLI version.  
   - *Acceptance:* Docs changelog link leads to a release that mentions Market Pulse; version string updated when code ships.
6) **Pre-deploy verification**: Run `npm run build` locally and spot-check new/updated routes; ensure sitemap output and robots remain valid.  
   - *Acceptance:* Build succeeds without errors/warnings related to new content; new pages appear in generated sitemap.
