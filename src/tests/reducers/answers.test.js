/* global it, describe, expect */
import { Map } from 'immutable';
import reducer from '../../reducers/answers';
import * as types from '../../actions/answers';
import Answer from '../../models/Answer';
import BaseMap from '../../models/BaseMap';
import { answerData, answerResponse } from '../mock-data/answers';


const initialState = new BaseMap();

describe('answers reducer', () => {
  it('should handle dispatch of ANSWER_LOADING', () => {
    const expectedState = initialState.merge({
      loading: true,
    });
    expect(
      reducer(initialState, {
        type: types.ANSWER_LOADING,
      }))
      .toEqual(expectedState);
  });

  it('should handle dispatch of ANSWER_ERROR', () => {
    const expectedState = initialState.merge({
      errorMessage: 'ERROR GETTING ANSWER',
    });
    expect(
      reducer(initialState, {
        type: types.ANSWER_ERROR,
        error: 'ERROR GETTING ANSWER',
      }))
      .toEqual(expectedState);
  });

  it('should handle dispatch of ANSWER_SUCCESS', () => {
    const questionId = answerResponse.id;
    let answerMap = new Map();
    answerMap = answerMap.set(questionId, new Answer(answerData));
    const expectedState = initialState.merge({
      data: answerMap,
    });

    const reducerState = reducer(initialState, {
      type: types.ANSWER_SUCCESS,
      data: answerResponse,
      answer: answerData.answer
    });

    expect(
      reducerState.getIn(['data', questionId, 'questionId']))
      .toEqual(expectedState.getIn(['data', questionId, 'questionId']));
  });
});
