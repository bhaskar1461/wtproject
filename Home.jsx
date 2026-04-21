import { Link } from "react-router-dom";

const highlights = [
  {
    title: "One clean inbox for every department",
    text: "Route technical, hostel, accounts, and admin issues without students chasing people hallway to hallway.",
  },
  {
    title: "Faster triage with structured tickets",
    text: "Subject, category, and priority prompts help your support team understand the problem in one pass.",
  },
  {
    title: "A dashboard students will actually use",
    text: "Ticket progress, profile details, and support prep all stay in one polished workflow.",
  },
];

const steps = [
  "Create your account with department and roll number.",
  "Raise a ticket with enough context to route it quickly.",
  "Track updates from the dashboard instead of guessing.",
];

function Home() {
  return (
    <main className="page page-home">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Modern Campus Support</p>
          <h1>Turn student complaints into a smooth support experience.</h1>
          <p className="hero-text">
            CampusFlow gives your college a sharper helpdesk front end with
            cleaner ticket creation, better visibility, and a dashboard that
            feels like a real product instead of a form dump.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="button-primary">
              Start Free
            </Link>
            <Link to="/login" className="button-secondary">
              Student Login
            </Link>
            <Link to="/prep" className="button-ghost">
              See Support Tips
            </Link>
          </div>

          <div className="hero-grid">
            <div className="meta-card">
              <span className="meta-label">Built For</span>
              <strong className="metric-value">Students, admins, and campus teams</strong>
              <p>Designed for colleges that want support to feel organized, responsive, and trustworthy.</p>
            </div>
          </div>
        </div>

        <aside className="hero-aside">
          <div className="floating-panel">
            <h3>What this solves</h3>
            <div className="floating-list">
              {steps.map((step) => (
                <div className="floating-item" key={step}>
                  <span className="floating-dot" aria-hidden="true" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <span>Ticket Visibility</span>
              <strong>Live Progress</strong>
            </div>
            <div className="stat-card">
              <span>Submission Quality</span>
              <strong>Structured Requests</strong>
            </div>
            <div className="stat-card">
              <span>Student Experience</span>
              <strong>Clean, fast, mobile-ready</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="showcase-grid">
        {highlights.map((item) => (
          <article className="showcase-card" key={item.title}>
            <p className="card-kicker">Why it matters</p>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="highlight-grid">
        <article className="support-highlight">
          <p className="eyebrow">For Students</p>
          <h2>Less confusion, more confidence.</h2>
          <p>
            Students know where to report issues, what details to include, and
            where to check updates after submission.
          </p>
          <div className="support-list">
            <div className="soft-card">
              <strong>Simple routing</strong>
              <p>No more guessing whether a complaint belongs to IT, facilities, or admin.</p>
            </div>
            <div className="soft-card">
              <strong>Better tracking</strong>
              <p>Recent tickets and status labels make follow-up easy.</p>
            </div>
          </div>
        </article>

        <article className="support-highlight">
          <p className="eyebrow">For Campus Teams</p>
          <h2>Support requests arrive cleaner.</h2>
          <p>
            A structured intake flow reduces vague tickets and gives departments
            enough context to act quickly.
          </p>
          <div className="mini-grid">
            <div className="mini-stat">
              <span className="mini-label">Priority</span>
              <strong>High / Medium / Low</strong>
            </div>
            <div className="mini-stat">
              <span className="mini-label">Category</span>
              <strong>Department-ready context</strong>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Home;
