import { Component } from '@angular/core';
import { TableauxService } from '../service_tableaux/tableaux.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  //Initialisation variables
  listeFilmsAVoir = [];
  isdisplayInfo: boolean;
  currentFilmToDisplay: number;
  tabFilms:string;
  
// Liste des films ajouter depuis la page de recherche (récupère juste l'id du film)
  tabListeFilms: any[];


  //lorsque l'on change d'onglet
  segmentChanged(ev: any) {
    this.tabFilms = ev.detail.value;
   console.log('Segment changed', ev);
 }

  constructor(private service: TableauxService) {
    // récupère le tableau des films à avoir
    this.tabListeFilms = this.service.getFilmsId();
    console.log(this.tabListeFilms);
  }


  ngOnInit(){
    this.tabFilms = 'aVoir';
    // Tableau de films
    this.listeFilmsAVoir[0] = {
      id: 1,
      titre: "Inception",
      date: "21 Juillet 2010",
      source: "https://www.telerama.fr/sites/tr_master/files/4b88fb8f-a1f8-4432-a222-17c30c201e6d_2.jpg",
      producteur: "Christopher Nolan",
    }
    this.listeFilmsAVoir[1] = {
      id: 2,
      titre: "La guerre des étoiles",
      date: "19 octobre 1977",
      source: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRjqiljH7-NHwYJo0IEB3l-kxQPBrhUMox3Yx1DRF7Vc6lweYQP",
      producteur: "George Lucas",
    }
    this.listeFilmsAVoir[2] = {
      id: 3,
      titre: "Ça",
      date: "5 septembre 2017",
      source: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7hAv9GXsE4S9qzE60RY-EkQ0U5KLcNRrvRQSYlRs736PqS7WJ",
      producteur: "Andrés Muschietti",
    }
    this.listeFilmsAVoir[3] = {
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
