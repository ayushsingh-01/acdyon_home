"use client";

import { useEffect, useMemo, useState } from "react";

type Job = {
  id: number;
  title: string;
  company_name: string;
  category: string;
  candidate_required_location: string;
  publication_date: string;
  url: string;
};

type ApiResponse = { jobs?: Job[] };

const endpoint = "https://remotive.com/api/remote-jobs";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export default function IngestionDemo() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [error, setError] = useState("");

  async function refresh() {
    setStatus("loading");
    setError("");
    try {
      const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`Source returned ${response.status}`);
      const data: ApiResponse = await response.json();
      const validJobs = (data.jobs ?? []).filter((job) => job.id && job.title && job.company_name && job.url).slice(0, 80);
      if (!validJobs.length) throw new Error("The source returned no valid listings.");
      setJobs(validJobs);
      setUpdatedAt(new Date());
      setStatus("ready");
    } catch {
      setStatus("error");
      setError("Live listings are temporarily unavailable. Try refreshing in a moment.");
    }
  }

  useEffect(() => { void refresh(); }, []);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return jobs.slice(0, 12);
    return jobs.filter((job) => [job.title, job.company_name, job.category, job.candidate_required_location].join(" ").toLowerCase().includes(term)).slice(0, 12);
  }, [jobs, query]);

  return <main className="ingestion-page">
    <header className="ingestion-nav">
      <a href="/" className="ingestion-mark">acdyon<span>·</span></a>
      <div className="source-chip"><span /> Public-source demo</div>
      <a href="/" className="back-link">← Home</a>
    </header>

    <section className="ingestion-hero">
      <div>
        <p className="ingestion-kicker">Part 1 / compliant ingestion</p>
        <h1>Jobs, with a <em>paper trail.</em></h1>
        <p className="ingestion-intro">A live view of remote roles from a documented public API - no accounts, no browser automation, no workarounds.</p>
      </div>
      <aside className="source-card">
        <span className="source-label">Active source</span>
        <strong>Remotive public jobs API</strong>
        <a href="https://remotive.com/api/remote-jobs" target="_blank" rel="noreferrer">Inspect source ↗</a>
      </aside>
    </section>

    <section className="terminal-shell" aria-label="Live job ingestion demo">
      <div className="terminal-top"><div className="terminal-dots"><i /><i /><i /></div><span>ingestion / live-feed</span><span className={status === "ready" ? "live-state connected" : "live-state"}>{status === "loading" ? "connecting" : status === "error" ? "source unavailable" : "live"}</span></div>
      <div className="feed-controls">
        <label htmlFor="search">Filter fetched listings</label>
        <div className="search-row"><input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “designer” or “India”" /><button onClick={() => void refresh()} disabled={status === "loading"}>{status === "loading" ? "Refreshing…" : "Refresh live feed"}</button></div>
        <p className="feed-meta">{status === "ready" ? `${jobs.length} validated listings fetched${updatedAt ? ` · checked ${updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : ""}` : "Requests are made directly from this page to the documented public endpoint."}</p>
      </div>

      {status === "error" ? <div className="feed-error"><strong>Source check failed.</strong><p>{error}</p><button onClick={() => void refresh()}>Try again</button></div> : <div className="job-list" aria-live="polite">
        {status === "loading" && !jobs.length ? <div className="loading-list"><span /><span /><span /></div> : results.map((job) => <article className="job-row" key={job.id}>
          <div className="job-main"><p className="job-company">{job.company_name}</p><h2>{job.title}</h2><div className="job-tags"><span>{job.category || "Remote"}</span><span>{job.candidate_required_location || "Location not specified"}</span></div></div>
          <div className="job-side"><time dateTime={job.publication_date}>{formatDate(job.publication_date)}</time><a href={job.url} target="_blank" rel="noreferrer" aria-label={`Open ${job.title} at ${job.company_name}`}>Open ↗</a></div>
        </article>)}
        {status === "ready" && !results.length && <p className="no-results">No fetched listings match “{query}”. Try a broader phrase.</p>}
      </div>}
    </section>

    <section className="design-principles">
      <p className="ingestion-kicker">Operating boundary</p>
      <div className="principle-grid"><div><strong>Permission first</strong><p>Use a public API with documented, unauthenticated access. No login sessions are created or stored.</p></div><div><strong>Visible failure</strong><p>A failed request is shown to the visitor. The page never silently substitutes stale or invented jobs.</p></div><div><strong>Source stays source</strong><p>Every listing keeps its outbound source link and timestamp, so provenance is never obscured.</p></div></div>
    </section>
  </main>;
}
