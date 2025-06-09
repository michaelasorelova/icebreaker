import './style.css';
import { QuestionsList } from '../../components/QuestionsList';
import { useLocalStorageState } from '../../utils/useLocalStorageState';

export const DeletedQuestions = () => {
  const [deleted, setDeleted] = useLocalStorageState('myDeleted', []);

  const handleRestore = (indexToRestore) => {
    const updatedDeleted = deleted.filter((_, index) => index !== indexToRestore);
    setDeleted(updatedDeleted);
  };

  return (
    <div className="container">
      <section className="question-trash">

        <h2 className="question-trash__heading">Smazané otázky</h2>

        <div className="question-trash__questions">
          <QuestionsList
            items={deleted}
            onAction={handleRestore}
            emptyMessage="Nemáte zatím žádné smazané otázky."
            ariaLabel="Obnovit smazanou otázku"
            classPrefix="deleted-questions"
          />
        </div>
        
      </section>
    </div>
  );
};
