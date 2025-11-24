import { CustomerEventProperty } from '../models/customer-events.model';

export function buildAttributeListMap(attributeListOptions?: CustomerEventProperty[]): Record<string, CustomerEventProperty> {
  if (!attributeListOptions) {
    return {};
  }
  return attributeListOptions.reduce((acc, curr) => {
    acc[curr.property] = curr;
    return acc;
  }, {} as Record<string, CustomerEventProperty>);
}

