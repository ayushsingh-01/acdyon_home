# Part 1 - Compliant job-listing ingestion design

## Live demo

`/ingestion` fetches the Remotive public jobs API directly in the browser. It intentionally uses a source whose public endpoint accepts unauthenticated `GET` requests and sends CORS headers. No platform account, session, credential, proxy, CAPTCHA solver, fingerprint modification, or browser automation is involved.

```
Browser visitor
     | HTTPS GET (on refresh)
     v
Remotive public jobs API
     | JSON response
     v
Schema validation -> visible listing cards -> outbound link to source listing
     |                         |
     +-- error / empty result --+--> explicit unavailable state; no invented fallback data
```

## 1. Detection surface

Sites can identify automated collection through authentication/session anomalies, abnormal request cadence, unusual browser/network fingerprints, unexpected headers, and behaviour that does not resemble a person using the product. This design avoids that detection surface instead of trying to disguise it: it uses no protected site, no login state, no headless browser, and one visitor-initiated API request at a time. It does not collect data from LinkedIn, Indeed, Naukri, Wellfound, or another site that has not granted access.

## 2. Ingestion strategy

The primary strategy is permissioned/public access over a documented API. The user explicitly presses **Refresh live feed**; the browser fetches JSON over HTTPS, validates required fields, limits the rendered set, and preserves the provider link. There is no rotation or identity management because neither is appropriate for this source.

The plan B is an adapter for another public API or RSS feed with comparable terms and a stable contract. Switching sources means adding a small adapter that maps the provider response to `id`, `title`, `company`, `location`, `publishedAt`, and `url`; it never means bypassing a block.

## 3. Resilience

The client checks the HTTP response, validates individual records, and exposes a retryable failure state for network, non-200, empty, and malformed responses. It leaves previously verified results on screen while a refresh is in progress, and it never presents stale data as live. In a production backend, I would add source health checks, contract tests against stored fixtures, structured failure alerts, bounded retry with backoff only where provider terms permit it, and an adapter-level circuit breaker.

## 4. Where I stop

I stop where a platform’s terms, robots policy, authentication boundary, or access controls say stop. I would not evade rate limits, CAPTCHAs, anti-bot tooling, account restrictions, or IP blocks; nor would I buy or use accounts to access listings. The acceptable path is written permission, an official/public API, a documented feed, or a sandbox I control. This demo chooses the lowest-risk option to prove the complete ingestion path without asking a provider to defend itself from the demo.

## Trade-off and AI use

I traded broad source coverage for provenance and repeatability. With a week, I would seek written provider agreements and build tested adapters for each approved feed. AI assisted with implementation structure and copy exploration; I selected the compliant boundary, verified the API response/CORS behaviour, checked the build, and reviewed all source-handling decisions.
