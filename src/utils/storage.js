
// src/utils/storage.js
const FAV_KEY = "ptm:favorites";
const TEAMS_KEY = "ptm:teams";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Favorites
export function getFavorites() {
  return new Set(read(FAV_KEY, []));
}
export function isFavorite(name) {
  return getFavorites().has(name);
}
export function toggleFavorite(name) {
  const favs = getFavorites();
  if (favs.has(name)) favs.delete(name); else favs.add(name);
  write(FAV_KEY, Array.from(favs));
  return favs;
}

// Teams
export function getTeams() {
  return read(TEAMS_KEY, []); // [{id, name, members: [names]}]
}
export function saveTeams(teams) {
  write(TEAMS_KEY, teams);
  return teams;
}
export function createTeam(name) {
  const teams = getTeams();
  const id = crypto.randomUUID();
  const newTeam = { id, name, members: [] };
  teams.push(newTeam);
  saveTeams(teams);
  return newTeam;
}
export function deleteTeam(id) {
  const teams = getTeams().filter(t => t.id !== id);
  return saveTeams(teams);
}
export function renameTeam(id, name) {
  const teams = getTeams().map(t => t.id === id ? { ...t, name } : t);
  return saveTeams(teams);
}
export function addToTeam(id, name) {
  const teams = getTeams().map(t => {
    if (t.id !== id) return t;
    if (t.members.length >= 6 || t.members.includes(name)) return t;
    return { ...t, members: [...t.members, name] };
  });
  return saveTeams(teams);
}
export function removeFromTeam(id, name) {
  const teams = getTeams().map(t => t.id === id ? { ...t, members: t.members.filter(m => m !== name) } : t);
  return saveTeams(teams);
}
