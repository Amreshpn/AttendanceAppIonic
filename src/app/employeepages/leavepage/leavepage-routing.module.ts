import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeavepagePage } from './leavepage.page';

const routes: Routes = [
  {
    path: '',
    component: LeavepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavepagePageRoutingModule {}
