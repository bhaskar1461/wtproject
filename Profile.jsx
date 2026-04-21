import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    rollNumber: user?.rollNumber || "",
    department: user?.department || "",
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
      const { data } = await api.put("/auth/profile", form);
      updateUser(data.user);
      setMessage("Profile updated.");
    } catch {
      setMessage("Could not update profile right now.");
    }
  };

  return (
    <main className="page page-section">
      <section className="profile-layout">
        <aside className="profile-side">
          <p className="eyebrow eyebrow-light">Student Profile</p>
          <h1>{form.name || "Your Profile"}</h1>
          <p>
            Keep your account details current so tickets can be verified and
            routed without delays.
          </p>
          <div className="profile-stat-list">
            <div>
              <span>Email</span>
              <strong>{form.email || "Not set"}</strong>
            </div>
            <div>
              <span>Roll Number</span>
              <strong>{form.rollNumber || "Not set"}</strong>
            </div>
            <div>
              <span>Department</span>
              <strong>{form.department || "Not set"}</strong>
            </div>
          </div>
        </aside>

        <section className="profile-panel">
          <h2>Edit Details</h2>
          <p>These details are used in your helpdesk identity across the app.</p>
          {message ? <div className="auth-flash auth-flash-success">{message}</div> : null}
          <form className="compose-form" onSubmit={handleSubmit}>
            <label className="stack-field">
              <span>Full Name</span>
              <input name="name" value={form.name} onChange={handleChange} />
            </label>
            <label className="stack-field">
              <span>Email</span>
              <input name="email" value={form.email} onChange={handleChange} />
            </label>
            <label className="stack-field">
              <span>Roll Number</span>
              <input
                name="rollNumber"
                value={form.rollNumber}
                onChange={handleChange}
              />
            </label>
            <label className="stack-field">
              <span>Department</span>
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="button-primary button-wide">
              Save Profile
            </button>
          </form>
        </section>
      </section>

      <section className="detail-grid">
        <article className="insight-banner">
          <p className="eyebrow">Why It Matters</p>
          <h2>Accurate details reduce back-and-forth.</h2>
          <p>
            When your email, roll number, and department are current, support
            teams spend less time verifying and more time solving.
          </p>
        </article>

        <article className="insight-banner">
          <p className="eyebrow">Best Practice</p>
          <h2>Match your official campus details.</h2>
          <p>
            Using your registered student identity helps departments confirm
            ownership of the request faster.
          </p>
        </article>

        <article className="insight-banner">
          <p className="eyebrow">After Editing</p>
          <h2>Use the dashboard to raise your next issue.</h2>
          <p>
            Once your profile is clean, ticket creation becomes a lot more
            reliable across departments.
          </p>
        </article>
      </section>
    </main>
  );
}

export default Profile;
