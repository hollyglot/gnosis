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
    expect(result).toBeInstanceOf(Question);
    expect(result.get('id')).toEqual(questionData.id);
  });

  it('should create a new List<Question>() using toEntityList(Array, Entity)', () => {
    const result = toEntityList(questionsData, Question);
    expect(result.first()).toBeInstanceOf(Question);
    expect(result.size).toEqual(questionsData.length);
  });
});
