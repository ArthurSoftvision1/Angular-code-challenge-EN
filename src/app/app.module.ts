import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { SearchVehicleFormComponent } from './search-vehicle-form/search-vehicle-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LicensePlateFormatDirective } from './_directives/license-plate-format.directive';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { formReducer } from './store/reducers/form.reducers';
import { EffectsModule } from '@ngrx/effects';
import { FormEffects } from './store/effects/form.effects';

@NgModule({
  declarations: [
    AppComponent,
    SearchVehicleFormComponent,
    LicensePlateFormatDirective,
    DashboardComponent,
  ],
  imports: [
    StoreModule.forRoot({ appState: formReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Specifies how many states to keep in history
    }),
    EffectsModule.forRoot([FormEffects]),
    SharedModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
