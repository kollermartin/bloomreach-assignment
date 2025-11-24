export enum filterOperations {
  equals = 'equals',
  contains = 'contains',
  does_not_equal = 'does_not_equal',
  does_not_contain = 'does_not_contain',
  equal_to = 'equal_to',
  in_between = 'in_between',
  less_than = 'less_than',
  greater_than = 'greater_than',
}

export type FilterOperationType = 'string' | 'number';

export interface FilterOperation {
  label: string;
  value: filterOperations;
  type: FilterOperationType;
}

export const filterOperationsList: FilterOperation[] = [
  { label: 'equals', value: filterOperations.equals, type: 'string' },
  { label: 'does not equal', value: filterOperations.does_not_equal, type: 'string' },
  { label: 'contains', value: filterOperations.contains, type: 'string' },
  { label: 'does not contain', value: filterOperations.does_not_contain, type: 'string' },
  { label: 'equal to', value: filterOperations.equal_to, type: 'number' },
  { label: 'in between', value: filterOperations.in_between, type: 'number' },
  { label: 'less than', value: filterOperations.less_than, type: 'number' },
  { label: 'greater than', value: filterOperations.greater_than, type: 'number' },
];

export const stringFilterOperations = filterOperationsList.filter((op) => op.type === 'string');
export const numberFilterOperations = filterOperationsList.filter((op) => op.type === 'number');
