import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLicensePlateFormat]',
})
export class LicensePlateFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    const input = this.el.nativeElement;
    let value = event.target.value;

    // Remove any existing hyphens and convert to uppercase
    value = value.replace(/-/g, '').toUpperCase();

    // Apply the license plate format
    const formattedValue = this.formatLicensePlate(value);

    // Update the input value
    input.value = formattedValue;
    event.target.value = formattedValue;
  }

  private formatLicensePlate(value: string): string {
    if (value.length <= 2) {
      return value;
    }

    const firstPart = value.substring(0, 2);
    const secondPart = value.substring(2, 4);
    const thirdPart = value.substring(4);

    if (thirdPart) {
      return `${firstPart}-${secondPart}-${thirdPart}`;
    } else {
      return `${firstPart}-${secondPart}`;
    }
  }
}
