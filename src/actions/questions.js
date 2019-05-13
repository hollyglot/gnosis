// import { asyncRequest } from 'api'

export const QUESTIONS_LOADING = 'QUESTIONS_ASYNC_LOADING'
export const QUESTIONS_ERROR = 'QUESTIONS_ASYNC_ERROR'
export const QUESTIONS_SUCCESS = 'QUESTIONS_ASYNC_SUCCESS'

export function questionsLoading() {
  return {
    type: QUESTIONS_LOADING,
  }
}

export function questionsError(error) {
  return {
    type: QUESTIONS_ERROR,
    error,
  }
}

export function questionsSuccess(data) {
  return {
    type: QUESTIONS_SUCCESS,
    data,
  }
}
