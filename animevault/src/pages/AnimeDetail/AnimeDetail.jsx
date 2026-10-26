import "./AnimeDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router";

function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();

    async function fetchAnime() {
      try {
        setLoading(true);
        setError(null);

        const url = `https://api.tenrai.org/v1/anime/${id}`;
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();

        setAnime(data.data);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        setError(error.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    fetchAnime();
    return () => {
      controller.abort();
    };
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
    <>
      <div className="anime-detail-container">
        <button onClick={() => navigate(-1)} className="back-link">
          ← Volver al catálogo
        </button>
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
            <p className="anime-synopsis">
              Sinopsis: {anime.synopsis || "Sin sinopsis disponible."}{" "}
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default AnimeDetail;
