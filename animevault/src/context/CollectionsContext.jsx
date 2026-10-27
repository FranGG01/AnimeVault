import { createContext, useState } from "react";
import { loadCollections } from "../utils/collectionsStorage";

export const CollectionsContext = createContext(null);

export function CollectionsProvider({ children }) {
  const [collections, setCollections] = useState(loadCollections);

  return (
    <CollectionsContext.Provider value={ {collections} }>
      {children}
    </CollectionsContext.Provider>
  );
}
