import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import AnimeDetail from "./pages/AnimeDetail/AnimeDetail";
import Ranking from "./pages/Ranking/Ranking";
import { CollectionsProvider } from "./context/CollectionsContext";
function App() {
  return (
    <CollectionsProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </BrowserRouter>
    </CollectionsProvider>
  );
}

export default App;
