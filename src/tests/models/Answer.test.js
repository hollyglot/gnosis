/* global it, describe, expect */
import Answer from '../../models/Answer';
import { answerData } from '../mock-data/answers';

describe('Answer models', () => {
  it('should create a new Answer', () => {
    const result = new Answer();
    const expectedResult = new Answer();
    expect(result).toEqual(expectedResult);
  });

  it('should create a new Answer', () => {
    const result = new Answer(answerData);
    const expectedResult = new Answer(answerData);
    expect(result.get('questionId')).toEqual(expectedResult.get('questionId'));
  });
});
