import { Component } from '@angular/core';
import { TableauxService } from '../service_tableaux/tableaux.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private service: TableauxService) {}

  filmsAjoute: number;
  seriesAjoute: number;

  ngOnInit(){

    this.filmsAjoute = 0;
    this.seriesAjoute = 0;

  }

  ajouterFilmBadge(){
    this.filmsAjoute++;
  }

  ajouterSerieBadge(){
    this.seriesAjoute++;
  }

  resetFilm(){
    this.filmsAjoute = 0;
  }

  resetSerie(){
    this.seriesAjoute = 0;
  }
}
