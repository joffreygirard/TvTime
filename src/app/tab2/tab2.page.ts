import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Observable ,Subject} from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  //Initialisation variables
  listeFilmsAVoir = [436622, 436621, 436620, 436651, 436648, 526896];
  isdisplayInfo: boolean;
  currentFilmToDisplay: number;
  tabFilms:string;

 // Search
 results= [];
 searchTerm: string = '';

   today = new Date().getTime();

 /**
  * Constructor of our first page
  * @param movieService The movie Service to get data
  */
 constructor(private movieService: MovieService) { }

  ngOnInit(){
    this.tabFilms = 'aVoir';
    console.log(this.today);


    let movieServiceAPI = this.movieService;
    let filmResults = this.results;

    this.listeFilmsAVoir.forEach(function (value) {
        movieServiceAPI.getMovieData(value)
        .subscribe(data => filmResults.push(data));
    });

    console.log(this.results);


  }

  getDateTimeStamp(movieDate){
    //console.log("Date avant parse : "+movieDate);
    movieDate = movieDate.split("-");
    var newDate = new Date( movieDate[0], movieDate[1] - 1, movieDate[2]);
    //console.log("Ma nouvelle date : " + newDate);

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
