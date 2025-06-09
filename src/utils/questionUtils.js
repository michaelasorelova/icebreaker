export const getDeletedQuestions = () => {
  return JSON.parse(localStorage.getItem("myDeleted")) || [];
};

export const getFavoriteQuestions = () => {
  return JSON.parse(localStorage.getItem("myFavorites")) || [];
};

export const saveFavoriteQuestions = (favorites) => {
  localStorage.setItem("myFavorites", JSON.stringify(favorites));
};

export const addToDeleted = (question) => {
  const existing = getDeletedQuestions();
  if (!existing.includes(question)) {
    const updated = [...existing, question];
    localStorage.setItem("myDeleted", JSON.stringify(updated));
  }
};

export const filterQuestions = (allQuestions, deletedQuestions) => {
  return allQuestions.filter(q => !deletedQuestions.includes(q.text));
};

export const shuffleAndSlice = (questions, count = 25) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};