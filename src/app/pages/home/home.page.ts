import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  logo
  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) {

  }
  async close() {
    await this.modalCtrl.dismiss();
  }


  navigatetoattendanceregularization() {
    this.navCtrl.navigateForward('attendanceregularizatio')
  }
  navigatetoleavedashboardpage() {
    this.navCtrl.navigateForward('leavepage');
  }
  checkAvailableLeaves() {
    // this.navCtrl.navigateForward('')
    this.showaleart("Working in progress!!!")
  }

  async showaleart(msg) {
    this.alertCtrl
      .create({
        header: "BPHT Attendance",
        message: msg,
        buttons: ["OK"],
      })
      .then((res) => {
        res.present();
      });
  }
}
