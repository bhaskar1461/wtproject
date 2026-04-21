import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const data = await login(form);
      navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page auth-page">
      <section className="auth-layout">
        <div className="auth-panel auth-panel-form">
          <div className="auth-brand">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark-core" />
            </span>
            <span className="brand-text">
              <span className="brand-title">CampusFlow</span>
              <span className="brand-subtitle">Student Support Hub</span>
            </span>
          </div>

          <div className="auth-copy">
            <h1>Sign in to your support workspace.</h1>
            <p>Access your dashboard, recent tickets, and student profile in one place.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error ? <div className="auth-flash">{error}</div> : null}

            <label className="auth-field">
              <span>Email Address</span>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="auth-submit">
              {submitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="auth-footer">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </div>

        <aside className="auth-panel auth-panel-cta">
          <div className="auth-cta-content">
            <p className="eyebrow eyebrow-light">New Here?</p>
            <h2>Create a smoother campus support flow.</h2>
            <p>
              Register once and start raising structured, trackable requests
              that campus teams can actually act on quickly.
            </p>
            <div className="feature-grid">
              <div className="feature-chip">Fast access to dashboard and profile</div>
              <div className="feature-chip">Cleaner ticket submission experience</div>
              <div className="feature-chip">Designed for desktop and mobile</div>
            </div>
            <Link to="/register" className="auth-secondary-button">
              Sign Up
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Login;
