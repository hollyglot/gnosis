import Question, {
  QuestionOptions,
  QUESTION_KEYS,
} from '../models/Question';
import BaseList, { toEntityList } from '../models/BaseList';

import {
  QUESTIONS_LOADING,
  QUESTIONS_ERROR,
  QUESTIONS_SUCCESS,
  QUESTIONS_SET_CURRENT,
} from '../actions/questions';

const initialState = new BaseList({
  loading: false,
  errorMessage: '',
  options: new QuestionOptions(),
  data: toEntityList([], Question),
});

const actionsMap = {
  [QUESTIONS_LOADING]: (state) => {
    return state.merge({
      loading: true,
    });
  },
  [QUESTIONS_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      errorMessage: action.error,
    });
  },
  [QUESTIONS_SUCCESS]: (state, action) => {
    const questions = toEntityList(action.data, Question);
    return state.merge({
      loading: false,
      errorMessage: '',
      data: questions,
    });
  },
  [QUESTIONS_SET_CURRENT]: (state, action) => {
    const newOptions = state.options.set(`${ QUESTION_KEYS.CURRENT_QUESTION }`, action.questionPosition);
    return state.merge({
      options: newOptions,
    });
  },
};

export default function questions(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
