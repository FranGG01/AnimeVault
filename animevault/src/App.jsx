import Navbar from './components/navbar/Navbar'
import AnimeCard from './components/animecard/AnimeCard';
import { animes } from './data/animes';
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <div className="anime-grid">
        {animes.map((anime) => (
          <AnimeCard 
            key={anime.id}
            title={anime.title}
            image={anime.image}
            rating={anime.rating}
            year={anime.year}
          />
        ))}
      </div>
    </>
  );
}

export default App
