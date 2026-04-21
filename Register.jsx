import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const departments = [
  "CSE",
  "ECE",
  "EEE",
  "MECH",
  "CIVIL",
  "IT",
  "AIML",
  "DS",
  "IOT",
  "CS",
];

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNumber: "",
    department: "",
    password: "",
    role: "student",
    adminCode: "",
  });
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
      const data = await register(form);
      navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page auth-page">
      <section className="auth-layout auth-layout-register">
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

          <div className="auth-copy auth-copy-register">
            <h1>Create your student support account.</h1>
            <p>
              Register once to raise tickets, track progress, and manage your
              helpdesk requests with a cleaner workflow.
            </p>
          </div>

          <form className="auth-form auth-form-register" onSubmit={handleSubmit}>
            {error ? <div className="auth-flash">{error}</div> : null}

            <label className="auth-field">
              <span>Full Name</span>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

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
              <span>Roll Number</span>
              <input
                name="rollNumber"
                type="text"
                placeholder="Enter your roll number"
                value={form.rollNumber}
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth-field">
              <span>Department</span>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth-field">
              <span>Account Type</span>
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            {form.role === "admin" ? (
              <label className="auth-field">
                <span>Admin Access Code</span>
                <input
                  name="adminCode"
                  type="password"
                  placeholder="Enter admin access code"
                  value={form.adminCode}
                  onChange={handleChange}
                  required
                />
              </label>
            ) : null}

            <button type="submit" className="auth-submit">
              {submitting ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        <aside className="auth-panel auth-panel-cta">
          <div className="auth-cta-content">
            <p className="eyebrow eyebrow-light">Already Registered?</p>
            <h2>Jump back into your dashboard.</h2>
            <p>
              Sign in to continue checking ticket updates, feedback, and
              responses from the helpdesk team.
            </p>
            <div className="feature-grid">
              <div className="feature-chip">Raise issues in a structured format</div>
              <div className="feature-chip">Track ticket status clearly</div>
              <div className="feature-chip">Keep student identity details ready</div>
            </div>
            <Link to="/login" className="auth-secondary-button">
              Sign In
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Register;
