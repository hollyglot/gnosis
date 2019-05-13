import Answer from '../models/Answer';
import BaseMap from '../models/BaseMap';

import {
  ANSWER_LOADING,
  ANSWER_ERROR,
  ANSWER_SUCCESS,
} from '../actions/answers';

const initialState = new BaseMap();

const actionsMap = {
  [ANSWER_LOADING]: (state) => {
    return state.merge({
      loading: true,
    });
  },
  [ANSWER_ERROR]: (state, action) => {
    return state.merge({
      loading: false,
      errorMessage: action.error,
    });
  },
  [ANSWER_SUCCESS]: (state, action) => {
    const apiAnswer = action.data;
    const answerIsValid = apiAnswer.answer === action.answer.trim();
    const answer = new Answer({
        questionId: apiAnswer.id,
        answer: action.answer,
        valid: answerIsValid,
    });
    const updatedAnswers = state.data.set(apiAnswer.id, answer);
    return state.merge({
      loading: false,
      errorMessage: '',
      data: updatedAnswers,
    });
  },
};

export default function answers(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
