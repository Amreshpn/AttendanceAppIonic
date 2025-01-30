import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceregularizatioPageRoutingModule } from './attendanceregularizatio-routing.module';

import { AttendanceregularizatioPage } from './attendanceregularizatio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceregularizatioPageRoutingModule
  ],
  declarations: [AttendanceregularizatioPage]
})
export class AttendanceregularizatioPageModule {}
