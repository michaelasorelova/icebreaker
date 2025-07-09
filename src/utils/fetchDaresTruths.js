export const fetchDares = async (setDares) => {
  try {
    const res = await fetch('/api/dares.json');
    const data = await res.json();
    setDares(data);
  } catch (err) {
    console.error("Chyba při načítání úkolů:", err);
  }
};

export const fetchTruths = async (setTruths) => {
  try {
    const res = await fetch('/api/truths.json');
    const data = await res.json();
    setTruths(data);
  } catch (err) {
    console.error("Chyba při načítání pravd:", err);
  }
};
