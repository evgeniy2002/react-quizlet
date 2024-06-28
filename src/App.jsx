import React from 'react';

import { Content } from './Content';
import myQuizlet from './store/store';

import './style/App.scss';

function App() {
  React.useEffect(() => {
    fetch('/db.json') // запрашиваем json с вопросами из локального хранилища
      .then((res) => res.json())
      .then(({ questions }) => myQuizlet.setQuestions(questions));
  }, []);

  return (
    <div className='wrapper'>
      <div className='container'>
        <Content />
      </div>
    </div>
  );
}

export default App;
