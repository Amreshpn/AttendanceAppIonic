import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CalendarModal, CalendarModalOptions, DayConfig } from 'ion2-calendar';
import * as moment from 'moment';

@Component({
  selector: 'app-leavepage',
  templateUrl: './leavepage.page.html',
  styleUrls: ['./leavepage.page.scss'],
})
export class LeavepagePage implements OnInit {
  formData = {
    name: '',
    email: '',
    applyDate: '',
    daysLeave: '',
    daysWorkFromHome: '',
    subject: '',
    reasons: '',
    leaveDates: '',
    leave: false,
    workFromHome: false,
  };
  selectedDates: Date[] = [];
  inputSelected: boolean;
  constructor(private modalCtrl: ModalController,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  submitForm() {
    console.log('Form Data:', this.formData);
    // Add logic to submit the form data to your server or perform any desired action.
  }
  openDatePicker() {
    const options: CalendarModalOptions = {
      title: 'Select Leave Dates',
      pickMode: 'multi',
      defaultDates: this.selectedDates,
      from: new Date(),
    };

    const calendarModal = this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options },
    });

    calendarModal.then((modal) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((result) => {
      if (result.role === 'done') {
        const selectedDates: Date[] = result.data;
        this.selectedDates = selectedDates;
        this.updateLeaveDatesField();
      }
    });
  }
  updateLeaveDatesField() {
    const formattedDates = this.selectedDates.map(date => moment(date).format('YYYY-MM-DD'));
    this.formData.leaveDates = formattedDates.join(', ');
    console.log(formattedDates)
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
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
