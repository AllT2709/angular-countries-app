import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public term: string = '';

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStrore.byCapital.countries;
    this.term = this.countryService.cacheStrore.byCapital.term;
  }

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.countryService.searchCapital(term).subscribe((res) => {
      this.countries = res;
      this.isLoading = false;
    });
  }
}
