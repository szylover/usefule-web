# Agents & Responsibilities

This document describes the major user-facing agents (mini-sites) inside the Tauri + React portal, the expectations for their UX, and the data they own.

## Portal Navigator
- Lists every available mini-site with quick descriptions and CTA buttons.
- Persists the last visited mini-site and offers a search bar for faster filtering.
- Opens external links in the system browser using `window.open(url, "_blank")` through the Tauri `shell` API.
- Provides shared layout primitives (header, breadcrumbs, status toasts) to keep the experience consistent.

## Global Travel Checklist Agent
- **Goal**: Give users a structured checklist grouped by country → city → point of interest and track whether they have visited each entry.
- **Data model**:
  - `countries(id, name, region)`
  - `cities(id, country_id, name)`
  - `places(id, city_id, name, category, notes)`
  - `visit_status(place_id, visited:boolean, visited_at, memo)`
- **UX flow**:
  1. Filter by continent/region or search by name.
  2. Expand countries to reveal cities, then drill into places.
  3. Toggle visited status; updates should write to LiteSQLite immediately.
  4. Show completion stats (e.g., % visited per country) computed on the fly.
- Support future sync by emitting change events (`placeVisited`, `memoUpdated`) that a background sync worker can observe.

## Photo Post-processing Practice Hub Agent
- **Goal**: Curate RAW material libraries and GitHub repos useful for color grading drills, each with a short practice suggestion.
- **Presentation**:
  - Two tabs (素材图库 / GitHub 项目) or category filters.
  - Resource cards show the name, one-line tip, and a button that opens the link in a new browser tab.
  - Optional “Add to favorites” flag stored locally for quick recall.
- **Seed data**:

| 类别 | 名称 | 链接 | 练习建议 |
| --- | --- | --- | --- |
| 素材图库 | Unsplash Free RAW | https://unsplash.com/s/photos/raw | 挑曝光或色偏照片练习修色 |
| 素材图库 | Pexels RAW Portraits | https://www.pexels.com/search/raw%20portrait/ | 人像肤色白平衡、饱和度调整 |
| 素材图库 | Shotkit 138 Free RAW Files | https://shotkit.com/free-raw-photos/ | 调曝光与场景色调改造 |
| 素材图库 | Signature Edits Free RAW | https://www.signatureedits.com/free-raw-photos/ | 练习冷暖调转换与风格调色 |
| 素材图库 | Detty Studio Free RAW | https://dettystudio.com/free-raw-photos/ | 尝试不同光线风格色调修正 |
| GitHub 项目 | Auto-color-exploration | https://github.com/ChihYuHsieh/Auto-color-exploration | 从参考图自动提取颜色再微调 |
| GitHub 项目 | ComfyUI-EasyColorCorrector | https://github.com/regiellis/ComfyUI-EasyColorCorrector | 学习Lift/Gamma/Gain调色思路 |
| GitHub 项目 | acb (Adobe Color Book Tool) | https://github.com/atesgoral/acb | 提取并统一色卡练习统一风格 |
| GitHub 项目 | ChartThrob | https://github.com/joker-b/ChartThrob | 练习RGB与CMYK色域转换差异 |
| GitHub 项目 | Adobe Photoshop API SDK | https://github.com/adobe/aio-lib-photoshop-api | 尝试自动化批量调色与图层处理 |

## Data & Sync Guidelines
- Keep all agent-specific tables under the shared LiteSQLite connection exposed by the Tauri backend.
- Normalize shared entities (e.g., user profile/preferences) in `packages/db` for reuse.
- When the MySQL backend is introduced, reuse the same schema names to minimize migration work; ship a CLI task to export/import data.
- All agents should fire analytics/sync events through a lightweight pub-sub layer so background workers can mirror data upstream without blocking the UI.
