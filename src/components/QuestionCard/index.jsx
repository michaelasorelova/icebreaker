import './style.css';
import { useEffect, useState, useRef } from 'react';



  export const QuestionCard = ({ selectedCategory }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/question_categories.json');
        const json = await response.json();

        let allQuestions = [];

        if (selectedCategory === 'mix_vseho') {
          allQuestions = Object.values(json).flat();
        } else {
          allQuestions = json[selectedCategory] || [];
        }

        if (allQuestions.length > 0) {
          const shuffled = allQuestions.sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 25);
          setQuestions(selected);
        } else {
          setQuestions([{ text: 'V této kategorii nejsou žádné otázky.' }]);
        }
      } catch (error) {
        console.error("Chyba při načítání otázek:", error);
        setQuestions([{ text: 'Nepodařilo se načíst otázky.' }]);
      }
    };

    fetchQuestions();
  }, [selectedCategory]);

  
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + questions.length) % questions.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimální vzdálenost swipe v px

    if (distance > threshold) {
      // swipe doleva (další otázka)
      next();
    } else if (distance < -threshold) {
      // swipe doprava (předchozí otázka)
      prev();
    }

    // reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div
      className="question-card"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="question-card__content">
        <p>{currentQuestion?.text}</p>
      </div>

      <div className="question-card__buttons">
        <span>{currentIndex + 1} / {questions.length}</span>
      </div>
    </div>
  );
};
