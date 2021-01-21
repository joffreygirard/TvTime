import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class TableauxService {

  listeFilmsId = [];

  constructor(){ }

  ngOnInit(){

  }

  public addFilmsId(theId: number): void {​​​​
       if (!this.listeFilmsId.includes(theId)) {​​​​
         this.listeFilmsId.push(theId);
       }​​​​
   }​​​​

  public getFilmsId() {
    return this.listeFilmsId;
  }
}
