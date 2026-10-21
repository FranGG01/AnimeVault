import "./AnimeDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const response = await fetch(`https://api.tenrai.org/v1/anime/${id}`);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setAnime(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAnime();
  }, [id]);

  if (loading === true) {
    return <p>Cargando anime...</p>;
  }
  if (error) {
    return <p> {error} </p>;
  }
  if (anime === null) {
    return <p>No se encontró el anime.</p>;
  }

  return (
    <main className="anime-detail">
      <div className="anime-detail-poster-wrapper">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="anime-detail-poster"
        />
      </div>

      <div className="anime-detail-info">
        <h1> {anime.title} </h1>
        <p className="anime-score">Puntuación: {anime.score} </p>
        <p className="anime-episodes">
          Episodios: {anime.episodes || "Sin episodios disponibles."}
        </p>
        <div className="anime-genres">
          {anime.genres?.map((genre) => (
            <span className="genre-tag" key={genre.mal_id}>
              {genre.name}
            </span>
          ))}
        </div>
        <p className="anime-synopsis">Sinopsis: {anime.synopsis || "Sin sinopsis disponible."} </p>
      </div>
    </main>
  );
}

export default AnimeDetail;
