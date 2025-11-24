import { filterOperationsList } from '../models/filter.operations.model';
import { CustomerEventPropertyType } from '../models/customer-events.model';

// Build the lookup map once at module level
const operatorTypeMap: Record<string, CustomerEventPropertyType> = {};
filterOperationsList.forEach(op => {
  operatorTypeMap[op.value] = op.type;
});

export function getOperatorType(operator: string | null | undefined): CustomerEventPropertyType {
  if (!operator) {
    return 'string';
  }
  return operatorTypeMap[operator] ?? 'string';
}

