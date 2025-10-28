// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import List from "./pages/List.jsx";
import Detail from "./pages/Detail.jsx";
import Favorites from "./pages/Favorites.jsx";
import Teams from "./pages/Teams.jsx";

import Navigation from "./components/Navigation.jsx";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/pokemon/:name" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
