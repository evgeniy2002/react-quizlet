import React from 'react';

import classNames from 'classnames';

import myQuizlet from '../../store/store';
import { observer } from 'mobx-react-lite';

import { getFormattedDate } from '../../utils/getCurrentDay';

import s from './Game.module.scss';

export const Game = observer(() => {
  const [isClickItem, setIsClickItem] = React.useState(false); // состояние для отслеживания клика по карточке ответа

  const step = myQuizlet.stepQuestion; // берем текущий шаг вопроса
  const question = myQuizlet.questions[step]; // получаем по шагу текущий вопрос

  const percentProgress = Math.floor((step / myQuizlet.questions.length) * 100); // формула для расчета заполнения progress bar

  const setLocalStorageResult = () => {
    // берем текущее значение result по результам предыдущих игр, если нет создаем пустой массив и закидываем результат нового прохождения теста в localstorage
    const existingResults = JSON.parse(localStorage.getItem('results')) || [];
    const newResult = {
      currentDay: getFormattedDate(),
      correct: myQuizlet.correct,
    };

    const updateResults = [...existingResults, newResult];
    localStorage.setItem('results', JSON.stringify(updateResults)); // добавляем новый результат к старым значениям
  };

  const increaseQuestionStep = () => {
    const currQuestionStep = localStorage.getItem('questionStep');
    localStorage.setItem('questionStep', JSON.stringify(parseInt(currQuestionStep) + 1));

    if (myQuizlet.stepQuestion === myQuizlet.questions.length - 1) {
      setLocalStorageResult(); // если мы достигли последнего вопроса, вызываем функцию для запись корретных ответов в localstorage

      myQuizlet.setPageStep(2); // изменяем щаг страницы и выводим
      myQuizlet.setStepQuestion(0); // обнуляем текущий вопрос чтобы начать с первого при новом прохождение

      localStorage.setItem('questionStep', JSON.stringify(0)); // так же обнуляю текущий вопрос в localstorage
      localStorage.setItem('pageStep', JSON.stringify(2)); // изменяем текущую страницу
    } else {
      setIsClickItem(false); // обнуляем состояния клика по каждому ответу для следующих вопросов
      myQuizlet.setStepQuestion(myQuizlet.stepQuestion + 1); // увеличиваем шаг вопроса при клике на кнопку
    }
  };

  const chooseAnswer = (idx) => {
    setIsClickItem(true);
    if (idx === question.correct) {
      myQuizlet.setCorrect(myQuizlet.correct + 1); // если выбранный вариант соответствует корректному то изменяем счеткик правильных ответов
    }
  };

  return (
    <div className={s.game}>
      <div className={s.game__title}>
        <h1 className={s.game__title__text}>{question && question.title}</h1>
        <p>
          {question && question.id} из <span>{myQuizlet.questions.length}</span>
        </p>
      </div>
      <div className={s.game__progress}>
        <div
          style={{ width: `${percentProgress}%` }}
          className={classNames(s.game__progress__inner, {
            [s.game__progress__inner__red]: percentProgress < 50,
            [s.game__progress__inner__orange]: percentProgress >= 50 && percentProgress < 70,
            [s.game__progress__inner__green]: percentProgress >= 70,
          })}></div>
      </div>

      <ul className={s.game__list}>
        {question &&
          question.variants.map((v, index) => {
            return (
              <li
                key={index}
                className={classNames(s.game__list__item, {
                  [s.game__list__item__correct]: index === question.correct && isClickItem === true,
                  [s.game__list__item__incorrect]:
                    index !== question.correct && isClickItem === true,
                })}
                onClick={() => chooseAnswer(index)}>
                {v}
              </li>
            );
          })}
      </ul>
      {isClickItem && (
        <button onClick={increaseQuestionStep} className={s.game__button}>
          Продолжить
        </button>
      )}
    </div>
  );
});
