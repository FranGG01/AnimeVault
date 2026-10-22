import AnimeCard from "../../components/animecard/AnimeCard";
import "./Home.css";
import { useState, useEffect } from "react";

function Home() {
  {
    /*filters states */
  }
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Todos");
  const [sortBy, setSortBy] = useState("rating");
  const [page, setPage] = useState(1);

  {
    /*api states */
  }
  const [animes, setAnimes] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnimes() {
      
      const params = new URLSearchParams();

      params.set("page", page);
      params.set("limit", 25);

      if (search.trim()) {
        params.set("q", search.trim());
      }

      if (genre !== "Todos") {
        params.set("genres", genre);
      }

      if (sortBy === "rating") {
        params.set("order_by", "score");
        params.set("sort", "desc");
      } else if (sortBy === "recent") {
        params.set("order_by", "start_date");
        params.set("sort", "desc");
      } else if (sortBy === "oldest") {
        params.set("order_by", "start_date");
        params.set("sort", "asc");
      }

      const url = `https://api.tenrai.org/v1/anime?${params.toString()}`;

      console.log("URL:", url);

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log("Datos recibidos:", data);

        setAnimes(data.data);
        setPagination(data.pagination);
      } catch (err) {
        console.error("Error al cargar los animes:", err);
        setError(err.message);
        setAnimes([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimes();
  }, [page, search, genre, sortBy]);

  {
    /*Ordenar Animes filtro */
  }
  const filteredAnimes = animes;
  const total = pagination?.items?.total ?? 0;
  return (
    <main className="home">
      <h2>Descubre tu próximo anime</h2>
      <p>Explora los animes mejor valorados.</p>

      <div className="filters-bar">
        {/*Buscador animes */}
        <input
          type="text"
          placeholder="Buscar anime..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="search-input"
        />

        {/*FILTROS */}

        <select
          className="genre-select"
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPage(1);
          }}
        >
          <option value="Todos">Todos los géneros</option>
          <option value="1">Acción</option>
          <option value="2">Aventura</option>
          <option value="10">Fantasía</option>
          <option value="8">Drama</option>
          <option value="7">Misterio</option>
          <option value="41">Suspense</option>
          <option value="37">Sobrenatural</option>
        </select>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
        >
          <option value="rating">Mejor valorados</option>
          <option value="recent">Más recientes</option>
          <option value="oldest">Más antiguos</option>
        </select>
      </div>
      {/* Estados de carga y error */}
      {loading && <p>Cargando animes...</p>}

      {error && (
        <p className="error-message">Error al cargar los animes: {error}</p>
      )}

      {/* Resultados */}
      {!loading && !error && (
        <>
          <p>
            {total}{" "}
            {total === 1 ? "Resultado encontrado" : "Resultados encontrados"}
          </p>

          {/*Anime Card */}
          <div className="anime-grid">
            {filteredAnimes.map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                id={anime.mal_id}
                title={anime.title}
                image={anime.images.jpg.image_url}
                rating={anime.score}
                year={anime.year}
              />
            ))}
          </div>
        </>
      )}
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          ← Anterior
        </button>

        <span className="pagination-current">{page}</span>

        <button
          className="pagination-btn"
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={!pagination?.has_next_page}
        >
          Siguiente →
        </button>
      </div>
    </main>
  );
}

export default Home;
