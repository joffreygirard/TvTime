import { Component, OnInit } from '@angular/core';
import { Tab2Page } from '../tab2/tab2.page';
import { MovieService } from '../services/movie.service';
import { TableauxService } from '../service_tableaux/tableaux.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  // attributs lié aux films
  isdisplayInfoFilm: boolean;
  currentFilmToDisplay: number;
  tabFilms= [];

  // attributs lié aux séries
  isdisplayInfoSerie: boolean;
  currentSerieToDisplay: number;
  tabSeries= [];

  // attributs lié à la recherche
  results: Observable<any>;
  searchTerm: string = '';
  type: string = "multi";

  /**
   * Constructor of our first page
   * @param movieService The movie Service to get data
   */
  constructor(private movieService: MovieService,private service: TableauxService) { }

  // méthode lancee automatiquement qui affecte un valeur aux variables (ici la liste des films et séries par exemple)
  ngOnInit(){

    this.isdisplayInfoFilm = false;
    this.isdisplayInfoSerie = false;

  }

  //Afficher les détail d'un film passé en paramètre
  displayInfoFilm(idFilm) {
    this.isdisplayInfoFilm = true;
    this.currentFilmToDisplay = idFilm;
  }

  //Fermer les détail du film
  undisplayInfoFilm() {
    this.isdisplayInfoFilm = false;
  }

  //Afficher les détail d'une série passé en paramètre
  displayInfoSerie(idSerie) {
    this.isdisplayInfoSerie = true;
    this.currentSerieToDisplay = idSerie;
  }

  //Fermer les détail de la série
  undisplayInfoSerie() {
    this.isdisplayInfoSerie = false;
  }

  //Ajoute le film numéro "filmID" de la liste des films de TAB2
  addFilmToWatch(filmID) {
    this.isdisplayInfoFilm = false;
    this.service.addFilmsId(filmID);
  }

  //Retire le film numéro "filmID" de la liste des films de TAB2
  removeFilmToWatch(filmID) {
    this.isdisplayInfoFilm = false;
    this.service.removeFilmsId(filmID);
  }

  //Ajoute la série numéro "serieID" de la liste des séries de TAB1
  addSerieToWatch(serieID) {
    this.isdisplayInfoSerie = false;
    this.service.addSeriesId(serieID);
    
  }

  //Retire la série numéro "filmID" de la liste des séries de TAB2
  removeSerieToWatch(serieID) {
    this.isdisplayInfoSerie = false;
    this.service.removeSeriesId(serieID);
  }

  searchChanged() {
    // Fonction du service movie et retourne un observable
    this.results = this.movieService.searchData(this.searchTerm, this.type);
  }

  ionViewWillEnter(){
    // récupère le tableau des films à avoir
    this.tabFilms = this.service.getFilmsId();
    this.tabSeries = this.service.getSeriesId();
  }
}
