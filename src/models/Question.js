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
