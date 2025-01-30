import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceregularizatioPage } from './attendanceregularizatio.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceregularizatioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceregularizatioPageRoutingModule {}
