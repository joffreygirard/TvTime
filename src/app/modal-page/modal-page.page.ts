import { Component, OnInit } from '@angular/core';
import {ModalController,} from '@ionic/angular';
import {TableauxService} from "../service_tableaux/tableaux.service";

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  modalTitle: string;
  modelId: number;

  constructor(
      private modalController: ModalController,
      private service: TableauxService,
  ) { }

  ngOnInit() {}

  /* Retirer une série de la liste */
  removeSerieToWatch(serieID) {
    this.service.removeSeriesId(serieID);
    this.closeModal(true);
  }

  /* Fermer la modal */
  async closeModal(reload = false) {
    await this.modalController.dismiss(reload);
  }

}


