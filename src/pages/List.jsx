
// src/pages/List.jsx
import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard.jsx";

function List() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=60")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  return (
    <div className="page container list">
      <h1>Pokémon Lijst</h1>
      <div className="grid">
        {pokemons.map((p) => (
          <PokemonCard
            key={p.name}
            name={p.name}
            image={`https://img.pokemondb.net/sprites/home/normal/${p.name}.png`}
          />
        ))}
      </div>
    </div>
  );
}

export default List;
