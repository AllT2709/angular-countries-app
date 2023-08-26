import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, map, delay } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiURl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([]))
      // delay(2000)
    );
  }

  searhCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiURl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiURl}/capital/${term}`;
    return this.getCountriesRequest(url);
  }
  searchCountry(counry: string): Observable<Country[]> {
    const url = `${this.apiURl}/name/${counry}`;
    return this.getCountriesRequest(url);
  }
  searchRegion(region: string): Observable<Country[]> {
    const url = `${this.apiURl}/region/${region}`;
    return this.getCountriesRequest(url);
  }
}
