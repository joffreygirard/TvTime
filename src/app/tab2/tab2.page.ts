import { Component } from '@angular/core';
import { TableauxService } from '../service_tableaux/tableaux.service';
import { MovieService } from '../services/movie.service';
import { Observable ,Subject} from 'rxjs';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  // Initialisation variables
  listeFilmsAVoirId = []; // Get Id from tableaux.services.ts
  listeFilmsAVoirIdTmp = []; //
  results= [];

  // Film details variables
  isdisplayInfo: boolean;
  currentFilmToDisplay: number;
  tabFilms:string;
  
  // Liste des films ajouter depuis la page de recherche (récupère juste l'id du film)
  tabListeFilms: any[];


  searchTerm: string = '';
  today = new Date().getTime();


  /**
  * Constructor of our first page
  * @param movieService The movie Service to get data
  */
  constructor(private movieService: MovieService,private service: TableauxService,private tabs: TabsPage) {

  }

  ngOnInit(){
    this.tabFilms = 'aVoir';
  }

  // Function : Lorsque l'on ouvre la tab
  ionViewWillEnter(){
    // Récupère le tableau des films à avoir
    this.listeFilmsAVoirIdTmp = this.service.getFilmsId();
    // Trie
    let listeFilmsAVoirIdAdd = [];
    for (let index = 0; index < this.listeFilmsAVoirIdTmp.length; index++) {
      const theId = this.listeFilmsAVoirIdTmp[index];
      if (!this.listeFilmsAVoirId.includes(theId)) {​​​​
        this.listeFilmsAVoirId.push(theId);
        listeFilmsAVoirIdAdd.push(theId);
      }​​​​
    }

    // Ajoute
    let movieServiceAPI = this.movieService;
    let filmResults = this.results;

    listeFilmsAVoirIdAdd.forEach(function (value) {
        movieServiceAPI.getMovieData(value)
        .subscribe(data => filmResults.push(data));
    });

    this.tabs.resetFilm();

  }

  // Function : convertie date actuelle au format de l'API
  getDateTimeStamp(movieDate){
    movieDate = movieDate.split("-");
    var newDate = new Date( movieDate[0], movieDate[1] - 1, movieDate[2]);
    return newDate;
  }


  //lorsque l'on change d'onglet
  segmentChanged(ev: any) {
    this.tabFilms = ev.detail.value;
   console.log('Segment changed', ev);
 }

  //Afficher les détail d'un film
  displayInfo(idFilm) {
    this.isdisplayInfo = true;
    this.currentFilmToDisplay = idFilm;
  }

  //Fermer les détail du film
  undisplayInfo() {
    this.isdisplayInfo = false;
  }

}
