import { Component } from '@angular/core';
import { TableauxService } from '../service_tableaux/tableaux.service';
import { MovieService } from '../services/movie.service';
import { Observable ,Subject} from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  // Initialisation variables
  listeFilmsAVoirId = []; // Get Id from tableaux.services.ts
  results = [];

  // Film details variables
  isdisplayInfoFilm: boolean;
  currentFilmToDisplay: number;
  currentFilmToDisplayData: []; // TODO
  tabFilms:string;
  today = new Date().getTime();


  /**
  * Constructor of our first page
  * @param movieService The movie Service to get data
  */
  constructor(private movieService: MovieService,private service: TableauxService) {
  }

  // Fonction : Au premier affichage de la Tab
  ngOnInit(){
    this.tabFilms = 'aVoir';
    this.isdisplayInfoFilm = false;
  }


  // Fonction : A chaque ouverture de la tab
  ionViewWillEnter(){
    this.getMoviesFromService();
  }

  getMoviesFromService() {
    this.results = []; // On reset le tableau de films
    this.listeFilmsAVoirId = this.service.getFilmsId(); // On recupere l'id des films à voir

    //
    let resultsTMP = [];
    let movieServiceAPI = this.movieService;

    // On récupère les informations des films grâce à leur id
    this.listeFilmsAVoirId.forEach(function (value) {
        movieServiceAPI.getMovieData(value)
        .subscribe(data => resultsTMP.push(data));
    });
    this.results = resultsTMP;
  }

  // Foncion : convertie date actuelle au format de l'API
  getDateTimeStamp(movieDate){
    movieDate = movieDate.split("-");
    var newDate = new Date( movieDate[0], movieDate[1] - 1, movieDate[2]);
    return newDate;
  }


  // Fonction : lorsque l'on change d'onglet (A voir et A venir)
  segmentChanged(ev: any) {
    this.tabFilms = ev.detail.value;
    console.log("tabFilms " + this.tabFilms);

    // console.log('Segment changed', ev);
 }

  // Fonction : Afficher les détail d'un film
  displayInfoFilm(idFilm) {
    this.isdisplayInfoFilm = true;
    this.currentFilmToDisplay = idFilm;
    console.log("on affiche "+ this.currentFilmToDisplay);

  }
  // Fonction : Fermer les détail du film
  undisplayInfoFilm() {
    this.isdisplayInfoFilm = false;
    console.log("plus affiché : " + this.currentFilmToDisplay);
  }

  //Retire le film numéro "filmID" de la liste des films de TAB2
  removeFilmToWatch(filmID) {
    this.isdisplayInfoFilm = false;
    this.service.removeFilmsId(filmID);
    this.getMoviesFromService();
    console.log("tabFilms " + this.tabFilms);

  }

}
