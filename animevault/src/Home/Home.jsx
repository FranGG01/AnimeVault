import AnimeCard from '../components/animecard/AnimeCard';
import { animes } from '../data/animes';
import './Home.css';
import { useState } from 'react';

function Home() {

const [search, setSearch] = useState('');
const [genre, setGenre] = useState('Todos');
const [sortBy, setSortBy] = useState('rating');

const filteredAnimes = animes.filter((anime) =>{
  const matchesSearch = anime.title.toLowerCase().includes(search.toLowerCase());

  const matchesGenre = 
  genre === 'Todos' || anime.genres.includes(genre);
  return matchesSearch && matchesGenre
}) ;

{/*Ordenar Animes filtro */}
  if (sortBy === 'rating') {
    filteredAnimes.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'recent') {
    filteredAnimes.sort((a, b) => b.year - a.year);
  } else if (sortBy === 'oldest') {
    filteredAnimes.sort((a, b) => a.year - b.year);
  }

  return (

    <main className="home">
      <h2>Descubre tu próximo anime</h2>
      <p>Explora los animes mejor valorados.</p>

<div className="filters-bar">
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

    <select 
    className='sort-select'
    value={sortBy}
    onChange={(e)=> setSortBy(e.target.value)}
    >
      <option value='rating'>Mejor valorados</option>
      <option value='recent'>Más recientes</option>
      <option value='oldest'>Más antiguos</option>

    </select>
</div>
    
    <p>{filteredAnimes.length} {filteredAnimes.length === 1 ?  'Resultado encontrado' : 'Resultados encontrados'} </p>

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