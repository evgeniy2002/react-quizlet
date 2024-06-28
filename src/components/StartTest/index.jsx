import React from 'react';

import myQuizlet from '../../store/store';
import { observer } from 'mobx-react-lite';

import s from './StartTest.module.scss';

export const StartTest = observer(() => {
  const increasePageStep = () => {
    localStorage.setItem('pageStep', JSON.stringify(1)); // Записываем текущий шаг страницы в localstorage
    localStorage.setItem('questionStep', JSON.stringify(0)); // Устанавливаем текущий вопрос как нулевой

    myQuizlet.setPageStep(1); // Изменяем состояние шага страницы
  };

  return (
    <div className={s.start}>
      <h1 className={s.start__title}>Вопросы по React.js</h1>

      <input
        type='text'
        placeholder='Введите ваше имя'
        value={myQuizlet.name}
        className={s.start__input}
        onChange={(e) => myQuizlet.setName(e.target.value)}
      />
      <button className={s.start__button} onClick={increasePageStep} disabled={!myQuizlet.name}>
        Открыть
      </button>
    </div>
  );
});
