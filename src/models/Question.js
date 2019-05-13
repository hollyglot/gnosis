import { List, Record } from 'immutable';

const defaultValues = {
  id: null,
  question: '',
  answer: '',
  choices: new List(),
};

export default class Question extends Record(defaultValues, 'Question') {
  constructor(values) {
    super({
      ...values,
      choices: values && values.choices ?
        List(values.choices) : defaultValues.choices,
    });
  }
}

/*
  Constants and records to support Question Options
*/
export const QUESTION_KEYS = {
  CURRENT_QUESTION: 'currentQuestion',
};

export const QuestionOptions = Record({
  [QUESTION_KEYS.CURRENT_QUESTION]: 0,
});
