import './style.css';
import { useEffect, useState } from 'react';
import { fetchThisOrThat } from '../../utils/fetchThisOrThat';
import { QuestionSlider } from '../../components/QuestionSlider';

const shuffleAndSlice = (array, count) => {
  return array
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

export const ThisOrThat = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchThisOrThat();
      const formattedQuestions = data.map(q => ({ text: q }));
      const selected = shuffleAndSlice(formattedQuestions, 10);
      setQuestions(selected);
      setCurrentIndex(0);
    };

    loadQuestions();
  }, []);

  return (
    <div className="container">
      <section className="this-or-that">
        <h2 className="this-or-that__heading">Tohle, nebo tamto</h2>

        {questions.length > 0 ? (
          <div className="slider">
            <QuestionSlider questions={questions} onSlideChange={setCurrentIndex} />
          </div>
        ) : (
          <p>Načítám otázky...</p>
        )}
      </section>
    </div>
  );
};