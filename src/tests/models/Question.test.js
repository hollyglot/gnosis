/* global it, describe, expect */
import Question from '../../models/Question';
import { toEntityList } from '../../models/BaseList';
import { questionData, questionsData } from '../mock-data/questions';

describe('Question models', () => {
  it('should create a new Question', () => {
    const result = new Question();
    const expectedResult = new Question();
    expect(result).toEqual(expectedResult);
  });

  it('should create a new Question', () => {
    const result = new Question(questionData);
    const expectedResult = new Question(questionData);
    expect(result).toEqual(expectedResult);
  });

  it('should create a new List<Question>() using toEntityList(Array, Entity)', () => {
    const result = toEntityList(questionsData, Question);
    const expectedResult = toEntityList(questionsData, Question);
    expect(result).toEqual(expectedResult);
  });
});
