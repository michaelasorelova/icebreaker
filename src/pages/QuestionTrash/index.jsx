import './style.css';
import { useEffect, useState } from 'react';
import { TrashQuestionList } from '../../components/TrashQuestionList';

export const QuestionTrash = () => {
  const [deleted, setDeleted] = useState([]);

  useEffect(() => {
    const storedDeleted = JSON.parse(localStorage.getItem('myDeleted')) || [];
    setDeleted(storedDeleted);
  }, []);

  useEffect(() => {
    localStorage.setItem('myDeleted', JSON.stringify(deleted));
  }, [deleted]);

  const handleRestore = (indexToRestore) => {
    const updatedDeleted = deleted.filter((_, index) => index !== indexToRestore);
    setDeleted(updatedDeleted);
  };

  return (
    <div className="container">
      <section className="question-trash">
        <h2 className="question-trash__heading">Smazané otázky</h2>
        <div className="question-trash__questions">
          <TrashQuestionList deleted={deleted} restoreDeleted={handleRestore} />
        </div>
      </section>
    </div>
  );
};
