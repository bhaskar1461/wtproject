import { useState } from "react";

const authContent = {
  login: {
    eyebrow: "Student Support Portal",
    title: "Login to Your Account",
    intro: "Access your helpdesk account with your existing details.",
    fields: [
      {
        id: "email",
        label: "Email Address",
        type: "email",
        placeholder: "Enter your email",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
      },
    ],
    primaryLabel: "Sign In",
    switchText: "Don't have an account?",
    switchLink: "Register",
    sideEyebrow: "Welcome Aboard",
    sideTitle: "New Here?",
    sideText:
      "Create your account and start using the helpdesk portal with the same clean style.",
    sideButton: "Sign Up",
  },
  register: {
    eyebrow: "Student Registration",
    title: "Create Your Account",
    intro:
      "Register once to raise tickets, track progress, and manage your helpdesk requests.",
    fields: [
      {
        id: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your name",
      },
      {
        id: "registerEmail",
        label: "Email Address",
        type: "email",
        placeholder: "Enter your email",
      },
      {
        id: "rollNumber",
        label: "Roll Number",
        type: "text",
        placeholder: "Enter your roll number",
      },
      {
        id: "department",
        label: "Department",
        type: "text",
        placeholder: "Enter your department",
      },
      {
        id: "registerPassword",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
      },
    ],
    primaryLabel: "Register",
    switchText: "Already have an account?",
    switchLink: "Sign In",
    sideEyebrow: "Student Login",
    sideTitle: "Welcome Back!",
    sideText:
      "Sign in to continue checking ticket updates, feedback, and responses from the helpdesk team.",
    sideButton: "Sign In",
  },
};

function App() {
  const [mode, setMode] = useState("login");
  const currentView = authContent[mode];
  const nextMode = mode === "login" ? "register" : "login";

  return (
    <main className="page-shell">
      <section className="auth-card">
        <div className="auth-panel auth-panel-left">
          <header className="brand">
            <div className="brand-mark" aria-hidden="true">
              <span className="brand-mark-core" />
            </div>
            <span className="brand-text">College Helpdesk</span>
          </header>

          <div className="content-block">
            <p className="eyebrow">{currentView.eyebrow}</p>
            <h1>{currentView.title}</h1>
            <p className="intro">{currentView.intro}</p>

            <form className="login-form">
              {currentView.fields.map((field) => (
                <label key={field.id} className="field">
                  <span className="field-label">{field.label}</span>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                </label>
              ))}

              <button type="submit" className="primary-button">
                {currentView.primaryLabel}
              </button>
            </form>

            <p className="switch-text">
              {currentView.switchText}{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => setMode(nextMode)}
              >
                {currentView.switchLink}
              </button>
            </p>
          </div>
        </div>

        <aside className="auth-panel auth-panel-right" id="register">
          <div className="shape shape-triangle" aria-hidden="true" />
          <div className="shape shape-circle" aria-hidden="true" />

          <div className="cta-panel">
            <p className="eyebrow eyebrow-light">{currentView.sideEyebrow}</p>
            <h2>{currentView.sideTitle}</h2>
            <p>{currentView.sideText}</p>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setMode(nextMode)}
            >
              {currentView.sideButton}
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default App;
