import { getOperatorType } from './filter-operator.utils';

describe('getOperatorType', () => {
  it('should return "string" if operator is null', () => {
    expect(getOperatorType(null)).toBe('string');
  });

  it('should return "string" if operator is undefined', () => {
    expect(getOperatorType(undefined)).toBe('string');
  });

  it('should return "string" if operator is not in the map', () => {
    expect(getOperatorType('not-an-operator')).toBe('string');
  });
});
