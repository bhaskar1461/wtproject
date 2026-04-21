import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const categories = ["IT Support", "Facilities", "Accounts", "Academics", "Hostel", "Transport"];

function Generator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    subject: "",
    category: "",
    priority: "Medium",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await api.post("/tickets", form);
      setMessage("Ticket submitted successfully.");
      setForm({
        subject: "",
        category: "",
        priority: "Medium",
        description: "",
      });
      setTimeout(() => {
        navigate(`/tickets/${data.ticket._id}`);
      }, 700);
    } catch {
      setMessage("Could not submit the ticket right now.");
    }
  };

  return (
    <main className="page page-section">
      <section className="compose-layout">
        <aside className="compose-side">
          <p className="eyebrow eyebrow-light">Create Ticket</p>
          <h1>Turn a complaint into a clear request.</h1>
          <p>
            Strong tickets are short, specific, and actionable. Give the team
            a clean subject, the right category, and the exact context.
          </p>
          <div className="feature-grid">
            <div className="feature-chip">Use a subject that names the issue and location</div>
            <div className="feature-chip">Pick the team most likely to own the fix</div>
            <div className="feature-chip">Describe impact, timing, and what you tried</div>
          </div>
        </aside>

        <section className="compose-panel">
          <h2>Ticket Generator</h2>
          <p>Submit a structured request to the helpdesk team.</p>
          {message ? <div className="auth-flash auth-flash-success">{message}</div> : null}

          <form className="compose-form" onSubmit={handleSubmit}>
            <label className="stack-field">
              <span>Subject</span>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Example: Wi-Fi not working in lab"
                required
              />
            </label>

            <label className="stack-field">
              <span>Category</span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="stack-field">
              <span>Priority</span>
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>

            <label className="stack-field stack-field-full">
              <span>Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Explain what happened, where it happened, and what you already tried."
                required
              />
            </label>

            <button type="submit" className="button-primary button-wide">
              Submit Ticket
            </button>
          </form>
        </section>
      </section>

      <section className="insight-banner">
        <p className="eyebrow">Submission Formula</p>
        <h2>What a strong ticket usually includes</h2>
        <div className="timeline-list">
          <div className="timeline-item">
            <span className="timeline-dot" aria-hidden="true" />
            <span>Where the issue happened: building, room, lab, desk, or hostel block.</span>
          </div>
          <div className="timeline-item">
            <span className="timeline-dot" aria-hidden="true" />
            <span>When it started and whether it blocks classes, work, or access.</span>
          </div>
          <div className="timeline-item">
            <span className="timeline-dot" aria-hidden="true" />
            <span>Any steps already tried so the support team avoids repeating them.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Generator;
