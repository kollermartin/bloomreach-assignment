import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface CustomerFilterForm {
  steps: FormArray<FormGroup<CustomerFilterStepForm>>;
}

export interface CustomerFilterStepForm {
  event: FormControl<string>;
}
