import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class MovieService {
    apiKey = '6230dbe84810f7836a642975af142575';
    defaultUrl = 'https://api.themoviedb.org/3';
    url = 'https://api.themoviedb.org/3/';
    language = 'fr-FR';

    search = '/search/';
    tv = '/tv/';
    tvSeasons = '/season/'


    /**
     * Constructor of the Service with Dependency Injection
     * @param http The standard Angular HttpClient to make requests
     */
    constructor(private http: HttpClient) { }

    /**
     * Get data from the TMDBApi
     * map the result to return only the results that we need
     *
     * @param {string} title Search Term
     * @param {string} type movie, series, episode or empty
     * @returns Observable with the search results
     */
    searchData(title: string, type: string): Observable<string[]> {
        return this.http.get(`${this.defaultUrl}${this.search}${type}?api_key=${this.apiKey}&language=${this.language}&query=${encodeURI(title)}`).pipe(
            map(results => results['results'])
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



    /**
     * Récupère les détails d'une série
     *
     * @param {any} id
     * @returns Observable with the search results
     */
    getSerieDetailsById(id: any) {
        id = id.toString();
        return this.http.get(`${this.defaultUrl}${this.tv}${id}?api_key=${this.apiKey}&language=${this.language}`);
    }

    /**
     * Récupère les détails d'une saison
     *
     * @param {any} serieId
     * @param {any} seasonId
     * @returns Observable with the search results
     */
    getSeasonBySerieIdAndSeasonId(serieId: any, seasonId: any) {
        serieId = serieId.toString();
        seasonId = seasonId.toString();
        return this.http.get(`${this.defaultUrl}${this.tv}${serieId}${this.tvSeasons}${seasonId}?api_key=${this.apiKey}&language=${this.language}`);
    }
}


