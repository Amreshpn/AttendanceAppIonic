import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HolydaycalenderPageRoutingModule } from './holydaycalender-routing.module';

import { HolydaycalenderPage } from './holydaycalender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HolydaycalenderPageRoutingModule
  ],
  declarations: [HolydaycalenderPage]
})
export class HolydaycalenderPageModule {}
