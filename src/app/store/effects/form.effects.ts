import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as FormActions from '../actions/form.actions';

@Injectable()
export class FormEffects {
  constructor(private actions$: Actions) {}

  submitForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.submitForm),
      switchMap((action) => {
        return of({}).pipe(
          map(() =>
            FormActions.submitFormSuccess({ formData: action.formData })
          ),
          catchError((error) => of(FormActions.submitFormFailure({ error })))
        );
      })
    )
  );
}
