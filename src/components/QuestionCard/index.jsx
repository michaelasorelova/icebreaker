import './style.css';
import { useRef } from 'react';

export const QuestionCard = ({ questions, currentIndex, setCurrentIndex }) => {
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
    const threshold = 50;

    if (distance > threshold) {
      next();
    } else if (distance < -threshold) {
      prev();
    }

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

