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

  return (
    <CollectionsContext.Provider value={{ collections, createCollection }}>
      {children}
    </CollectionsContext.Provider>
  );
}
