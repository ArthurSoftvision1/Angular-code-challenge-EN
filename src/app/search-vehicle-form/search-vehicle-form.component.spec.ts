import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVehicleFormComponent } from './search-vehicle-form.component';

describe('SearchVehicleFormComponent', () => {
  let component: SearchVehicleFormComponent;
  let fixture: ComponentFixture<SearchVehicleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchVehicleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchVehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
