import AnimeCard from '../components/animecard/AnimeCard';
import { animes } from '../data/animes';
import './Home.css';
import { useState } from 'react';

function Home() {

const [search, setSearch] = useState('');
const filteredAnimes = animes.filter((anime) => anime.title.toLowerCase().includes(search.toLowerCase()) 
);


  return (
    <main className="home">
      <h2>Descubre tu próximo anime</h2>
      <p>Explora los animes mejor valorados.</p>

      <input 
        type='text'
        placeholder='Buscar anime...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='search-input'
      />

    {filteredAnimes.length === 0 && (
        <p>No se encontraron animes</p>
        )}

      <div className="anime-grid">
        {filteredAnimes.map((anime) => (
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