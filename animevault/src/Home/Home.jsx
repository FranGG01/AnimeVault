import AnimeCard from '../components/animecard/AnimeCard';
import { animes } from '../data/animes';
import './Home.css';

function Home() {
  return (
    <main className="home">
      <h2>Descubre tu próximo anime</h2>
      <p>Explora los animes mejor valorados.</p>

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
    </main>
  );
}

export default Home;