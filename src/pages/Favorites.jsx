
// src/pages/Favorites.jsx
import PokemonCard from "../components/PokemonCard.jsx";
import { getFavorites } from "../utils/storage.js";

function Favorites() {
  const favs = Array.from(getFavorites());

  return (
    <div className="page container list">
      <h1>Favorieten</h1>
      {favs.length === 0 ? (
        <p>Je hebt nog geen favorieten. Klik op ☆ om een Pokémon als favoriet te markeren.</p>
      ) : (
        <div className="grid">
          {favs.map((name) => (
            <PokemonCard
              key={name}
              name={name}
              image={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
