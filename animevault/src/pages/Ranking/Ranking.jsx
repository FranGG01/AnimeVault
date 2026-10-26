import "./Ranking.css";
import { useEffect, useState } from "react";
import AnimeCard from "../../components/animecard/AnimeCard";
import { Link } from "react-router";
function Ranking() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRanking() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://api.tenrai.org/v1/top/anime`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setAnimes(data.data);
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
    fetchRanking();
    return () => {
      controller.abort();
    };
  }, []);
  if (loading === true) {
    return <p>Cargando ranking...</p>;
  }
  if (error) {
    return <p> {error} </p>;
  }

  return (
    <>
      <main>
        <h2 className="ranking-title">Ranking</h2>
        <div className="ranking-list">
          {animes.slice(0, 10).map((anime) => (
            <Link
              to={`/anime/${anime.mal_id}`}
              className="ranking-item"
              key={anime.mal_id}
            >
              <span className="ranking-position">{anime.rank}</span>
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="ranking-image"
              />
              <div className="ranking-info">
                <h3>{anime.title}</h3>
                <p>⭐ {anime.score}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default Ranking;
