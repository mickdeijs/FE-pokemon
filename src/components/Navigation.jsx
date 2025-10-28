
// src/components/Navigation.jsx
import { NavLink, Link } from "react-router-dom";

function Navigation() {
  return (
    <header className="site-header">
      <nav className="nav container">
        <div className="brand">
          <Link to="/">Pokémon Team Manager</Link>
        </div>
        <div className="nav-links">
          <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/list" className={({isActive}) => isActive ? "active" : ""}>Pokémon Lijst</NavLink>
          <NavLink to="/favorites" className={({isActive}) => isActive ? "active" : ""}>Favorieten</NavLink>
          <NavLink to="/teams" className={({isActive}) => isActive ? "active" : ""}>Teams</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
