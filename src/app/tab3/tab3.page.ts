import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  
  isdisplayInfo: boolean;
  listeFilms = [];
  currentFilmToDisplay: number;

  constructor() {}

  ngOnInit(){
    
    this.isdisplayInfo = false;

    this.listeFilms[0] = {
      id: 1,
      titre: "Inception",
      date: "21 Juillet 2010",
      source: "https://www.telerama.fr/sites/tr_master/files/4b88fb8f-a1f8-4432-a222-17c30c201e6d_2.jpg",
      producteur: "Christopher Nolan",
    }
    this.listeFilms[1] = {
      id: 2,
      titre: "La guerre des étoiles",
      date: "19 octobre 1977",
      source: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRjqiljH7-NHwYJo0IEB3l-kxQPBrhUMox3Yx1DRF7Vc6lweYQP",
      producteur: "George Lucas",
    }
    this.listeFilms[2] = {
      id: 3,
      titre: "Ça",
      date: "5 septembre 2017",
      source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7hAv9GXsE4S9qzE60RY-EkQ0U5KLcNRrvRQSYlRs736PqS7WJ",
      producteur: "Andrés Muschietti",
    }
    this.listeFilms[3] = {
      id: 4,
      titre: "Retour vers le futur",
      date: "30 octobre 198",
      source: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSwMYtv4XLYfcCsZiv-Ay5XekYIY5zZP2RMlj68V9g68RAzbwiF",
      producteur: "Robert Zemeckis",
    }
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
