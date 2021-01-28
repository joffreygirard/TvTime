import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { TableauxService } from '../service_tableaux/tableaux.service';
import { TabsPage } from '../tabs/tabs.page';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {

    segment: string;
    episodesAVoir = [];
    episodesAVenir = [];

    // Liste des series ajoutées depuis la page de recherche (récupère juste l'id de la serie)
    tabListeSeries = [];

    /**
     * Constructor of our first page
     * @param movieService The movie Service to get data
     * @param modalController
     * @param service
     * @param tabs
     */
    constructor(
        private movieService: MovieService,
        public modalController: ModalController,
        private service: TableauxService,
        private tabs: TabsPage
    ) { }


    ngOnInit() {
        /* Par défaut on arrive sur l'onglet épisode à voir */
        this.segment = 'aVoir';

        this.getSeries();
    }

    getSeries() {
        let thisMovieService = this.movieService;
        let thisEpisodesAVoir = this.episodesAVoir;
        let thisEpisodesAVenir = this.episodesAVenir;

        /* Pour chaque série on appel l'API pour récupérer les détails de la série, les saisons et les épisodes */
        this.tabListeSeries.forEach(function (value) {

            let serieDetails = thisMovieService.getSerieDetailsById(value);
            serieDetails.subscribe(data => {

                let networks = [];
                data["networks"].forEach(function (network) {
                    let net = {
                        id: network["id"],
                        logoPath: network["logo_path"],
                        name: network["name"],
                        originCountry: network["origin_country"],
                    }
                    networks.push(net);
                });

                /* Informations d'une série */
                let serie = {
                    id: data["id"],
                    name: data["name"],
                    firstAirDate: data["first_air_date"],
                    overview: data["overview"],
                    tagline: data["tagline"],
                    poster: data["poster_path"],
                    voteAverage: data["vote_average"],
                    networks: networks,
                };

                /* Récupère les épisodes à voir */
                for (let i = 1; i < data["number_of_seasons"]; i++) {
                    let seasonDetails = thisMovieService.getSeasonBySerieIdAndSeasonId(value, i);
                    seasonDetails.subscribe(season_data => {

                        season_data["episodes"].forEach(function (episode) {
                            let episodeAVoir = {
                                isVu: false,
                                episodeId: episode["id"],
                                seasonNumber: episode["season_number"],
                                episodeNumber: episode["episode_number"],
                                episodeName: episode["name"],
                                episodeOverview: episode["overview"],
                                airDate: episode["air_date"],
                                serie: serie,
                            };
                            thisEpisodesAVoir.push(episodeAVoir);
                        });
                    });
                }


                /* Récupère les épisodes à venir */
                if (data["next_episode_to_air"] !== null) {

                    let episodeAVenir = {
                        episodeId: data["next_episode_to_air"]["id"],
                        seasonNumber: data["next_episode_to_air"]["season_number"],
                        episodeNumber: data["next_episode_to_air"]["episode_number"],
                        episodeName: data["next_episode_to_air"]["name"],
                        episodeOverview: data["next_episode_to_air"]["overview"],
                        airDate: data["next_episode_to_air"]["air_date"],
                        serie: serie,
                    };
                    thisEpisodesAVenir.push(episodeAVenir);
                }
            });
        });
    }

    /* Fonction pour changer de tab (épisodes à voir / épisodes à venir) */
    segmentChanged(ev: any) {
        this.segment = ev.detail.value;
    }

    ionViewWillEnter(){
        // récupère le tableau des films à avoir
        this.tabListeSeries = this.service.getSeriesId();
        console.log(this.tabListeSeries);
        this.tabs.resetSerie();
        this.getSeries();
    }

    /* Fonction pour passer l'épisode en "vu" et le suprimer du tableau des épisodes à voir */
    setToSee(episodeIndex) {
        this.episodesAVoir[episodeIndex]["isVu"] = true;
    }

    /* Fonction pour ouvrir la modal et voir les détails d'une série et d'un épisode */
    async openModal(episode) {
        console.log(episode);
        const modal = await this.modalController.create({
            component: ModalPagePage,
            componentProps: {
                "episode": episode
            }
        });

        return await modal.present();
    }

}
