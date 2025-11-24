import { buildAttributeListMap } from './customer-attribute.utils';
import { CustomerEventProperty } from '../models/customer-events.model';

describe('buildAttributeListMap', () => {
  it('should return an empty object if no argument is provided', () => {
    expect(buildAttributeListMap()).toEqual({});
  });

  it('should return an empty object if an empty array is provided', () => {
    expect(buildAttributeListMap([])).toEqual({});
  });

  it('should build a map from property to CustomerEventProperty', () => {
    const input: CustomerEventProperty[] = [
      { property: 'id', type: 'string' },
      { property: 'name', type: 'string' },
    ];
    const result = buildAttributeListMap(input);
    expect(result).toEqual({
      id: input[0],
      name: input[1],
    });
  });

  it('should handle duplicate properties by using the last occurrence', () => {
    const input: CustomerEventProperty[] = [
      { property: 'id', type: 'string' },
      { property: 'id', type: 'number' },
    ];
    const result = buildAttributeListMap(input);
    expect(result).toEqual({
      id: input[1],
    });
  });
});
