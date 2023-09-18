// src/app/store/reducers/form.reducer.ts

import { FormState, initialState } from '../state/form.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as FormActions from '../actions/form.actions';

// Create a reducer for the form state
const _formReducer = createReducer(
  initialState,
  on(FormActions.submitFormSuccess, (state, { formData }) => ({
    ...state,
    formData: { ...formData },
  })),
);

// Export the form reducer function
export function formReducer(state: FormState | undefined, action: Action) {
  return _formReducer(state, action);
}
