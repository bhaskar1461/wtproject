import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function Feedback() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    rating: 5,
    comment: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post(`/tickets/${ticketId}/feedback`, {
        rating: Number(form.rating),
        comment: form.comment,
      });
      setMessage("Feedback submitted successfully.");
      setTimeout(() => navigate(`/tickets/${ticketId}`), 700);
    } catch {
      setMessage("Could not submit feedback right now.");
    }
  }

  return (
    <main className="page page-section">
      <section className="compose-layout">
        <aside className="compose-side">
          <p className="eyebrow eyebrow-light">Feedback Form</p>
          <h1>Close the loop on your support experience.</h1>
          <p>
            Once a ticket is resolved, your rating and comment help improve the
            service quality of the helpdesk workflow.
          </p>
        </aside>

        <section className="compose-panel">
          <h2>Share Feedback</h2>
          <p>Tell the team how the resolution went.</p>
          {message ? <div className="auth-flash auth-flash-success">{message}</div> : null}
          <form className="compose-form" onSubmit={handleSubmit}>
            <label className="stack-field">
              <span>Rating</span>
              <select name="rating" value={form.rating} onChange={handleChange}>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Very Poor</option>
              </select>
            </label>
            <label className="stack-field stack-field-full">
              <span>Comment</span>
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                placeholder="Describe what went well or what still needs improvement."
              />
            </label>
            <button type="submit" className="button-primary button-wide">
              Submit Feedback
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

export default Feedback;
