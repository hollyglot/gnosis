/* global it, describe, expect */
import reducer from '../../reducers/questions';
import * as types from '../../actions/questions';
import Question, {
  QuestionOptions,
  QUESTION_KEYS,
}  from '../../models/Question';
import BaseList, { toEntityList } from '../../models/BaseList';
import { questionData, questionsData } from '../mock-data/questions';

const initialState = new BaseList({
  loading: false,
  errorMessage: '',
  options: new QuestionOptions(),
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
    const updatedState = reducer(initialState, {
      type: types.QUESTIONS_SUCCESS,
      data: questionsData,
    });
    expect(updatedState.get('data').size).toEqual(questionsData.length);
  });

  it('should handle dispatch of QUESTIONS_SET_CURRENT', () => {
    const questionPosition = questionsData.length - 1;
    const expectedState = initialState.merge({
      options: initialState.options.set(`${ QUESTION_KEYS.CURRENT_QUESTION }`, questionPosition)
    });
    expect(
      reducer(initialState, {
        type: types.QUESTIONS_SET_CURRENT,
        questionPosition,
      }))
      .toEqual(expectedState);
  });
});
