import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmplyelandingtabPageRoutingModule } from './emplyelandingtab-routing.module';

import { EmplyelandingtabPage } from './emplyelandingtab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmplyelandingtabPageRoutingModule
  ],
  declarations: [EmplyelandingtabPage]
})
export class EmplyelandingtabPageModule {}
