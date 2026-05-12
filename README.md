# QuotesScraper

QuotesScraper is a small TypeScript utility that extracts and stores quote information from web sources for personal use. It is focused on simplicity and reproducibility: configuration is minimal, data is stored locally, and the code is organized so you can extend or adapt scraping logic to new sources.

**Project Status:** stable for personal/dev use — not hardened for production.

**Key Points:**

- **Minimal dependencies:** written in TypeScript, runs with Node.js.
- **Local data:** scraped results are placed in the `data` folder.
- **Simple pages model:** scraper actions are implemented as small modules under `src/pages`.

**Requirements**

- Node.js 18+ and npm (or compatible package manager).
- A Chromium-based browser if headless browser scraping is added later (not required by default).

**Installation**

1. Clone the repository and change to the project folder.
2. Install dependencies:

```
npm install
```

**Configuration**

- The main configuration lives in [src/config.ts](src/config.ts). Adjust timeouts, storage paths, or other settings there.

**Run**

- Start the app with:

```
npm start
```

- The entry point is [src/index.ts](src/index.ts). The application reads configuration, runs the selected page handlers, and writes results to the local `data` file.

**Project layout**

- [src/index.ts](src/index.ts) — application entry point.
- [src/config.ts](src/config.ts) — configuration and environment settings.
- [src/pages/login.ts](src/pages/login.ts) — login flow implementation.
- [src/pages/quotes.ts](src/pages/quotes.ts) — scraper for quote items.
- [src/pages/storage.ts](src/pages/storage.ts) — storage helpers for saving results.
- [src/utils/timetracking.ts](src/utils/timetracking.ts) — simple timing utilities.
- `data/v1.json` — default data file used by the project.

**Data and storage**

- Scraped output is written to `data/v1.json`. The format is JSON and is intentionally simple so you can inspect or process it with other tools.

**Development notes**

- The codebase uses TypeScript. Compile-time checks run with `tsc` and scripts are available in `package.json`.
- Keep functions small and testable: page handlers should perform a single responsibility (authenticate, fetch list, normalize items, persist).

**Testing & linting**

- Add tests and linter rules as needed. There are no test suites included by default.

**Extending the scraper**

1. Add a new page module under `src/pages` following the existing patterns.
2. Export a clear handler that the main application can call from [src/index.ts](src/index.ts).
3. Persist results using the helpers in [src/pages/storage.ts](src/pages/storage.ts).

**Contributing**

- Open a pull request with a clear description and minimal, focused changes. Provide examples or sample output for new scrapers.
