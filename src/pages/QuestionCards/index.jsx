import { useParams } from 'react-router-dom';
import { QuestionCard } from '../../components/QuestionCard';

export const QuestionCards = () => {
  const { category } = useParams();

  const categoryTitles = {
    na_rozehrati: 'Na rozehřátí',
    na_pobaveni: 'Na pobavení',
    co_by_kdyby: 'Co by kdyby',
    na_telo: 'Na tělo',
    do_hloubky: 'Do hloubky',
    mix_vseho: 'Mix všeho',
  };

  return (
    <div className="container">
      <section className="question-cards">
        <h2 className="question-cards__heading">
          {categoryTitles[category] || 'Otázky'}
        </h2>
        <QuestionCard selectedCategory={category} />
      </section>
    </div>
  );
};