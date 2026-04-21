function Prep() {
  const tips = [
    "Mention the exact room, lab, or office where the issue happened.",
    "Add the time or date so the team can narrow down the incident.",
    "Share what you already tried before raising the complaint.",
  ];

  const examples = [
    "Weak: Wi-Fi not working.",
    "Better: Wi-Fi disconnects every 10 minutes in Block C networking lab after 2 PM.",
    "Best: Wi-Fi disconnects every 10 minutes in Block C networking lab after 2 PM on both laptop and phone, and reconnecting manually does not fix it.",
  ];

  return (
    <main className="page page-section">
      <section className="info-card">
        <p className="eyebrow">Ticket Prep</p>
        <h1>Write requests people can resolve quickly.</h1>
        <div className="panel-stack">
          {tips.map((tip) => (
            <div className="soft-card" key={tip}>
              <strong>Tip</strong>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="highlight-grid">
        <article className="support-highlight">
          <p className="eyebrow">Simple Formula</p>
          <h2>Use this structure</h2>
          <div className="panel-stack">
            <div className="soft-card">
              <strong>Problem</strong>
              <p>Describe what is broken or missing.</p>
            </div>
            <div className="soft-card">
              <strong>Context</strong>
              <p>Include location, timing, and the impact on students or staff.</p>
            </div>
            <div className="soft-card">
              <strong>Attempts</strong>
              <p>Say what you already tried so the team can skip basic troubleshooting.</p>
            </div>
          </div>
        </article>

        <article className="support-highlight">
          <p className="eyebrow">Examples</p>
          <h2>From vague to useful</h2>
          <div className="panel-stack">
            {examples.map((example) => (
              <div className="soft-card" key={example}>
                <p>{example}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default Prep;
