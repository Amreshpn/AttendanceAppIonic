import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeavepagePageRoutingModule } from './leavepage-routing.module';

import { LeavepagePage } from './leavepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeavepagePageRoutingModule
  ],
  declarations: [LeavepagePage]
})
export class LeavepagePageModule {}
