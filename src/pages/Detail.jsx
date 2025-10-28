
// src/pages/Detail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTeams, addToTeam, isFavorite, toggleFavorite } from "../utils/storage.js";

function Detail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [fav, setFav] = useState(isFavorite(name));
  const [teams, setTeams] = useState(getTeams());

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setPokemon(data);
    }
    fetchData();
    setFav(isFavorite(name));
    setTeams(getTeams());
  }, [name]);

  function handleToggleFav() {
    const favs = toggleFavorite(name);
    setFav(favs.has(name));
  }

  function handleAddToTeam(e) {
    const id = e.target.value;
    if (!id) return;
    addToTeam(id, name);
    setTeams(getTeams());
    e.target.value = "";
  }

  if (!pokemon) return <p>Bezig met laden…</p>;

  return (
    <div className="page container detail">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      <p>Hoogte: {pokemon.height}</p>
      <p>Gewicht: {pokemon.weight}</p>

      <div className="detail-actions">
        <button onClick={handleToggleFav}>
          {fav ? "★ Verwijder uit favorieten" : "☆ Voeg toe aan favorieten"}
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

export default Detail;
