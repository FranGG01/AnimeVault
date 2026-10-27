

export function loadCollections() {
  const saved = localStorage.getItem("collections");

  if (saved === null) {
    return [];
  }
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}


export function saveCollections(collections){
    localStorage.setItem('collections', JSON.stringify(collections));
}