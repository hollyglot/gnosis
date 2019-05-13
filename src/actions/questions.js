import { asyncRequest } from '../api';

export const QUESTIONS_LOADING = 'QUESTIONS_ASYNC_LOADING';
export const QUESTIONS_ERROR = 'QUESTIONS_ASYNC_ERROR';
export const QUESTIONS_SUCCESS = 'QUESTIONS_ASYNC_SUCCESS';

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
      dispatch(questionsError(error));
      return null;
    }
  };
}
