import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class TableauxService {

  listeFilmsId = [];
  listeSeriesId = [];

  constructor(){ }

  ngOnInit(){
    
  }
  
  public addFilmsId(theIdFilm: number): void {

    if (!this.listeFilmsId.includes(theIdFilm))
      this.listeFilmsId.push(theIdFilm);

  }

  public getFilmsId() {
    return this.listeFilmsId;
  }

  public removeFilmsId(theIdFilm: number): void {

    for (let index = 0; index < this.listeFilmsId.length; index++) {

      if (this.listeFilmsId[index] == theIdFilm)
        this.listeFilmsId.splice(index, 1);

    }
  }

  public addSeriesId(theIdSerie: number): void {

    if (!this.listeSeriesId.includes(theIdSerie))
      this.listeSeriesId.push(theIdSerie);

  }
  
  public getSeriesId() {
    return this.listeSeriesId;
  }

  public removeSeriesId(theIdSerie: number): void {

    for (let index = 0; index < this.listeSeriesId.length; index++) {

      if (this.listeSeriesId[index] == theIdSerie)
        this.listeSeriesId.splice(index, 1);
      
    }
  }
  
}

