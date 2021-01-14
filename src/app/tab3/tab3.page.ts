import { Component, OnInit } from '@angular/core';
import { Tab2Page } from '../tab2/tab2.page';
import { MovieService } from '../services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  // TODO
  tab2= new Tab2Page();

  // atributs lié aux films
  isdisplayInfoFilm: boolean;
  listeFilms = [];
  currentFilmToDisplay: number;

  // atributs lié aux séries
  isdisplayInfoSerie: boolean;
  listeSeries = [];
  currentSerieToDisplay: number;

  // Search
  results: Observable<any>;
  searchTerm: string = '';
  type: string = "multi";

  /**
   * Constructor of our first page
   * @param movieService The movie Service to get data
   */
  constructor(private movieService: MovieService) { }

  // méthode lancee automatiquement qui affecte un valeur aux variables (ici la liste des films et séries par exemple)
  ngOnInit(){

    this.isdisplayInfoFilm = false;
    this.isdisplayInfoSerie = false;

    /*this.listeFilms[0] = {
      id: 0,
      titre: "Spider-Man: Homecoming",
      date: "28 juin 2017",
      source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT72uKlaQ_H8LDv6-iAdjjOH_V38w7oCtRAid9d7ievuVmJLDOG",
      realisateur: "Jon Watts",
      type: "Action/Aventure",
      duree: "2h 13m",
      acteurs: ["Tom Holland","Zendaya","Michael Keaton","Robert Downey Jr."],
      note: "4,3",
      synopsis: "Après ses spectaculaires débuts avec les Avengers, le jeune Peter Parker découvre peu à peu sa nouvelle identité, celle de Spider-Man, le superhéros lanceur de toile. Galvanisé par ses expériences précédentes, Peter rentre chez lui auprès de sa tante May, sous l'oeil attentif de son nouveau mentor, …",
    }
    this.listeFilms[1] = {
      id: 1,
      titre: "Joker",
      date: "2 octobre 2019",
      source: "https://fr.web.img6.acsta.net/pictures/19/09/03/12/02/4765874.jpg",
      realisateur: "Todd Phillips",
      type: "Crime/Drame",
      duree: "2h 2m",
      acteurs: ["Joaquin Phoenix","Robert De Niro","Zazie Beetz","Frances Conroy"],
      note: "4,5",
      synopsis: "Dans les années 1980, à Gotham City, Arthur Fleck, un comédien de stand-up raté est agressé alors qu'il ère dans les rues de la ville déguisé en clown. Méprisé de tous et bafoué, il bascule peu à peu dans la folie pour devenir le Joker, un dangereux tueur psychotique.",
    }

    this.listeSeries[0] = {
      id: 0,
      titre: "Stranger Things",
      date: "15 juillet 2016",
      source: "https://fr.web.img3.acsta.net/pictures/19/01/03/10/42/0987125.jpg",
      realisateur: "Matt Duffer, Ross Duffer",
      type: "Horreur",
      duree: "3 saisons",
      acteurs: ["Millie Bobby Brown","Finn Wolfhard","Noah Schnapp","Gaten Matarazzo","Caleb McLaughlin"],
      note: "4,9",
      synopsis: "En 1983, à Hawkins dans l'Indiana, Will Byers disparaît de son domicile. Ses amis se lancent alors dans une recherche semée d'embûches pour le retrouver. Pendant leur quête de réponses, les garçons rencontrent une étrange jeune fille en fuite.",
    }
    this.listeSeries[1] = {
      id: 1,
      titre: "Les 100",
      date: "19 mars 2014",
      source: "https://fr.web.img5.acsta.net/pictures/20/05/18/09/30/1101000.jpg",
      realisateur: "NETFLIX",
      type: "SF",
      duree: "7 saisons",
      acteurs: ["Eliza Taylor","Bob Morley","Marie Avgerop","Lindsey Morgan","Richard Harmon"],
      note: "4,7",
      synopsis: "Après une apocalypse nucléaire, les 318 survivants se réfugient dans des stations spatiales et parviennent à y vivre et à se reproduire, atteignant le nombre de 4000 ; 97 ans plus tard, une centaine de jeunes délinquants redescendent sur Terre.",
    }*/
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

  //Ajoute la série numéro "serieID" de la liste des films de TAB2
  addFilmToWatch(filmID) {
    this.isdisplayInfoFilm = false;
    
  }

  //Ajoute la série numéro "serieID" de la liste des séries de TAB1
  addSerieToWatch(serieID) {
    this.isdisplayInfoSerie = false;
    
  }

  searchChanged() {
    // Call our service function which returns an Observable
    this.results = this.movieService.searchData(this.searchTerm, this.type);
    console.log(this.type);

  }

}
