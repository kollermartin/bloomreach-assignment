import { filterOperationsList } from '../models/filter.operations.model';
import { CustomerEventPropertyType } from '../models/customer-events.model';

export function getOperatorType(operator: string | null | undefined): CustomerEventPropertyType {
  return filterOperationsList.find((operation) => operation.value === operator)?.type ?? 'string';
}
