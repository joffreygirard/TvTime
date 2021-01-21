import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url = 'https://api.themoviedb.org/3/';
  apiKey = '6230dbe84810f7836a642975af142575';

  /**
   * Constructor of the Service with Dependency Injection
   * @param http The standard Angular HttpClient to make requests
   */
  constructor(private http: HttpClient) { }

    /**
  * Get data from the OmdbApi
  * map the result to return only the results that we need
  *
  * @param {string} title Search Term
  * @param {SearchType} type movie, series, episode or empty
  * @returns Observable with the search results
  */
  searchData(title: string, type: string): Observable<string[]> {
    return this.http.get(`${this.url}search/${type}?api_key=${this.apiKey}&language=fr&query=${encodeURI(title)}`).pipe(
      map(results => results['results'])
      //https://api.themoviedb.org/3/search/movie?api_key=6230dbe84810f7836a642975af142575&language=fr&query=
    );
  }

  /**
  * Get data from the OmdbApi
  * map the result to return only the results that we need
  *
  * @param {string} idMovie Search Term
  * @returns Observable with the search results
  */
  getMovieData(idMovie: string) {
    return this.http.get(`${this.url}movie/${idMovie}?api_key=${this.apiKey}&language=fr`)
  }

}

/* React native
export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}
*/
