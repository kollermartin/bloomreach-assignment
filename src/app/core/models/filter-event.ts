export interface FilterEvent {
  type: string;
  property: FilterEventProperty;
}

export interface FilterEventProperty {
  property: string;
  type: FilterEventPropertyType;
}

export type FilterEventPropertyType = 'string' | 'number';
