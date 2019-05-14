/* global it, describe, expect */
import * as utilities from '../../utilities/shuffle';

describe('shuffle utilities', () => {
  it('should shuffle array', () => {
    const arry = [1, 2, 3, 4];
    const shuffledArry = utilities.shuffleArray(arry.slice(0));
    expect(shuffledArry).not.toEqual(arry);
  });
});
