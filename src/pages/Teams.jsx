
// src/pages/Teams.jsx
import { useEffect, useState } from "react";
import {
  getTeams, createTeam, deleteTeam, renameTeam, removeFromTeam
} from "../utils/storage.js";

function sprite(name) {
  return `https://img.pokemondb.net/sprites/home/normal/${name}.png`;
}

function Teams() {
  const [teams, setTeams] = useState(getTeams());
  const [newTeamName, setNewTeamName] = useState("");

  useEffect(() => {
    setTeams(getTeams());
  }, []);

  function handleCreate(e) {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    createTeam(newTeamName.trim());
    setNewTeamName("");
    setTeams(getTeams());
  }

  function handleRename(id, name) {
    const n = prompt("Nieuwe teamnaam:", name);
    if (!n) return;
    renameTeam(id, n.trim());
    setTeams(getTeams());
  }

  function handleDelete(id) {
    if (!confirm("Team verwijderen?")) return;
    deleteTeam(id);
    setTeams(getTeams());
  }

  function handleRemoveMember(teamId, name) {
    removeFromTeam(teamId, name);
    setTeams(getTeams());
  }

  return (
    <div className="page container teams">
      <h1>Teams</h1>
      <form onSubmit={handleCreate} className="team-create">
        <input
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="Nieuwe teamnaam"
        />
        <button type="submit">Maak team</button>
      </form>

      {teams.length === 0 ? <p>Je hebt nog geen teams.</p> : null}

      <div className="teams-list">
        {teams.map((t) => (
          <div key={t.id} className="team-card">
            <div className="team-header">
              <h2>{t.name}</h2>
              <div className="team-actions">
                <button onClick={() => handleRename(t.id, t.name)}>Hernoem</button>
                <button onClick={() => handleDelete(t.id)}>Verwijder</button>
              </div>
            </div>
            <div className="team-members">
              {t.members.length === 0 ? <p>(nog geen leden)</p> : null}
              {t.members.map((name) => (
                <div key={name} className="member">
                  <img src={sprite(name)} alt={name} />
                  <span>{name}</span>
                  <button onClick={() => handleRemoveMember(t.id, name)}>×</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
