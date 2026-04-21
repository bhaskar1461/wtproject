import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="site-nav-shell">
      <div className="site-nav">
        <Link to="/" className="brand-link">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-core" />
          </span>
          <span className="brand-text">
            <span className="brand-title">CampusFlow</span>
            <span className="brand-subtitle">Student Support Hub</span>
          </span>
        </Link>

        <nav className="site-nav-links">
          <NavLink to="/">Home</NavLink>
          {user ? (
            <>
              <NavLink to={user.role === "admin" ? "/admin" : "/dashboard"}>
                {user.role === "admin" ? "Admin" : "Dashboard"}
              </NavLink>
              <NavLink to="/generator">Create Ticket</NavLink>
              <NavLink to="/prep">Support</NavLink>
              <NavLink to="/notifications">Alerts</NavLink>
              {user.role !== "admin" ? <NavLink to="/profile">Profile</NavLink> : null}
              <span className="nav-user-chip">{user.name?.split(" ")[0] || "Student"}</span>
              <button type="button" className="nav-logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
