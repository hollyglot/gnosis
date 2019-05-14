import { asyncRequest } from '../api';

export const QUESTIONS_LOADING = 'QUESTIONS_ASYNC_LOADING';
export const QUESTIONS_ERROR = 'QUESTIONS_ASYNC_ERROR';
export const QUESTIONS_SUCCESS = 'QUESTIONS_ASYNC_SUCCESS';
export const QUESTIONS_SET_CURRENT = 'QUESTIONS_SET_CURRENT';

function questionsLoading() {
  return {
    type: QUESTIONS_LOADING,
  };
}

function questionsError(error) {
  return {
    type: QUESTIONS_ERROR,
    error,
  };
}

function questionsSuccess(data) {
  return {
    type: QUESTIONS_SUCCESS,
    data,
  };
}

export function setCurrentQuestion(questionPosition) {
  return {
    type: QUESTIONS_SET_CURRENT,
    questionPosition,
  };
}

export function getQuestions() {
  return async (dispatch) => {
    dispatch(questionsLoading());
    try {
      const data = await asyncRequest({
        path: `questions`,
        method: 'get',
      });
      dispatch(questionsSuccess(data));
      return data;
    } catch (error) {
      dispatch(questionsError(error.message));
      return null;
    }
  };
}
