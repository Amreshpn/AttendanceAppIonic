import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeavedashboardpagePageRoutingModule } from './leavedashboardpage-routing.module';

import { LeavedashboardpagePage } from './leavedashboardpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeavedashboardpagePageRoutingModule
  ],
  declarations: [LeavedashboardpagePage]
})
export class LeavedashboardpagePageModule {}
