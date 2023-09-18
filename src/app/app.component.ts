import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedVehicleType: string = 'Auto'; // Initialize with a default value

  onVehicleTypeSelected(vehicleType: string) {
    this.selectedVehicleType = vehicleType;
    // You can now use this.selectedVehicleType as needed
  }
}
