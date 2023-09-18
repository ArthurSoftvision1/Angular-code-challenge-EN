import { createSelector, createFeatureSelector } from '@ngrx/store';

const selectFormState = createFeatureSelector('form');

export const selectFormData = createSelector(
  selectFormState,
  (state: any) => state.form
);
