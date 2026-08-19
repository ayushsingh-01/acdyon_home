# Acdyon Frontend Challenge

A considered product concept and a compliance-first job-ingestion demonstration, built for the Acdyon Technologies frontend assessment.

> **Submission recommendation:** the brief asks candidates to select one track. The premium homepage (Part 2) is the intended official submission. Part 1 is included as a separate, working engineering demonstration - not as a claim that both tracks were submitted.

## Live links

| Experience | URL |
| --- | --- |
| Part 2 - Premium home page | [Open live site](https://ayushsingh-01.github.io/acdyon_home/) |
| Part 1 - Compliant ingestion demo | [Open live demo](https://ayushsingh-01.github.io/acdyon_home/ingestion/) |

## What is in the repository

| Area | Purpose | Supporting document |
| --- | --- | --- |
| Part 2 | A responsive product home page for a fictional calm-workspace product, Acdyon. | [DECISIONS.md](./DECISIONS.md), [PART2_DESIGN.md](./PART2_DESIGN.md) |
| Part 1 | A live, browser-based listing feed using a public API, with clear source provenance and failure handling. | [PART1_DESIGN.md](./PART1_DESIGN.md) |

## Highlights

- Responsive layouts checked at 390px and 1440px, with no horizontal scroll.
- Real, browser-initiated listing fetches from the Remotive public jobs API - no accounts, automated browsing, or anti-bot avoidance.
- Source links, loading state, filter, refresh control, empty state, and failure state in the Part 1 demo.
- Intentional motion only: a small product-state interaction, a restrained orbital illustration, and the optional Konami-code easter egg from the brief.
- No fabricated testimonials, logos, user counts, or performance claims.
- Static GitHub Pages export and deployment workflow.

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

## Repository map

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

## Deployment

GitHub Pages is deployed from the workflow in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). The repository must use **Settings → Pages → Source → GitHub Actions**. No secrets are required for the deployed static site.

## Notes for a follow-up conversation

The work is designed to be explainable line-by-line. The key decisions are documented, including why the ingestion demo does not attempt to bypass protected platforms and why the Part 2 copy deliberately avoids invented social proof.
