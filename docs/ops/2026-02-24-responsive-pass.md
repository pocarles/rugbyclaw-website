# Responsive Pass — February 24, 2026

## Issues found
- Fixed nav/logo sizing and gaps causing cramped top bar and potential horizontal scroll on small iPhones; touch targets were tight and links hid unpredictably.
- Code blocks and install CTAs were single-line, forcing overflow on narrow widths and making copy buttons hard to tap.
- Footer links sat on one line and could clip/truncate on mobile.
- Grid sections (features, leagues, personality, install, OpenClaw examples) used fixed column counts that broke at mid-size widths; hero terminal lacked a max width.
- Docs sidebar/content padding was desktop-heavy; tables and inline code could overflow on small viewports; no safe-area padding noted for iOS Safari.

## Fixes applied
- Added clamp-based spacing and safe-area padding to the top-level layout; reduced logo sizes and let nav links wrap with balanced gaps and mobile-friendly button sizing.
- Made install/code blocks flex-wrap with overflow-aware code styling; set command list columns to minmax to prevent squishing and overflow.
- Switched major grids to `auto-fit/minmax` for fluid column counts; constrained hero visual width and kept CTA blocks to readable widths.
- Enabled footer link wrapping with centered alignment and tightened mobile padding; tuned section padding for balanced mobile/desktop spacing.
- Updated docs layout padding/gaps, enabled table horizontal scroll and inline code wrapping, and set mobile typography scales for headings.

## Breakpoints/pages validated
- Breakpoints reviewed: 360, 390, 414, 768, 1024, 1280 (no horizontal overflow observed).
- Pages spot-checked: `/`, `/docs/`, `/privacy`, `/terms`, shared nav/footer, and docs sidebar/content.
