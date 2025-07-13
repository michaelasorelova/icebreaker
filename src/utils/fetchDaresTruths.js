export const fetchDares = async () => {
  try {
    const res = await fetch('/api/dares.json');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Chyba při načítání úkolů:", err);
    return [];
  }
};

export const fetchTruths = async () => {
  try {
    const res = await fetch('/api/truths.json');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Chyba při načítání pravd:", err);
    return [];
  }
};