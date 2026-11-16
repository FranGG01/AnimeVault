import "./Collections.css";
import { useContext, useState } from "react";
import { CollectionsContext } from "../../context/CollectionsContext";
import AnimeCard from "../../components/animecard/AnimeCard";

function Collections() {
  const { collections, createCollection } = useContext(CollectionsContext);
  const [name, setName] = useState("");

  function handleCreate() {
    if (name.trim() === "") {
      return;
    }
    createCollection(name.trim());
    setName("");
  }

  return (
    <main className="collections-page">
      <h2>Mis colecciones</h2>

      <div className="collection-form">
        <input
          className="collection-input"
          type="text"
          placeholder="Nombre de la colección..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="collection-button" onClick={handleCreate}>
          Crear colección
        </button>
      </div>

      <p className="collections-count">
        {collections.length}{" "}
        {collections.length === 1 ? "colección" : "colecciones"}
      </p>

      <ul className="collections-list">
        {collections.map((collection) => (
          <li className="collection-item" key={collection.id}>
            <h3 className="collection-name">{collection.name}</h3>

            {collection.animes.length === 0 ? (
              <p className="collection-empty">
                Esta colección está vacía. Guarda animes desde su ficha.
              </p>
            ) : (
              <div className="collection-grid">
                {collection.animes.map((anime) => (
                  <AnimeCard
                    key={anime.mal_id}
                    id={anime.mal_id}
                    title={anime.title}
                    image={anime.image}
                    rating={anime.score}
                    year={anime.year}
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Collections;
