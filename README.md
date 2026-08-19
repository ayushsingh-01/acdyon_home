# Acdyon Frontend Challenge

<p align="center">
  <strong>Thoughtful product craft. Transparent data boundaries.</strong><br />
  A frontend assessment for Acdyon Technologies.
</p>

<p align="center">
  <a href="https://ayushsingh-01.github.io/acdyon_home/"><img alt="Live site" src="https://img.shields.io/badge/Live%20site-GitHub%20Pages-202336?style=flat-square&logo=githubpages&logoColor=white" /></a>
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16.3.1-000000?style=flat-square&logo=nextdotjs" />
  <img alt="Static export" src="https://img.shields.io/badge/Rendering-Static%20export-5c8d7c?style=flat-square" />
  <img alt="Responsive review" src="https://img.shields.io/badge/Reviewed-390px%20%2B%201440px-cd715d?style=flat-square" />
</p>

> **Submission recommendation:** the brief asks candidates to select one track. The premium homepage (Part 2) is the intended official submission. Part 1 is included as a separate, working engineering demonstration - not as a claim that both tracks were submitted.

## Start here

| Experience | URL |
| --- | --- |
| Part 2 - Premium home page | [Open live site](https://ayushsingh-01.github.io/acdyon_home/) |
| Part 1 - Compliant ingestion demo | [Open live demo](https://ayushsingh-01.github.io/acdyon_home/ingestion/) |

> The home page contains the optional bonus: enter `↑ ↑ ↓ ↓ ← → ← → B A` to find it.

## What’s inside

| Area | Purpose | Supporting document |
| --- | --- | --- |
| Part 2 | A responsive product home page for a fictional calm-workspace product, Acdyon. | [DECISIONS.md](./DECISIONS.md), [PART2_DESIGN.md](./PART2_DESIGN.md) |
| Part 1 | A live, browser-based listing feed using a public API, with clear source provenance and failure handling. | [PART1_DESIGN.md](./PART1_DESIGN.md) |

## Why these choices matter

| Principle | How it appears in the work |
| --- | --- |
| **Craft over decoration** | The Part 2 hero leads into an interactive product canvas instead of making unverified marketing claims. |
| **Permission over evasion** | Part 1 uses a public API directly, preserves outbound source links, and makes failure visible. |
| **Honesty over social proof** | No fabricated testimonials, logos, user counts, or performance claims. |
| **Responsive by default** | Both experiences were reviewed at 390px and 1440px with no horizontal scroll. |
| **Motion with a job** | The orbit, canvas state, and optional bonus support the product idea without overwhelming it. |

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for Part 2, or `http://localhost:3000/ingestion/` for Part 1.

## Verify a production build

```bash
npm run build
```

The project uses Next.js static export. GitHub Actions builds `out/` and deploys it to GitHub Pages on pushes to `main`.

<details>
<summary><strong>Repository map</strong></summary>

<br />

```text
app/
  page.tsx                 Part 2 home page and bonus easter egg
  ingestion/page.tsx       Part 1 live public-source feed
  globals.css              Shared responsive visual system
PART1_DESIGN.md            Ingestion strategy, resilience, and boundaries
PART2_DESIGN.md            Product, visual, interaction, and accessibility rationale
DECISIONS.md               One-page submission explanation for Part 2
.github/workflows/deploy.yml  GitHub Pages deployment
```

</details>

## Deployment

GitHub Pages is deployed from the workflow in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). The repository must use **Settings → Pages → Source → GitHub Actions**. No secrets are required for the deployed static site.

## Follow-up conversation notes

The work is designed to be explainable line-by-line. The key decisions are documented, including why the ingestion demo does not attempt to bypass protected platforms and why the Part 2 copy deliberately avoids invented social proof.

---

Built as a focused assessment project by [Ayush Singh](https://github.com/ayushsingh-01).
