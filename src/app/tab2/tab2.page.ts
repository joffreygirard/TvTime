import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']/*,
  template: `
  <ion-content>
    <ion-slides pager="true" [options]="slideOpts">
      <ion-slide>
        <h1>FILMS À VOIR</h1>
      </ion-slide>
      <ion-slide>
        <h1>PROCHAINEMENT</h1>
      </ion-slide>
    </ion-slides>
  </ion-content>
`*/

})
export class Tab2Page {
  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor() {}

}
