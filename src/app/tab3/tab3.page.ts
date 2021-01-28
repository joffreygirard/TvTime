import { Component, OnInit } from '@angular/core';
import { Tab2Page } from '../tab2/tab2.page';
import { TabsPage } from '../tabs/tabs.page';
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
   * @param movieService Le Service "Movie" pour récupérer les données de notre API
   */
  constructor(private movieService: MovieService,private service: TableauxService,private tabs: TabsPage) { }

  // Méthode lancée automatiquement qui affecte un valeur aux variables
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

  //Ajoute le film numéro "filmID" de la liste des films du Service
  addFilmToWatch(filmID) {
    this.isdisplayInfoFilm = false;
    this.service.addFilmsId(filmID);
    this.tabs.ajouterFilmBadge();
  }

  //Retire le film numéro "filmID" de la liste des films du Service
  removeFilmToWatch(filmID) {
    this.isdisplayInfoFilm = false;
    this.service.removeFilmsId(filmID);
  }

  //Ajoute la série numéro "serieID" de la liste des séries du Service
  addSerieToWatch(serieID) {
    this.isdisplayInfoSerie = false;
    this.service.addSeriesId(serieID);
    this.tabs.ajouterSerieBadge();
  }

  //Retire la série numéro "filmID" de la liste des séries du Service
  removeSerieToWatch(serieID) {
    this.isdisplayInfoSerie = false;
    this.service.removeSeriesId(serieID);
  }

  // Fonction du service movie et retourne un observable
  searchChanged() {
    this.results = this.movieService.searchData(this.searchTerm, this.type);
  }

  // Rafraichi la liste des tableaux des films et séries à avoir
  ionViewWillEnter(){
    this.tabFilms = this.service.getFilmsId();
    this.tabSeries = this.service.getSeriesId();
  }
}
