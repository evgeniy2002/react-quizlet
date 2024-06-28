import React from 'react';

import { StartTest, Game, Result } from './components/index';

import { observer } from 'mobx-react-lite';
import myQuizlet from './store/store';

export const Content = observer(() => {
  React.useEffect(() => {
    const currPage = JSON.parse(localStorage.getItem('pageStep')); // берем текущее значение номера страницы из localstorage
    const currQuestionStep = JSON.parse(localStorage.getItem('questionStep')); // берем текущий номер вопроса из localstorage

    if (currPage === 1) {
      // если оказывается что мы на странице с вопросами, то при перезагрузке страницы остаемся на том же вопросе
      myQuizlet.setPageStep(1);
      myQuizlet.setStepQuestion(currQuestionStep);
    }
  }, [myQuizlet.stepQuestion]);

  return (
    <div className='content'>
      {myQuizlet.pageStep === 0 && <StartTest />}
      {myQuizlet.pageStep === 1 && <Game />}
      {myQuizlet.pageStep === 2 && <Result />}
    </div>
  );
});
