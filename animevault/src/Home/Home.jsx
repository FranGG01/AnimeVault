import AnimeCard from '../components/animecard/AnimeCard';
import './Home.css';
import { useState, useEffect } from 'react';

function Home() {

  {/*filters states */}
const [search, setSearch] = useState('');
const [genre, setGenre] = useState('Todos');
const [sortBy, setSortBy] = useState('rating');

  {/*api states */}
const [animes, setAnimes] = useState([]);

useEffect(() => {
  async function fetchAnimes(){
    const response = await fetch('https://api.tenrai.org/v1/top/anime');
    const data = await response.json();

    console.log(data)

    console.log("Primer anime:", data.data[0]);

    setAnimes(data.data)

  }

  fetchAnimes();
}, []);

{/*Input anime */}
const filteredAnimes = animes.filter((anime) =>{
  const matchesSearch = anime.title.toLowerCase().includes(search.toLowerCase());

  const matchesGenre = 
  genre === 'Todos' || anime.genres.some((genero) => genero.name === genre);
  return matchesSearch && matchesGenre
}) ;

{/*Ordenar Animes filtro */}
  if (sortBy === 'rating') {
    filteredAnimes.sort((a, b) => b.score - a.score);
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
      <option value="Action">Acción</option>
      <option value="Adventure">Aventura</option>
      <option value="Fantasy">Fantasía</option>
      <option value="Drama">Drama</option>
      <option value="Mystery">Misterio</option>
      <option value="Suspense">Suspense</option>
      <option value="Supernatural">Sobrenatural</option>

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
            key={anime.mal_id}
            title={anime.title}
            image={anime.images.jpg.image_url}
            rating={anime.score}
            year={anime.year}
          /> 
        ))}
      </div>
    </main>
  );
}

export default Home;