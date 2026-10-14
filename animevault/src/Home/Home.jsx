import AnimeCard from '../components/animecard/AnimeCard';
import { animes } from '../data/animes';
import './Home.css';
import { useState } from 'react';

function Home() {

const [search, setSearch] = useState('');
const [genre, setGenre] = useState('Todos');
const filteredAnimes = animes.filter((anime) =>{
  const matchesSearch = anime.title.toLowerCase().includes(search.toLowerCase());

  const marchesGenre = 
  genre === 'Todos' || anime.genres.includes(genre);
  return matchesSearch && marchesGenre
}) ;


  return (

    <main className="home">
      <h2>Descubre tu próximo anime</h2>
      <p>Explora los animes mejor valorados.</p>

     {/*Buscador animes */}
      <input 
        type='text'
        placeholder='Buscar anime...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='search-input'
      />


    {/*FILTROS */}

    <select
    className='genre-select'
    value={genre}
    onChange={(e) => setGenre(e.target.value)}
    >
      <option value='Todos'>Todos los géneros</option>
      <option value='Acción'>Acción</option>
      <option value='Aventura'>Aventura</option>
      <option value='Fantasía'>Fantasía</option>
      <option value='Drama'>Drama</option>
      <option value='Misterio'>Misterio</option>
      <option value='Thriller'>Thriller</option>
      <option value='Sobrenatural'>Sobrenatural</option>

    </select>

    {filteredAnimes.length === 0 && (
        <p>No se encontraron animes</p>
        )}


      {/*Anime Card */}

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