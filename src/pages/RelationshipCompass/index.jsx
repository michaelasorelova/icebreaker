import { useState, useEffect } from 'react';
import './style.css';

export const RelationshipCompass = () => {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [questionsToPlay, setQuestionsToPlay] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/compatibility-categories.json');
        const data = await response.json();
        setAllCategories(data);
      } catch (error) {
        console.error('Chyba při načítání otázek:', error);
      }
    };
    fetchQuestions();
  }, []);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleAllCategories = () => {
    if (selectedCategories.length === allCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(allCategories.map((cat) => cat.id));
    }
  };

  useEffect(() => {
    if (mode && selectedCategories.length > 0) {
      const selectedQuestions = allCategories
        .filter((cat) => selectedCategories.includes(cat.id))
        .flatMap((cat) => cat.questions);
      setQuestionsToPlay(selectedQuestions);
      setAnswers({});
    } else {
      setQuestionsToPlay([]);
      setAnswers({});
    }
  }, [mode, selectedCategories, allCategories]);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const answerOptions =
    mode === 'duo'
      ? [
          { value: 'strong-agree', label: 'Shodujeme se.' },
          { value: 'weak-agree', label: 'Spíše se shodujeme.' },
          { value: 'weak-disagree', label: 'Spíše se neshodujeme.' },
          { value: 'strong-disagree', label: 'Neshodujeme se.' },
        ]
      : [
          { value: 'important', label: 'Je to pro mě důležité.' },
          { value: 'rather-important', label: 'Spíše je to pro mě důležité.' },
          { value: 'rather-not-important', label: 'Spíše to pro mě není důležité.' },
          { value: 'not-important', label: 'Není to pro mě důležité.' },
        ];

  const allAnswered =
    questionsToPlay.length > 0 && questionsToPlay.every((q) => answers[q.id]);

  const handleFinish = () => {
    if (allAnswered) {
      setStep(3);
    } else {
      alert('Musíte odpovědět na všechny otázky.');
    }
  };

  const getResultCounts = () => {
    let agree = 0;
    let disagree = 0;
    let important = 0;
    let notImportant = 0;

    Object.values(answers).forEach((value) => {
      if (value === 'strong-agree' || value === 'weak-agree') agree++;
      if (value === 'weak-disagree' || value === 'strong-disagree') disagree++;
      if (value === 'important' || value === 'rather-important') important++;
      if (value === 'rather-not-important' || value === 'not-important') notImportant++;
    });

    return { agree, disagree, important, notImportant };
  };

  const handleRestart = () => {
    setStep(1);
    setMode('');
    setSelectedCategories([]);
    setQuestionsToPlay([]);
    setAnswers({});
  };

  return (
    <div className="container">
      <section className="relationship-compass">
        <h2 className="relationship-compass__heading">Vztahový kompas</h2>

        {step === 1 && (
          <div className="relationship-compass__step relationship-compass__step--1">
            <div className="relationship-compass__text">
              <p>
                Tahle hra nemá správné nebo špatné odpovědi. Jde hlavně o to, jestli se s druhým shodnete, nebo ne.
              </p>
              <p>
                Když hrajete sami, berte to jako příležitost zamyslet se nad tím, co od vztahu chcete a co je pro vás důležité.
              </p>
            </div>
            <button className="btn" onClick={() => setStep(2)}>
              Hra
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="relationship-compass__step relationship-compass__step--2">
            <div className="relationship-compass__mode-select">
              <h3 className="relationship-compass__subheading">Chcete hrát ve dvou, nebo sami?</h3>
              <div className="relationship-compass__options">
                <label className="lbl relationship-compass__option">
                  <input
                    className="relationship-compass__radio"
                    type="radio"
                    name="mode"
                    value="duo"
                    checked={mode === 'duo'}
                    onChange={() => setMode('duo')}
                  />
                  <i className={mode === 'duo' ? 'fi fi-rr-dot-circle' : 'fi fi-rr-circle'} />
                  Ve dvou
                </label>
                <label className="lbl relationship-compass__option">
                  <input
                    className="relationship-compass__radio"
                    type="radio"
                    name="mode"
                    value="solo"
                    checked={mode === 'solo'}
                    onChange={() => setMode('solo')}
                  />
                  <i className={mode === 'solo' ? 'fi fi-rr-dot-circle' : 'fi fi-rr-circle'} />
                  Sami
                </label>
              </div>
            </div>

            <div className="relationship-compass__category-select">
              <h3 className="relationship-compass__subheading">Vyberte kategorie otázek</h3>
              <div className="relationship-compass__options">
                <label className="lbl relationship-compass__option">
                  <input
                    className="relationship-compass__checkbox"
                    type="checkbox"
                    checked={selectedCategories.length === allCategories.length && allCategories.length > 0}
                    onChange={toggleAllCategories}
                  />
                  <i
                    className={
                      selectedCategories.length === allCategories.length && allCategories.length > 0
                        ? 'fi fi-rr-checkbox'
                        : 'fi fi-rr-square'
                    }
                  />
                  Vše
                </label>

                {allCategories.map((cat) => (
                  <label className="lbl relationship-compass__option" key={cat.id}>
                    <input
                      className="relationship-compass__checkbox"
                      type="checkbox"
                      value={cat.id}
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                    />
                    <i
                      className={
                        selectedCategories.includes(cat.id) ? 'fi fi-rr-checkbox' : 'fi fi-rr-square'
                      }
                    />
                    {cat.name} ({cat.questions.length})
                  </label>
                ))}
              </div>
            </div>

            {mode && selectedCategories.length > 0 && (
              <div className="relationship-compass__test">
                <h3 className="relationship-compass__subheading">Test</h3>
                <div className="relationship-compass__questions">
                  {questionsToPlay.map((question) => (
                    <div key={question.id} className="relationship-compass__question">
                      <p>{question.text}</p>
                      <div className="relationship-compass__options">
                        {answerOptions.map(({ value, label }) => (
                          <label key={value} className="lbl relationship-compass__option">
                            <input
                              className="relationship-compass__radio"
                              type="radio"
                              name={`question-${question.id}`}
                              value={value}
                              checked={answers[question.id] === value}
                              onChange={() => handleAnswer(question.id, value)}
                            />
                            <i
                              className={
                                answers[question.id] === value
                                  ? 'fi fi-rr-dot-circle'
                                  : 'fi fi-rr-circle'
                              }
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              className="btn"
              disabled={!mode || selectedCategories.length === 0 || !allAnswered}
              onClick={handleFinish}
            >
              Výsledky
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="relationship-compass__step relationship-compass__step--3">
            <div className="relationship-compass__content">
              <h3 className="relationship-compass__subheading">Výsledky</h3>
              <div className="relationship-compass__results">
                {mode === 'duo' ? (
                  <>
                    {getResultCounts().agree > 0 ? (
                      <div className="relationship-compass__result">
                        <p>
                          {getResultCounts().agree === 1
                            ? 'Shodujete se u 1 otázky:'
                            : `Shodujete se u ${getResultCounts().agree} otázek:`}
                        </p>
                        <ul className="relationship-compass__list">
                          {questionsToPlay
                            .filter(
                              (q) =>
                                answers[q.id] === 'strong-agree' ||
                                answers[q.id] === 'weak-agree'
                            )
                            .map((q) => (
                              <li className="relationship-compass__item" key={q.id}>
                                {q.text}
                              </li>
                            ))}
                        </ul>
                      </div>
                    ) : (
                      <p>Neshodujete se u žádné otázky.</p>
                    )}

                    {getResultCounts().disagree > 0 ? (
                      <div className="relationship-compass__result">
                        <p>
                          {getResultCounts().disagree === 1
                            ? 'Neshodujete se u 1 otázky:'
                            : `Neshodujete se u ${getResultCounts().disagree} otázek:`}
                        </p>
                        <ul className="relationship-compass__list">
                          {questionsToPlay
                            .filter(
                              (q) =>
                                answers[q.id] === 'strong-disagree' ||
                                answers[q.id] === 'weak-disagree'
                            )
                            .map((q) => (
                              <li className="relationship-compass__item" key={q.id}>
                                {q.text}
                              </li>
                            ))}
                        </ul>
                      </div>
                    ) : (
                      <p>Shodujete se u všech otázek.</p>
                    )}
                  </>
                ) : (
                  <>
                    {getResultCounts().important > 0 ? (
                      <div className="relationship-compass__result">
                        <p>
                          {getResultCounts().important === 1
                            ? '1 otázka je pro vás důležitá:'
                            : (getResultCounts().important >= 2 && getResultCounts().important <= 4)
                              ? `${getResultCounts().important} otázky jsou pro vás důležité:`
                              : `${getResultCounts().important} otázek je pro vás důležitých:`}
                        </p>
                        <ul className="relationship-compass__list">
                          {questionsToPlay
                            .filter(
                              (q) =>
                                answers[q.id] === 'important' ||
                                answers[q.id] === 'rather-important'
                            )
                            .map((q) => (
                              <li className="relationship-compass__item" key={q.id}>
                                {q.text}
                              </li>
                            ))}
                        </ul>
                      </div>
                    ) : (
                      <p>Žádnou otázku jste neoznačili jako důležitou.</p>
                    )}

                    {getResultCounts().notImportant > 0 ? (
                      <div className="relationship-compass__result">
                        <p>
                          {getResultCounts().notImportant === 1
                            ? '1 otázka pro vás není důležitá:'
                            : (getResultCounts().notImportant >= 2 && getResultCounts().notImportant <= 4)
                              ? `${getResultCounts().notImportant} otázky pro vás nejsou důležité:`
                              : `${getResultCounts().notImportant} otázek pro vás není důležitých:`}
                        </p>
                        <ul className="relationship-compass__list">
                          {questionsToPlay
                            .filter(
                              (q) =>
                                answers[q.id] === 'rather-not-important' ||
                                answers[q.id] === 'not-important'
                            )
                            .map((q) => (
                              <li className="relationship-compass__item" key={q.id}>
                                {q.text}
                              </li>
                            ))}
                        </ul>
                      </div>
                    ) : (
                      <p>Všechny otázky jste označili jako důležité.</p>
                    )}
                  </>
                )}

                <div className="relationship-compass__actions">
                  <button className="btn" onClick={handleRestart}>
                    Hrát znovu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </section>
    </div>
  );
};
