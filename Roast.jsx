const lines = [
  "Your ticket is moving slower than campus Wi-Fi during submissions week.",
  "Support saw your issue and is probably hunting the right department right now.",
  "This complaint has enough drama to deserve priority monitoring.",
];

function Roast() {
  return (
    <main className="page page-section">
      <section className="info-card">
        <p className="eyebrow">Roast Mode</p>
        <h1>Playful support responses.</h1>
        <p>
          This page gives the product some personality with sample lines you
          could use for playful updates, notifications, or demo copy.
        </p>
        <div className="panel-stack">
          {lines.map((line) => (
            <div className="soft-card" key={line}>
              <strong>Preview</strong>
              <p>{line}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="support-highlight">
        <p className="eyebrow">Tone Direction</p>
        <h2>Friendly first, playful second.</h2>
        <p>
          Humor works best when it never hides status, resolution steps, or
          urgency. Use this mode as seasoning, not the full meal.
        </p>
      </section>
    </main>
  );
}

export default Roast;
