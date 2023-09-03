import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, map, tap, pipe } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiURl: string = 'https://restcountries.com/v3.1';

  public cacheStrore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorege();
  }

  private saveToLocalStorege() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStrore));
  }
  private loadFromLocalStorege() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStrore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searhCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiURl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiURl}/capital/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStrore.byCapital = { term, countries })),
      tap(() => this.saveToLocalStorege())
    );
  }
  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiURl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStrore.byCountries = { term, countries })),
      tap(() => this.saveToLocalStorege())
    );
  }
  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiURl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStrore.byRegion = { region, countries })),
      tap(() => this.saveToLocalStorege())
    );
  }
}
