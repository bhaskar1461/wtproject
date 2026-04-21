import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  return new Date(value).toLocaleString();
}

function TicketDetail() {
  const { ticketId } = useParams();
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [form, setForm] = useState({
    status: "Open",
    assignedTo: "",
    priority: "Medium",
    resolutionNote: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  async function loadTicket() {
    try {
      const { data } = await api.get(`/tickets/${ticketId}`);
      setTicket(data.ticket);
      setForm({
        status: data.ticket.status,
        assignedTo: data.ticket.assignedTo || "",
        priority: data.ticket.priority,
        resolutionNote: data.ticket.resolutionNote || "",
      });
    } catch {
      setMessage("Could not load the ticket right now.");
    }
  }

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleAdminSubmit(event) {
    event.preventDefault();

    try {
      const { data } = await api.patch(`/tickets/${ticketId}`, form);
      setTicket(data.ticket);
      setMessage("Ticket updated successfully.");
    } catch {
      setMessage("Could not update the ticket.");
    }
  }

  if (!ticket) {
    return <main className="page page-section"><section className="info-card"><h1>Loading ticket...</h1></section></main>;
  }

  return (
    <main className="page page-section">
      <section className="profile-layout">
        <aside className="profile-side">
          <p className="eyebrow eyebrow-light">Ticket Detail</p>
          <h1>{ticket.subject}</h1>
          <div className="profile-stat-list">
            <div>
              <span>Status</span>
              <strong>{ticket.status}</strong>
            </div>
            <div>
              <span>Priority</span>
              <strong>{ticket.priority}</strong>
            </div>
            <div>
              <span>Category</span>
              <strong>{ticket.category}</strong>
            </div>
            <div>
              <span>Assigned To</span>
              <strong>{ticket.assignedTo || "Not assigned"}</strong>
            </div>
          </div>
        </aside>

        <section className="profile-panel">
          <h2>Ticket Information</h2>
          {message ? <div className="auth-flash auth-flash-success">{message}</div> : null}
          <div className="panel-stack">
            <div className="soft-card">
              <strong>Description</strong>
              <p>{ticket.description}</p>
            </div>
            <div className="soft-card">
              <strong>Student</strong>
              <p>
                {ticket.user?.name} | {ticket.user?.email} | {ticket.user?.rollNumber}
              </p>
            </div>
            <div className="soft-card">
              <strong>Timeline</strong>
              <p>Created: {formatDate(ticket.createdAt)}</p>
              <p>Resolved: {formatDate(ticket.resolvedAt)}</p>
            </div>
            {ticket.resolutionNote ? (
              <div className="soft-card">
                <strong>Resolution Note</strong>
                <p>{ticket.resolutionNote}</p>
              </div>
            ) : null}
            {ticket.feedback?.submittedAt ? (
              <div className="soft-card">
                <strong>Feedback</strong>
                <p>Rating: {ticket.feedback.rating}/5</p>
                <p>{ticket.feedback.comment || "No written comment provided."}</p>
              </div>
            ) : null}
          </div>

          {user?.role === "admin" ? (
            <form className="compose-form" onSubmit={handleAdminSubmit}>
              <label className="stack-field">
                <span>Status</span>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
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
                <span>Assigned To</span>
                <input
                  name="assignedTo"
                  value={form.assignedTo}
                  onChange={handleChange}
                  placeholder="Example: IT Support Desk"
                />
              </label>
              <label className="stack-field stack-field-full">
                <span>Resolution Note</span>
                <textarea
                  name="resolutionNote"
                  value={form.resolutionNote}
                  onChange={handleChange}
                  placeholder="Add internal resolution notes or the final action taken."
                />
              </label>
              <button type="submit" className="button-primary button-wide">
                Save Admin Update
              </button>
            </form>
          ) : ticket.status === "Resolved" ? (
            <div className="hero-actions">
              <Link to={`/tickets/${ticket._id}/feedback`} className="button-primary">
                Submit Feedback
              </Link>
            </div>
          ) : null}
        </section>
      </section>
    </main>
  );
}

export default TicketDetail;
