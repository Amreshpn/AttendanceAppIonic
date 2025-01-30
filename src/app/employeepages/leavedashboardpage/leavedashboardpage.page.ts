import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-leavedashboardpage',
  templateUrl: './leavedashboardpage.page.html',
  styleUrls: ['./leavedashboardpage.page.scss'],
})
export class LeavedashboardpagePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  navigatetoLeavePage() {
    this.navCtrl.navigateForward('leavepage')
  }
}
