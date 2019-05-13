/* global it, describe, expect */
import reducer from '../../reducers/questions';
import * as types from '../../actions/questions';
import Question from '../../models/Question';
import BaseList, { toEntityList } from '../../models/BaseList';
import { questionsData } from '../mock-data/questions';

const initialState = new BaseList({
  loading: false,
  errorMessage: '',
  data: toEntityList([], Question),
});

describe('questions reducer', () => {
  it('should handle dispatch of QUESTIONS_LOADING', () => {
    const expectedState = initialState.merge({
      loading: true,
    });
    expect(
      reducer(initialState, {
        type: types.QUESTIONS_LOADING,
      }))
      .toEqual(expectedState);
  });

  it('should handle dispatch of QUESTIONS_ERROR', () => {
    const expectedState = initialState.merge({
      errorMessage: 'ERROR LOADING QUESTIONS',
    });
    expect(
      reducer(initialState, {
        type: types.QUESTIONS_ERROR,
        error: 'ERROR LOADING QUESTIONS',
      }))
      .toEqual(expectedState);
  });

  it('should handle dispatch of QUESTIONS_SUCCESS', () => {
    const expectedState = initialState.merge({
      data: toEntityList(questionsData, Question),
    });
    expect(
      reducer(initialState, {
        type: types.QUESTIONS_SUCCESS,
        data: questionsData,
      }))
      .toEqual(expectedState);
  });
});
