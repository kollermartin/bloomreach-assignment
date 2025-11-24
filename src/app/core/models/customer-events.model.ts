export interface CustomerEvents {
  events: CustomerEvent[];
}

export interface CustomerEvent {
  type: string;
  properties: CustomerEventProperty[];
}

export interface CustomerEventProperty {
  property: string;
  type: CustomerEventPropertyType;
}

export type CustomerEventPropertyType = 'string' | 'number';
