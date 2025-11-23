export interface CustomerEvents {
  events: CustomerEvent[];
}

export interface CustomerEvent {
  type: string;
  property: CustomerEventProperty;
}

export interface CustomerEventProperty {
  property: string;
  type: CustomerEventPropertyType;
}

export type CustomerEventPropertyType = 'string' | 'number';
