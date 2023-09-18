import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface FormState {
  form: FormGroup;
}

// Define the initial state
export const initialState: FormState = {
  form: new FormGroup({
    vehicleType: new FormControl('', [Validators.required]),
    vehicleSubtype: new FormControl('', [Validators.required]),
    licensePlate: new FormControl('', [Validators.required]),
  }),
};
