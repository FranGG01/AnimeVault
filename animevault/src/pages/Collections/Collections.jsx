import "./Collections.css";
import { useContext, useState } from "react";
import { CollectionsContext } from "../../context/CollectionsContext";

function Collections() {
  const { collections, createCollection } = useContext(CollectionsContext);
  const [name, setName] = useState("");

  function handleCreate() {
    if (name.trim() === "") {
      return;
    }
    createCollection( name );
    setName("");
  }

  return (
    <main>
      <h2>Mis colecciones</h2>
      <input
        type="text"
        placeholder="Nombre de la colección..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreate}>Crear colección</button>
      <p> {collections.length} colecciones </p>
      <ul>
      {collections.map((collection)=> 
       <li key= {collection.id}>
          {collection.name}
       </li>
      )}
      </ul>
    </main>
  );
}

export default Collections;
