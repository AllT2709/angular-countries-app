import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent {
  public countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  searchByCountry(country: string): void {
    this.countryService.searchCountry(country).subscribe((res) => {
      this.countries = res;
    });
  }
}
