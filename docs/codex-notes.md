# Codex Delivery Notes _(For Codex-only consumption)_

> ⚠️ Keep every project document in English. This file is the authoritative Codex handoff memo. Update it every time you ship a feature, refactor, or introduce a new agent so future Codex runs can ramp instantly.

## Project Snapshot
- **Product shape**: Single-window Tauri shell with a React Router portal navigator; each agent is a mini-site mounted under the same shell.
- **Current progress**: Portal landing page now renders as a left-hand tree that hot-swaps the active agent inside the same window; the Photo agent is fully interactive and the Travel agent remains a placeholder. LiteSQLite access, sync logic, and data commands are not wired up yet.
- **Source of truth**: Product requirements live in `agents.md`. This file focuses on implementation details. If conflicts arise, treat `agents.md` as authoritative and document the resolution here.

## Repository Layout (Snapshot)
```
useful-web/
├─ README.md                # Root index pointing to docs/ and agents.md
├─ agents.md                # Formal description of every mini-site/agent
├─ docs/
│  ├─ readme.md             # Product + technical overview
│  ├─ local-setup.md        # Local development guide
│  └─ codex-notes.md        # ← You are here
├─ apps/
│  └─ portal/               # Vite + React SPA, currently the only frontend
├─ src-tauri/               # Rust-side Tauri shell & config
└─ package.json             # Workspace root scripts (pnpm workspace)
```

## Tooling & Scripts
- Toolchain: Node 18 + pnpm (via Corepack), Rust stable, `@tauri-apps/cli@2`.
- `pnpm dev`: Runs the portal Vite dev server from the workspace root (consumed by Tauri `devUrl`).
  - Be aware this shells into `pnpm --filter portal run dev`.
- `pnpm build`: Builds the portal (`tsc && vite build`) and emits assets into `apps/portal/dist` for Tauri production builds.
- `pnpm tauri dev|build`: Proxies directly to the Tauri CLI for live development or bundling.
- Package-local scripts live in `apps/portal/package.json` and follow vanilla Vite defaults.

## Portal Frontend (`apps/portal`)
- **Entry stack**: `src/main.tsx` mounts `<App />` inside a `HashRouter` to stay compatible with Tauri’s file protocol (no server-side history API).
- **Routes** (`src/App.tsx`):
  - `/` → `PortalPage`: Presents a two-column shell (`portal-shell`) with a left tree navigator (`portal-tree`) that lists every agent and a right-hand stage that renders the selected mini-site inline via the appropriate React component.
  - `/travel` → `TravelPage`: Placeholder message with upcoming workflow notes.
  - `/photo` → `PhotoPage`: Fully interactive photo practice hub (tabs, favorites, external links).
  - `*` → Redirect back to `/`.
- **Shared layout**: `components/SubPageLayout.tsx` encapsulates the back button, hero block, and content slot. The `accent` prop toggles styling per agent, and the optional `showBackButton` prop lets the portal embed agent pages without duplicating navigation chrome (the back button now falls back to `/` if browser history is shallow).
- **Styling**: `src/styles.css` contains all layout and component styles (cards, hero sections, placeholders, and the new portal tree/stage). When introducing a new styling approach (Tailwind, CSS Modules, etc.) document the rationale and migration plan here.
- **External links**: `agents.md` requires all outbound links to use `window.open(url, "_blank")` through the Tauri shell API. Implemented via `apps/portal/src/utils/openExternal.ts`, which calls `window.__TAURI__.shell.open` when available and falls back to `window.open`.

## Agent Implementation Notes (tie back to `agents.md`)
1. **Portal Navigator**
   - Present state: `PortalPage.tsx` drives a static `agentNodes` tree that highlights the active mini-site and streams its React component into the right-hand stage. Next steps are persisting “last visited” plus adding search on the tree; document where that state lives (localStorage vs. LiteSQLite) so other agents can reuse it.
2. **Global Travel Checklist Agent**
   - Data model: `countries → cities → places → visit_status` with the columns listed in `agents.md`.
   - UX expectations: Region filters, progressive drilldown, instant LiteSQLite writes, real-time completion stats, and emitted events `placeVisited` / `memoUpdated`.
   - Current state: `TravelPage.tsx` contains a product placeholder. When the real feature lands, document the LiteSQLite schema source (`packages/db` vs. inline migrations), React data flow, and Tauri commands used.
3. **Photo Post-processing Practice Hub**
   - UI: Implemented in `pages/PhotoPage.tsx` with tab pills for 全部 / 素材图库 / GitHub 项目, search input, favorites-only filter, and resource cards that show the tip + open button. Cards call `openExternal` so outbound links open via the Tauri shell API/fallback window.
   - Seed data: Hardcoded in `apps/portal/src/data/photoResources.ts` for now; migrate to LiteSQLite once the shared schema package lands.
   - Favorites: Stored locally under the `photoResourceFavorites` key (simple string array in `localStorage`). Future sync/analytics bus can hook into the `toggleFavorite` handler in `PhotoPage.tsx`.

## Tauri Shell (`src-tauri`)
- `src/main.rs` currently enables only `tauri_plugin_shell`. When you add commands (DB, sync bus, notifications), list the command names, parameters, and error handling strategy here for quick lookup.
- `tauri.conf.json`:
  - `beforeDevCommand` / `beforeBuildCommand` invoke the root `pnpm` scripts so Tauri always serves fresh portal assets.
  - `devUrl` points at `http://localhost:5173`; `frontendDist` resolves to `../apps/portal/dist`.
  - `plugins.shell.open` is enabled to allow portal links to launch the system browser.
- Any future customization (multi-window, tray, protocol handlers) must be recorded with the matching frontend entrypoints.

## Data & Sync Expectations
- Short term: All agents share a LiteSQLite connection managed by Tauri. Keep tables namespaced per agent but defined via the future `packages/db` schema so migration to MySQL is consistent.
- Long term: Mirror the same schema in MySQL for multi-device sync. Provide CLI tasks (example: `pnpm db:export`, `pnpm db:import`) when the sync bridge ships.
- Event bus: Every meaningful write should dispatch lightweight events (e.g., `placeVisited`, `memoUpdated`, `photoResourceFaved`) for background workers. Document the payload format, publish location, and subscribers here once implemented.

## Developer Checklist (run for every change)
1. Update `agents.md` and this file with any UX/behavioral change or new data shape.
2. Record new commands, scripts, dependencies, environment variables, or config toggles.
3. If you rename paths or components, note the ripple effects (tests, deeplinks, analytics).
4. Before handing off, ensure `pnpm install`, `pnpm dev`, and `pnpm tauri dev` still run. If not, log the blocker and workaround.

Maintaining this document guarantees every future Codex iteration can resume work within minutes without re-discovering context.
