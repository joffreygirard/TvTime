import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { TableauxService } from '../service_tableaux/tableaux.service';
import { TabsPage } from '../tabs/tabs.page';
import { ToastController } from '@ionic/angular';

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
     * @param toastController
     * @param service
     * @param tabs
     */
    constructor(
        private movieService: MovieService,
        public modalController: ModalController,
        public toastController: ToastController,
        private service: TableauxService,
        private tabs: TabsPage
    ) { }


    ngOnInit() {
        /* Par défaut on arrive sur l'onglet épisode à voir */
        this.segment = 'aVoir';
    }

    getEpisodes() {
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
        this.init();
    }

    /* On initialise les tableaux de séries et d'épisodes */
    init() {
        // récupère le tableau des films à avoir
        this.tabListeSeries = this.service.getSeriesId();
        console.log(this.tabListeSeries);
        this.tabs.resetSerie();
        this.episodesAVoir = [];
        this.episodesAVenir = [];
        this.getEpisodes();
    }

    /* Fonction pour passer l'épisode en "vu" */
    setToSee(episodeIndex) {
        this.episodesAVoir[episodeIndex]["isVu"] = true;
        this.presentToast("Épisode marqué comme vu");
    }

    /* Affichage d'un message */
    async presentToast(message) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });

        return await toast.present();
    }

    /* Fonction pour ouvrir la modal et voir les détails d'une série et d'un épisode */
    async openModal(episode) {
        const modal = await this.modalController.create({
            component: ModalPagePage,
            componentProps: {
                "episode": episode
            }
        });

        // On rafraichit la page à la fermeture du modal
        let this1 = this;
        modal.onDidDismiss().then(function (reload) {
            if (reload.data) {
                this1.init();
            }
        });

        return await modal.present();
    }

}
