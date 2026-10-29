import "./AnimeDetail.css";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { CollectionsContext } from "../../context/CollectionsContext";
function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showSelector, setShowSelector] = useState(false);
  const { collections, addAnimeToCollection } = useContext(CollectionsContext);

  function handleSave(collectionId) {
    const animeToSave = {
      mal_id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.image_url,
      score: anime.score,
      year: anime.year,
    };
    addAnimeToCollection(collectionId, animeToSave);
  }

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
            <button
              className="save-button"
              onClick={() => setShowSelector(!showSelector)}
            >
              🔖 Guardar
            </button>
            {showSelector && (
              <ul className="collection-selector">
                {collections.map((collection) => (
                  <li key={collection.id} onClick={() => handleSave(collection.id)}>{collection.name}</li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default AnimeDetail;
