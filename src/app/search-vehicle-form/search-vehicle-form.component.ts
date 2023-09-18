import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { submitForm } from '../store/actions/form.actions';
import { BehaviorSubject } from 'rxjs';
import { Vehicle } from '../_models/Vehicle';
import {
  AutoSubtypes,
  MotorSubtypes,
  VehicleDetails,
  VehicleTypes,
} from '../app.constants';

@Component({
  selector: 'app-search-vehicle-form',
  templateUrl: './search-vehicle-form.component.html',
  styleUrls: ['./search-vehicle-form.component.css'],
})
export class SearchVehicleFormComponent implements OnInit {
  @Output() vehicleTypeSelected: EventEmitter<string> =
    new EventEmitter<string>();
  vehicleSubtypes: any;
  vehicleTypes = VehicleTypes;
  autoSubtypes = AutoSubtypes;
  motorSubtypes = MotorSubtypes;
  vehicle = VehicleDetails;

  form!: FormGroup;
  type!: string;

  private formDataSubject = new BehaviorSubject<Vehicle>({
    vehicleType: '',
    vehicleSubtype: '',
    licensePlate: '',
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<{ appState: { form: FormGroup } }>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      vehicleType: [this.vehicleTypes.Auto, Validators.required],
      vehicleSubtype: [this.autoSubtypes.Hatchback, Validators.required],
      licensePlate: [
        '',
        [Validators.required, this.licensePlateFormatValidator], // Use the custom validator
      ],
    });
  }

  onVehicleChange(event: Event, type: string) {
    // Emit the value to the parent or perform any other logic needed
    const selectedValue: string = (event.target as HTMLSelectElement).value;

    if (type === this.vehicle.VehicleType) {
      this.formDataSubject.next({
        ...this.formDataSubject.value, // Spread the existing values
        vehicleType: selectedValue, // Update only the vehicleType property
      });
      this.vehicleTypeSelected.emit(selectedValue);

      // Check if the selected value is 'Scooter' and disable/enable the vehicleSubtype control
      if (selectedValue === this.vehicleTypes.Scooter) {
        this.form.controls.vehicleSubtype.disable();
        this.form.controls.vehicleSubtype.setValue(null); // Set to null to select the placeholder option
      } else {
        this.form.controls.vehicleSubtype.enable();
        // Check if the selected value is 'Motor'
        if (selectedValue === this.vehicleTypes.Motor) {
          // Set the default selected value for 'Motor'
          this.form.controls.vehicleSubtype.setValue(
            this.motorSubtypes.AllRoad
          );
        } // Check if the selected value is 'Motor'
        else if (selectedValue === this.vehicleTypes.Auto) {
          // Set the default selected value for 'Auto'
          this.form.controls.vehicleSubtype.setValue(
            this.autoSubtypes.Hatchback
          );
        } else {
          // For other vehicle types, reset the options and disable the control
          this.form.controls.vehicleSubtype.setValue(null);
          this.form.controls.vehicleSubtype.disable();
          this.vehicleSubtypes = [];
        }
      }
    }

    if (type === this.vehicle.VehicleSubtype) {
      this.formDataSubject.next({
        ...this.formDataSubject.value, // Spread the existing values
        vehicleSubtype: selectedValue, // Update only the vehicleSubtype property
      });
    }

    if (type === this.vehicle.LicensePlate) {
      this.formDataSubject.next({
        ...this.formDataSubject.value, // Spread the existing values
        licensePlate: selectedValue, // Update only the licensePlate property
      });
    }
  }

  licensePlateFormatValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    // Define a regular expression for both expected formats (AA-14-BB and 12-AA-BB)
    const regex = /^([A-Z]{2}-\d{2}-[A-Z]{2}|^\d{2}-[A-Z]{2}-[A-Z]{2})$/i;

    if (!regex.test(value)) {
      // Return an error if the format is not valid
      return { invalidLicensePlateFormat: true };
    }

    // Return null if the format is valid
    return null;
  }

  // Implement the form submission function
  onSubmit() {
    if (this.form.invalid) {
      // Handle form validation errors here
      return;
    }

    this.formDataSubject.subscribe((formData) => {
      this.store.dispatch(submitForm({ formData }));
    });
  }
}
