# usefule-web

Local-first Tauri + React desktop portal that hosts several focused mini-sites behind a single entry point. The app keeps data in a lightweight embedded SQLite database for now and can later sync with a remote MySQL service once multi-device access is needed.

## High-level Goals
- **Desktop portal shell** – Tauri window with a React router that lists the available mini-sites and provides quick navigation.
- **Global Travel Checklist (Quanqiu Luyou Qingdan)** – Drill-down list by country → city → attraction with a visited checkbox stored in the local DB.
- **Photo Post-processing Practice Hub (Sheying Houqi Lianxi)** – Curated jump page of RAW material libraries and GitHub repos, each with a short practice note and an external link that opens in a new tab.

## Tech Stack
- **Frontend**: React + TypeScript, component library TBD (Ant Design or Mantine are good fits for quick tables and list views).
- **Desktop runtime**: Tauri for packaging, tray integration, and system APIs.
- **State/Data**: Local LiteSQLite/SQLite database accessed via Tauri commands; future migration path to MySQL with a sync job.
- **Styling**: Tailwind CSS or CSS Modules (decide once UI wireframes land).

## Proposed Structure
```
usefule-web/
├─ apps/
│  ├─ portal/                 # top-level navigation shell, shared header/footer
│  ├─ travel-checklist/       # country/city/POI views, checklist state
│  └─ photo-practice-hub/     # resource cards, outbound links
├─ packages/
│  ├─ db/                     # Prisma/Drizzle schema, LiteSQLite adapter, future MySQL client
│  └─ ui/                     # shared UI atoms such as cards, tables, filters
├─ src-tauri/                 # Rust-side commands, window setup, tray/menu
└─ docs/                      # product notes, agents.md, UX references
```

## Data Notes
- **Travel checklist tables**: `countries`, `cities`, `places`, `visit_status`.
- **Photo practice resources**: single table with `category`, `name`, `url`, `tip`, `tags`.
- Local LiteSQLite keeps everything offline-first; plan for a sync worker that batches changes to MySQL when network sync is enabled.

## Development Workflow
1. Install prerequisites: `rustup`, latest `node` (>=18), `pnpm` or `yarn`.
2. Install JS dependencies: `pnpm install`.
3. Run React dev server inside Tauri: `pnpm tauri dev`.
4. For database prototyping, use `pnpm db:push` (once ORM tooling is added).
5. Package desktop app: `pnpm tauri build`.

## Roadmap
1. Scaffold monorepo structure (apps + shared packages).
2. Implement portal layout and routing.
3. Build CRUD flows for the travel checklist backed by LiteSQLite.
4. Seed the photo practice resource table with curated links and tips.
5. Add search/filtering, then prepare the sync layer for a remote MySQL deployment.

See `agents.md` for more detailed responsibility notes for each mini-site.
