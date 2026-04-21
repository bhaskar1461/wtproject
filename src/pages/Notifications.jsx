import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      const { data } = await api.get("/notifications");
      setNotifications(data.notifications || []);
    } catch {
      setNotifications([]);
    }
  }

  async function markRead(notificationId) {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      setNotifications((current) =>
        current.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch {
      return null;
    }
  }

  return (
    <main className="page page-section">
      <section className="info-card">
        <div className="row-between">
          <div>
            <p className="eyebrow">Notifications</p>
            <h1>Support alerts and ticket updates.</h1>
          </div>
          <button type="button" className="button-ghost" onClick={loadNotifications}>
            Refresh
          </button>
        </div>

        <div className="panel-stack">
          {notifications.length ? (
            notifications.map((notification) => (
              <div className="ticket-card" key={notification._id}>
                <div className="ticket-card-head">
                  <strong>{notification.title}</strong>
                  <span className={`status-pill ${notification.read ? "status-resolved" : "status-open"}`}>
                    {notification.read ? "Read" : "New"}
                  </span>
                </div>
                <p>{notification.message}</p>
                <div className="row-between">
                  <span className="ticket-meta">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                  <div className="button-row">
                    {notification.ticket ? (
                      <Link to={`/tickets/${notification.ticket}`} className="button-secondary">
                        View Ticket
                      </Link>
                    ) : null}
                    {!notification.read ? (
                      <button
                        type="button"
                        className="button-ghost"
                        onClick={() => markRead(notification._id)}
                      >
                        Mark Read
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="soft-card">
              <strong>No notifications yet</strong>
              <p>Ticket activity will appear here as the helpdesk workflow moves forward.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Notifications;
