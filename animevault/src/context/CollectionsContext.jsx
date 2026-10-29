import { createContext, useState } from "react";
import { loadCollections, saveCollections } from "../utils/collectionStorage";

export const CollectionsContext = createContext(null);

export function CollectionsProvider({ children }) {
  const [collections, setCollections] = useState(loadCollections);

  function createCollection(name) {
    const uuid = crypto.randomUUID();
    const newCollection = { id: uuid, name: name, animes: [] };
    const update = [...collections, newCollection];
    setCollections(update);
    saveCollections(update);
  }

  function addAnimeToCollection(collectionId, anime) {
    const updated = collections.map((collection) => {
      if (collection.id === collectionId) {
        return { ...collection, animes: [...collection.animes, anime] };
      }
      return collection;
    });
    setCollections(updated);
    saveCollections(updated);
  }

  return (
    <CollectionsContext.Provider value={{ collections, createCollection, addAnimeToCollection }}>
      {children}
    </CollectionsContext.Provider>
  );
}
