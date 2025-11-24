import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface CustomerFilterForm {
  steps: FormArray<FormGroup<CustomerFilterStepForm>>;
}

export interface CustomerFilterStepForm {
  event: FormControl<string>;
  attributes: FormArray<FormGroup<CustomerFilterAttributeForm>>;
}

export interface CustomerFilterAttributeForm {
  property: FormControl<string | null>;
  operator: FormControl<string | null>;
  value: FormControl<string | number | null>;
  valueFrom: FormControl<number | null>;
  valueTo: FormControl<number | null>;
}

export interface CustomerFilterFormValue {
  steps: CustomerFilterFormStepValue[];
}

export interface CustomerFilterFormStepValue {
  event: string;
  attributes: CustomerFilterFormAttributeValue[];
}

export interface CustomerFilterFormAttributeValue {
  property: string | null;
  value: string | number | null;
  operator: string | null;
}
