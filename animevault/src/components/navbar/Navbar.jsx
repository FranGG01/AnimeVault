import "./Navbar.css";
import { Link, NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <h1 className="logo">
          ANIME<span>VAULT</span>
        </h1>
      </Link>
      <div className="nav-links">
        <NavLink to="/" endo>
          Explorar
        </NavLink>
        
        <a href="#">Ranking</a>
        <a href="#">Mis colecciones</a>
      </div>

      <div className="profile">F</div>
    </nav>
  );
}

export default Navbar;
