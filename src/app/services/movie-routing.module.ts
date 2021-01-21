import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieService } from './movie.service';

const routes: Routes = [
  {
    path: '',
    component: MovieService,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieServiceRoutingModule {}
