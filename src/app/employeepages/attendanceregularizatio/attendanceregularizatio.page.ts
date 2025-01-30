import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-attendanceregularizatio',
  templateUrl: './attendanceregularizatio.page.html',
  styleUrls: ['./attendanceregularizatio.page.scss'],
})
export class AttendanceregularizatioPage implements OnInit {

  name: string
  employeeid
  applyDate
  inputSelected
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  changeInputBorder(type: boolean) {
    this.inputSelected = type;
  }
  cancelbtn() {
    this.navCtrl.navigateBack("emplyelandingtab");
  }
  submitbtn() {

  }
}
