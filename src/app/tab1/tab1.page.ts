import { Component, OnInit } from '@angular/core';
import { TableauxService } from '../service_tableaux/tableaux.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {
  segment: string;
  episodesAVoir = [];

  // Liste des series ajouter depuis la page de recherche (récupère juste l'id de la serie)
  tabListeSeries: any[];

  constructor(private service: TableauxService) {}

  ngOnInit() {
    /* Par défaut on arrive sur l'onglet épisode à voir */
    this.segment = 'aVoir';
    /* Tableau des épisodes à voir */
    this.episodesAVoir = [
      {
        serieId: 1,
        serieName: 'The Walking Dead',
        seasonNumber: 10,
        episodeNumber: 6,
        episodeName: 'Épisode 10',
      },
      {
        serieId: 2,
        serieName: 'The Umbrella Academy',
        seasonNumber: 1,
        episodeNumber: 8,
        episodeName: 'Épisode 8',
      },
      {
        serieId: 3,
        serieName: 'Peaky Blinders',
        seasonNumber: 1,
        episodeNumber: 2,
        episodeName: 'Épisode 2',
      },
      {
        serieId: 4,
        serieName: 'The 100',
        seasonNumber: 5,
        episodeNumber: 6,
        episodeName: 'Épisode 6',
      },
    ];
  }

  ionViewWillEnter(){
    // récupère le tableau des films à avoir
    this.tabListeSeries = this.service.getSeriesId();
    console.log(this.tabListeSeries);
  }

  /* Fonction pour changer de tab (épisodes à voir / épisodes à venir) */
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  /* Fonction pour passer l'épisode en "vu" et le suprimer du tableau des épisodes à voir */
  setToSee(episode) {
    console.log(episode);
    this.episodesAVoir.splice(episode, 1);
  }

}
