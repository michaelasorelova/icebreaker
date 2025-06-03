import { useLocation } from 'react-router-dom';
import './style.css';
import { QuestionCard } from '../../components/QuestionCard';

export const QuestionPage = () => {
  const location = useLocation();
  const category = location.state?.category || 'Otázky';

  return (
    <div className="container">
      <div className="question-page">
        <h2 className="question-page__heading">{category}</h2>
        <QuestionCard />
      </div>
    </div>
  );
};
