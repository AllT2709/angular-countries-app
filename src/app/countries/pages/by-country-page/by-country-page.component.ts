import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public term: string = '';

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStrore.byCountries.countries;
    this.term = this.countryService.cacheStrore.byCountries.term;
  }

  searchByCountry(country: string): void {
    this.isLoading = true;
    this.countryService.searchCountry(country).subscribe((res) => {
      this.countries = res;
      this.isLoading = false;
    });
  }
}
