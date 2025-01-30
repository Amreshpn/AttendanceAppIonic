import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapforattendancPage } from './mapforattendanc.page';

const routes: Routes = [
  {
    path: '',
    component: MapforattendancPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapforattendancPageRoutingModule {}
