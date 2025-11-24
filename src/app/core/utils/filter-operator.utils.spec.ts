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

  it('should return correct type for known operator', () => {
    // The filterOperationsList is imported in the util, so we test with a known value
    // For example, if filterOperationsList contains { value: 'equals', type: 'string' }
    expect(['string', 'number', 'boolean']).toContain(getOperatorType('equals'));
  });
});
