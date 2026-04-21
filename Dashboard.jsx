import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const quickActions = [
  {
    title: "Profile",
    description: "Keep your contact details and roll number accurate for faster verification.",
  },
  {
    title: "Support Prep",
    description: "Use the writing guide to create clearer and easier-to-resolve requests.",
  },
  {
    title: "Alerts",
    description: "Watch ticket updates and status changes from the helpdesk team.",
  },
];

function Dashboard() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [{ data: ticketData }, { data: notificationData }] = await Promise.all([
          api.get("/tickets"),
          api.get("/notifications"),
        ]);

        setTickets(ticketData.tickets || []);
        setNotifications(notificationData.notifications || []);
      } catch {
        setTickets([]);
        setNotifications([]);
      }
    }

    loadData();
  }, []);

  const openCount = tickets.filter((ticket) => ticket.status === "Open").length;
  const inProgressCount = tickets.filter((ticket) => ticket.status === "In Progress").length;
  const resolvedCount = tickets.filter((ticket) => ticket.status === "Resolved").length;

  return (
    <main className="page dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <p className="eyebrow">Student Workspace</p>
          <h1>Welcome back, {user?.name || "Student"}.</h1>
          <p>
            Track your tickets, check notifications, and move from issue
            reporting to feedback in one clean workflow.
          </p>
          <div className="hero-actions">
            <Link to="/generator" className="button-primary">
              Raise a Ticket
            </Link>
            <Link to="/notifications" className="button-secondary">
              View Alerts
            </Link>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <span>Open Tickets</span>
            <strong>{openCount}</strong>
          </div>
          <div className="stat-card">
            <span>In Progress</span>
            <strong>{inProgressCount}</strong>
          </div>
          <div className="stat-card">
            <span>Resolved</span>
            <strong>{resolvedCount}</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-panel">
          <h2>Quick Help</h2>
          <div className="panel-stack">
            {quickActions.map((item) => (
              <div className="soft-card" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="row-between">
            <h2>Recent Tickets</h2>
            <Link to="/generator" className="button-ghost">
              New Ticket
            </Link>
          </div>
          <div className="panel-stack">
            {tickets.length ? (
              tickets.slice(0, 4).map((ticket) => (
                <Link className="ticket-card" key={ticket._id} to={`/tickets/${ticket._id}`}>
                  <div className="ticket-card-head">
                    <strong>{ticket.subject}</strong>
                    <span
                      className={`status-pill status-${ticket.status.toLowerCase().replace(" ", "-")}`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <p>{ticket.description}</p>
                  <div className="row-between">
                    <span className="ticket-meta">{ticket.category}</span>
                    <span className="ticket-meta">Priority: {ticket.priority}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="soft-card">
                <strong>No tickets yet</strong>
                <p>Create your first ticket to start tracking support updates.</p>
              </div>
            )}
          </div>
        </article>
      </section>

      <section className="detail-grid">
        <article className="insight-banner">
          <p className="eyebrow">Notifications</p>
          <h2>Stay updated without chasing people.</h2>
          <p>
            Your latest alerts appear here whenever a ticket is created,
            assigned, updated, or resolved.
          </p>
        </article>

        <article className="insight-banner">
          <p className="eyebrow">Latest Alert</p>
          <h2>{notifications[0]?.title || "No alerts yet"}</h2>
          <p>{notifications[0]?.message || "Once support activity begins, updates will show here."}</p>
        </article>

        <article className="insight-banner">
          <p className="eyebrow">Next Step</p>
          <h2>Use feedback after resolution.</h2>
          <p>
            Each resolved ticket can now collect a student rating and comment so
            the workflow feels complete.
          </p>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
