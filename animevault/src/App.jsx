import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import AnimeDetail from './pages/AnimeDetail/AnimeDetail';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
      </Routes>

    </BrowserRouter>


  );
}

export default App;