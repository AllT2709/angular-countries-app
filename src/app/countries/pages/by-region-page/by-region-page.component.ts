import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = ['America', 'Africa', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStrore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStrore.byRegion.region;
  }

  searchByRegion(region: Region): void {
    this.isLoading = true;

    this.selectedRegion = region;
    this.countryService.searchRegion(region).subscribe((res) => {
      this.countries = res;
      this.isLoading = false;
    });
  }
}
