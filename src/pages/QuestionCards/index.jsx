import { useLocation } from 'react-router-dom';
import './style.css';
import { QuestionCard } from '../../components/QuestionCard';

export const QuestionCards = () => {
  const location = useLocation();
  const category = location.state?.category || 'Otázky';

  return (
    <div className="container">
      <div className="question-cards">
        <h2 className="question-cards__heading">{category}</h2>
        <QuestionCard />
      </div>
    </div>
  );
};
