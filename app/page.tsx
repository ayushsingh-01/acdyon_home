"use client";

import { useEffect, useState } from "react";

const views = [
  { label: "Today", task: "Prepare client narrative", note: "Ready when you are", color: "coral" },
  { label: "In motion", task: "Website launch review", note: "Waiting on two notes", color: "lilac" },
  { label: "Quiet", task: "Research archive", note: "Nothing needs you", color: "sky" }
];

type Thread = { id: string; title: string; view: number };

export default function Home() {
  const [active, setActive] = useState(0);
  const [notice, setNotice] = useState(false);
  const [secretFound, setSecretFound] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([]);
  const view = views[active];

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("acdyon-demo-threads");
      if (saved) setThreads(JSON.parse(saved) as Thread[]);
    } catch {
      // Storage is optional; the demo remains usable in private browsing.
    }
  }, []);

  useEffect(() => {
    const sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    const entered: string[] = [];
    function listen(event: KeyboardEvent) {
      entered.push(event.key.toLowerCase());
      if (entered.length > sequence.length) entered.shift();
      if (entered.join(",") === sequence.join(",").toLowerCase()) setSecretFound(true);
    }
    window.addEventListener("keydown", listen);
    return () => window.removeEventListener("keydown", listen);
  }, []);

  function showMessage() {
    setNotice(true);
    window.setTimeout(() => setNotice(false), 2800);
  }

  function createThread(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = new FormData(event.currentTarget).get("title")?.toString().trim();
    if (!title) return;
    const next = [...threads, { id: crypto.randomUUID(), title, view: active }];
    setThreads(next);
    try { window.localStorage.setItem("acdyon-demo-threads", JSON.stringify(next)); } catch { /* Storage is optional. */ }
    setComposerOpen(false);
  }

  return (
    <main className={secretFound ? "constellation-found" : undefined}>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Acdyon home">acdyon<span>·</span></a>
        <div className="nav-links">
          <a href="#canvas">The canvas</a>
          <a href="#method">How it feels</a>
        </div>
        <button className="text-button" onClick={showMessage}>Request access <span aria-hidden>↗</span></button>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><i /> A quieter way to move work forward</p>
          <h1>Make room for the work <em>that matters.</em></h1>
          <p className="intro">Acdyon gives thoughtful teams one calm place to see what is moving, decide what deserves attention, and leave the rest alone.</p>
          <div className="hero-actions">
            <button className="primary" onClick={showMessage}>Find your focus <span aria-hidden>→</span></button>
            <a className="play-link" href="#canvas"><span className="play" aria-hidden>▶</span> See the canvas</a>
          </div>
          {notice && <p className="notice" role="status">Access requests are opening soon. We&apos;ll save your spot.</p>}
        </div>

        <div className="orbital" aria-label="Illustration of focused work orbiting a calm center">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="sun"><span>now</span></div>
          <div className="satellite satellite-a">clarity</div>
          <div className="satellite satellite-b">momentum</div>
          <div className="satellite satellite-c">space</div>
        </div>
      </section>

      <section className="canvas-section" id="canvas">
        <div className="shell canvas-header">
          <p className="eyebrow"><i /> The Acdyon canvas</p>
          <p>One living view, tuned to the tempo of your team.</p>
        </div>
        <div className="shell product-frame">
          <div className="product-bar"><span className="mini-mark">a·</span><span>Workspace / Early signals</span><span className="bar-avatar">AY</span></div>
          <div className="product-grid">
            <aside>
              <p className="side-label">Views</p>
              {views.map((item, index) => <button className={active === index ? "view active" : "view"} key={item.label} onClick={() => setActive(index)}><b className={item.color} />{item.label}</button>)}
              <div className="side-rule" />
              <p className="side-label">Your space</p>
              <span className="space-item">◌ Personal notes</span>
              <span className="space-item">◌ Shared work</span>
            </aside>
            <div className="canvas-main">
              <div className="canvas-title"><div><p className="kicker">{view.label}</p><h2>What needs a good eye?</h2></div><button className="add" onClick={() => setComposerOpen(true)}>+ Add a thread</button></div>
              <article className="hero-task">
                <div className={`task-swatch ${view.color}`} />
                <div><span className="task-type">A clear next step</span><h3>{view.task}</h3><p>{view.note}</p></div>
                <button className="arrow" aria-label="Open task" onClick={showMessage}>↗</button>
              </article>
              <div className="small-cards">
                <article><span className="dot lilac" /><p>Signal from the team</p><strong>Two decisions are ready.</strong></article>
                <article><span className="dot sky" /><p>Protected time</p><strong>Your afternoon is clear.</strong></article>
              </div>
              {threads.filter((thread) => thread.view === active).map((thread) => <article className="created-thread" key={thread.id}><span>New thread</span><strong>{thread.title}</strong><small>Saved in this browser</small></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="method shell" id="method">
        <p className="eyebrow"><i /> Built for teams that care</p>
        <div className="method-grid">
          <h2>Less status theatre.<br /><em>More actual progress.</em></h2>
          <div className="method-copy"><p>Acdyon is designed around attention, not activity. It brings together the signals that matter, then gets out of your way.</p><a href="#top">Meet Acdyon <span aria-hidden>→</span></a></div>
        </div>
      </section>

      <footer className="shell"><a className="wordmark" href="#top">acdyon<span>·</span></a><p>Made for considered work.</p><button className="text-button" onClick={showMessage}>Request access ↗</button></footer>
      {secretFound && <p className="secret-note" role="status">You found the constellation. Good eyes deserve a little extra space. ✦</p>}
      {composerOpen && <div className="composer-backdrop" role="presentation" onMouseDown={() => setComposerOpen(false)}><form className="composer" aria-label="Add a thread" onSubmit={createThread} onMouseDown={(event) => event.stopPropagation()}><button className="composer-close" type="button" onClick={() => setComposerOpen(false)} aria-label="Close add thread">×</button><p className="kicker">Add to {view.label}</p><h2>What needs attention?</h2><label htmlFor="thread-title">Thread title</label><input autoFocus id="thread-title" name="title" placeholder="e.g. Confirm the launch narrative" maxLength={90} /><div className="composer-actions"><button type="button" onClick={() => setComposerOpen(false)}>Cancel</button><button type="submit">Save thread →</button></div></form></div>}
    </main>
  );
}
