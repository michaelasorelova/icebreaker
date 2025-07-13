export const getRandomItem = (array, fallback) => {
  if (!Array.isArray(array) || array.length === 0) {
    return fallback;
  }
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};