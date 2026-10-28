import "./Collections.css";
import { useContext } from "react";
import { CollectionsContext } from "../../context/CollectionsContext";

function Collections() {
    const { collections } = useContext(CollectionsContext);

  return (
    <main>
      <h2>Mis colecciones</h2>
      <p> {collections.length} colecciones </p>
    </main>
  );
}

export default Collections;
