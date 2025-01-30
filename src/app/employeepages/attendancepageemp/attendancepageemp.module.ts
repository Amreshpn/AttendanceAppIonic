import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendancepageempPageRoutingModule } from './attendancepageemp-routing.module';

import { AttendancepageempPage } from './attendancepageemp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancepageempPageRoutingModule
  ],
  declarations: [AttendancepageempPage]
})
export class AttendancepageempPageModule {}
