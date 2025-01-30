import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeavedashboardpagePage } from './leavedashboardpage.page';

const routes: Routes = [
  {
    path: '',
    component: LeavedashboardpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavedashboardpagePageRoutingModule {}
