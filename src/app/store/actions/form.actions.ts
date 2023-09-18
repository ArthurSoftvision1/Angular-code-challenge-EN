import { FormGroup } from '@angular/forms';
import { createAction, props } from '@ngrx/store';
import { Vehicle } from 'src/app/_models/Vehicle';

// Define the action type and payload
export const submitForm = createAction(
  '[Form] Submit Form',
  props<{ formData: Vehicle }>()
);

export const submitFormSuccess = createAction(
  '[Form] Submit Form Success',
  props<{ formData: Vehicle }>()
);

export const submitFormFailure = createAction(
  '[Form] Submit Form Failure',
  props<{ error: string }>()
);
