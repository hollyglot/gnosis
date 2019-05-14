import { asyncRequest } from '../api';

export const ANSWER_LOADING = 'ANSWER_ASYNC_LOADING';
export const ANSWER_ERROR = 'ANSWER_ASYNC_ERROR';
export const ANSWER_SUCCESS = 'ANSWER_ASYNC_SUCCESS';
export const ANSWERS_CLEAR = 'ANSWERS_CLEAR';

function answerLoading() {
  return {
    type: ANSWER_LOADING,
  };
}

function answerError(error) {
  return {
    type: ANSWER_ERROR,
    error,
  };
}

function answerSuccess(data, answer) {
  return {
    type: ANSWER_SUCCESS,
    data,
    answer
  };
}

export function clearAnswers(data, answer) {
  return {
    type: ANSWERS_CLEAR,
  };
}

export function checkAnswer(questionId, answer) {
  return async (dispatch) => {
    dispatch(answerLoading());
    try {
      const data = await asyncRequest({
        path: `answer/${ questionId }`,
        method: 'get',
      });
      dispatch(answerSuccess(data, answer));
      return data;
    } catch (error) {
      dispatch(answerError(error.message));
      return null;
    }
  };
}
