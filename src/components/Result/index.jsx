import { observer } from 'mobx-react-lite';
import React from 'react';
import myQuizlet from '../../store/store';

import s from './Result.module.scss';

export const Result = observer(() => {
  const [results, setResults] = React.useState([]);

  const tryAgain = () => {
    myQuizlet.setPageStep(1); // меняем шаг страницы, чтобы пройти тест заново
    myQuizlet.setCorrect(0); // обнуляем кол-во правильных ответов

    localStorage.setItem('pageStep', JSON.stringify(1)); // изменяем номер текущей страницы в localstorage
  };

  React.useEffect(() => {
    const existingResults = JSON.parse(localStorage.getItem('results')); // берем из localstorage значения пройденных тестов и записываем в results
    setResults(existingResults);
  }, []);

  return (
    <div className={s.result}>
      <h1>Викторина пройдена!</h1>

      <div className={s.result__info}>
        <p>
          Ваши баллы: <span>{myQuizlet.correct}</span>
        </p>

        <p>
          Всего вопросов: <span>{myQuizlet.questions.length}</span>
        </p>
      </div>
      <div className={s.result__history}>
        <h2 className={s.result__history__title}>История пройденных тестов</h2>
        <div className={s.result__history__list}>
          {results.map((result, index) => {
            return (
              <div key={index}>
                <p>
                  {result.currentDay} <span>{result.correct}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={tryAgain} className={s.result__button}>
        <svg
          width='12'
          height='14'
          viewBox='0 0 12 14'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M11.3682 5.75019L1.93934 0.175932C1.17325 -0.276759 0 0.162539 0 1.28221V12.4281C0 13.4326 1.09021 14.0379 1.93934 13.5343L11.3682 7.96276C12.2093 7.46721 12.2119 6.24574 11.3682 5.75019Z'
            fill='currentColor'></path>
        </svg>
        <span>Попробовать снова</span>
      </button>
    </div>
  );
});
