import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavParams
} from '@ionic/angular';

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
      private navParams: NavParams
  ) { }

  ngOnInit() {
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  /* Fermer la modal */
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}


