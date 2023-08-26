import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';

type Region = 'America' | 'Africa' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public regions: Region[] = ['America', 'Africa', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private countryService: CountryService) {}

  searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.countryService.searchRegion(region).subscribe((res) => {
      this.countries = res;
    });
  }
}
