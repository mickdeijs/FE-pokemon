
// src/components/PokemonCard.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTeams, addToTeam, isFavorite, toggleFavorite } from "../utils/storage.js";

function PokemonCard({ name, image }) {
  const [fav, setFav] = useState(false);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setFav(isFavorite(name));
    setTeams(getTeams());
  }, [name]);

  function handleToggleFav(e) {
    e.preventDefault();
    const favs = toggleFavorite(name);
    setFav(favs.has(name));
  }

  function handleAddToTeam(e) {
    e.preventDefault();
    const id = e.target.value;
    if (!id) return;
    addToTeam(id, name);
    // refresh teams UI (members not shown here, but reflect selection reset)
    setTeams(getTeams());
    e.target.value = "";
  }

  return (
    <div className="card">
      <Link to={`/pokemon/${name}`} className="card-link">
        <img src={image} alt={name} />
        <h3>{name}</h3>
      </Link>
      <div className="card-actions">
        <button onClick={handleToggleFav} aria-label="toggle favorite">
          {fav ? "★ Favoriet" : "☆ Favoriet"}
        </button>
        <select onChange={handleAddToTeam} defaultValue="">
          <option value="" disabled>Voeg toe aan team…</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>
              {t.name} ({t.members.length}/6)
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PokemonCard;
