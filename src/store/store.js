import { makeAutoObservable } from 'mobx';

class Quizlet {
  name = '';
  questions = [];
  pageStep = 0;
  stepQuestion = 0;
  correct = 0;

  constructor() {
    makeAutoObservable(this);
  }
  setName(name) {
    this.name = name;
  }
  setQuestions(questions) {
    this.questions = questions;
  }

  setPageStep(step) {
    this.pageStep = step;
  }

  setStepQuestion(step) {
    this.stepQuestion = step;
  }

  setCorrect(num) {
    this.correct = num;
  }
}

const myQuizlet = new Quizlet();
export default myQuizlet;
