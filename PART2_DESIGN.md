# Part 2 - Premium home page design rationale

## Product and page job

**Acdyon** is a believable calm-workspace concept for thoughtful, cross-functional teams. The page has one job: make a visitor feel that Acdyon would replace noise with a usable sense of priority, then invite them to request access. It avoids pretending the product already has customers, metrics, or market proof.

## Design direction

The visual system treats attention as a physical space rather than a dashboard metric.

| Element | Choice | Why it belongs |
| --- | --- | --- |
| Palette | Mineral paper `#f8f6f0`, ink `#202336`, coral `#fa715d`, lilac `#ae9be8`, sky `#9bcad1` | Calm enough to read, but not generic neutral SaaS. Coral acts as a single point of urgency. |
| Type | DM Sans for interface, Instrument Serif for emphasis, DM Mono for labels | The serif carries the emotional promise; the mono makes the product view feel operational and precise. |
| Hero signature | An orbital “now” illustration | A literal expression of the premise: work can move around you without all becoming urgent. |
| Product proof | A working canvas with switchable focus views | Shows an interaction and information hierarchy instead of relying on marketing claims. |
| Motion | One gentle orbit, entrance rise, hover feedback | Motion establishes spatial calm; it is reduced automatically for people who prefer reduced motion. |

## Information architecture

```text
Promise → product evidence → point of view → request access
Hero       Switchable canvas   Supporting rationale  CTA
```

The page intentionally stays short. Every section has a job: the hero defines the product, the canvas demonstrates it, and the closing section gives the promise a clear point of view.

## Interaction and accessibility

- **Canvas views:** `Today`, `In motion`, and `Quiet` update the priority card with React state.
- **Access CTA:** provides a visible, truthful “opening soon” status instead of leading to a fictional signup flow.
- **Keyboard focus:** native buttons and links retain their accessible semantics; status changes use `role="status"`.
- **Responsive behavior:** navigation reduces on mobile, the product navigation collapses appropriately, and the content never depends on hover.
- **Reduced motion:** the orbit and page-entrance animation only run when the visitor has not requested reduced motion.

## Bonus easter egg

The brief’s optional bonus is implemented: on the home page, enter the Konami code (`↑ ↑ ↓ ↓ ← → ← → B A`). The orbit becomes a subtle constellation and a small confirmation appears. It is deliberately decorative, does not block the page, and does not affect ordinary interaction.

## Trade-off and next week

The time-boxed decision was to make one polished route with a small but real interaction model rather than build a broad mock marketing site. Given a week, I would user-test the positioning with target teams, wire the request-access CTA to a real consent-aware form, and make the canvas data-driven with a defined workspace schema.
