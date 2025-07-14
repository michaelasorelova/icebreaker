export const fetchThisOrThat = async () => {
  try {
    const res = await fetch('/api/this-or-that.json');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Chyba při načítání úkolů:", err);
    return [];
  }
};