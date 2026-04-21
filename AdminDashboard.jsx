import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function AdminDashboard() {
  const [summary, setSummary] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [tickets, setTickets] = useState([]);
  const [savingId, setSavingId] = useState("");

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    try {
      const { data } = await api.get("/tickets/admin/summary");
      setSummary(data.summary || {});
      setTickets(data.tickets || []);
    } catch {
      setTickets([]);
    }
  }

  async function handleStatusChange(ticketId, status) {
    setSavingId(ticketId);

    try {
      await api.patch(`/tickets/${ticketId}`, { status });
      await loadSummary();
    } finally {
      setSavingId("");
    }
  }

  return (
    <main className="page dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <p className="eyebrow">Admin Dashboard</p>
          <h1>Manage the full helpdesk queue.</h1>
          <p>
            Review tickets, update progress, and monitor the whole support
            pipeline from one admin view.
          </p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <span>Total Tickets</span>
            <strong>{summary.total || 0}</strong>
          </div>
          <div className="stat-card">
            <span>Open</span>
            <strong>{summary.open || 0}</strong>
          </div>
          <div className="stat-card">
            <span>In Progress</span>
            <strong>{summary.inProgress || 0}</strong>
          </div>
          <div className="stat-card">
            <span>Resolved</span>
            <strong>{summary.resolved || 0}</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="row-between">
          <h2>Ticket Queue</h2>
          <button type="button" className="button-ghost" onClick={loadSummary}>
            Refresh
          </button>
        </div>

        <div className="panel-stack">
          {tickets.length ? (
            tickets.map((ticket) => (
              <div className="ticket-card" key={ticket._id}>
                <div className="ticket-card-head">
                  <div>
                    <strong>{ticket.subject}</strong>
                    <p>
                      {ticket.user?.name} | {ticket.user?.department} | {ticket.category}
                    </p>
                  </div>
                  <span className={`status-pill status-${ticket.status.toLowerCase().replace(" ", "-")}`}>
                    {ticket.status}
                  </span>
                </div>
                <p>{ticket.description}</p>
                <div className="row-between">
                  <span className="ticket-meta">Priority: {ticket.priority}</span>
                  <div className="button-row">
                    <Link to={`/tickets/${ticket._id}`} className="button-secondary">
                      View Details
                    </Link>
                    <button
                      type="button"
                      className="button-ghost"
                      disabled={savingId === ticket._id}
                      onClick={() => handleStatusChange(ticket._id, "In Progress")}
                    >
                      Mark In Progress
                    </button>
                    <button
                      type="button"
                      className="button-primary"
                      disabled={savingId === ticket._id}
                      onClick={() => handleStatusChange(ticket._id, "Resolved")}
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="soft-card">
              <strong>No tickets available</strong>
              <p>Once students submit complaints, they will appear here for admin handling.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
