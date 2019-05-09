import { List, Record } from 'immutable'
import uuidv4 from 'uuid/v4'

const defaultValues = {
  id: uuidv4(),
  questionId: null,
  answer: '',
  valid: false,
}

export default class Answer extends Record(defaultValues, Answer) {
  constructor(values) {
    super({
      ...values,
      choices: values && values.choices ?
        List(values.choices) : defaultValues.choices,
    })
  }
}
