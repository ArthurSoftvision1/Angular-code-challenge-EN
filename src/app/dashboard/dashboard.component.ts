import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  selectedVehicleType: string = 'Auto'; // Initialize with a default value

  onVehicleTypeSelected(vehicleType: string) {
    this.selectedVehicleType = vehicleType;
    // You can now use this.selectedVehicleType as needed
  }

}
