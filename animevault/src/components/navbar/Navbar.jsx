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
        <NavLink to="/" end>
          Explorar
        </NavLink>
        
        <NavLink to='/ranking' end>Ranking</NavLink>

        <NavLink to='/collections end'>Collections</NavLink>
      </div>

      <div className="profile">F</div>
    </nav>
  );
}

export default Navbar;
