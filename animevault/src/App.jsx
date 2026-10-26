import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import AnimeDetail from './pages/AnimeDetail/AnimeDetail';
import Ranking from './pages/Ranking/Ranking';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path='/ranking' element={<Ranking />} />
      </Routes>

    </BrowserRouter>


  );
}

export default App;