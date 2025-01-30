import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../../services/auth.service";
import { NavparamService } from "./../../services/navparam.service";
import { Storage } from "@ionic/storage";
import {
  MenuController,
  ModalController,
  LoadingController,
  NavController,
  ToastController,
  AlertController,
} from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";


@Component({
  selector: 'app-attendancepageemp',
  templateUrl: './attendancepageemp.page.html',
  styleUrls: ['./attendancepageemp.page.scss'],
})
export class AttendancepageempPage implements OnInit {

  isPunchedIn: any;
  isPunchedOut: any;
  logo: any;
  name: string = "";
  btnusername: any;
  selectedAddress: any;
  selectedLatLong: any;
  fromDate: any;
  time: any;
  Mindate: any;
  timeDateIn: any;
  timeDateOut: any;
  constructor(
    public navparamsrv: NavparamService,

    public authService: AuthService,
    public storage: Storage,
    private navCtrl: NavController,

    public modalCtrl: ModalController,
    public toastController: ToastController,
    private camera: Camera,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1);
    this.fromDate = localISOTime; // new Date(localISOTime).toISOString();
    console.log("fromDate", this.fromDate);

    let date = this.fromDate.split("T")[0];
    let time = this.fromDate.split("T")[1];
    let ftime = time.split(".")[0];
    this.Mindate = date + " " + ftime;
    console.log("Mindate", this.Mindate);
    this.time = localISOTime;
    this.btnusername = true;

    let checkTimeIn = window.localStorage.getItem("CheckTimeIn");
    this.isPunchedIn = true;
    this.isPunchedOut = true;
    debugger;
    if (date != checkTimeIn) {
      window.localStorage.removeItem("CheckTimeIn");
      this.isPunchedIn = false;
      this.isPunchedOut = true;
    } else {
      debugger;
      this.isPunchedIn = true;
      this.isPunchedOut = false;
    }
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    debugger;
    if (this.navparamsrv.getNavData() !== 0) {
      this.selectedAddress = this.navparamsrv.getNavData().address;
      this.selectedLatLong = this.navparamsrv.getNavData().latlng;
      this.navparamsrv.clearNavData();
    }
  }

  async timeIn(id, msg) {
    if (this.logo == undefined || this.logo == null) {

      this.captureImage()
    } else if (this.selectedAddress === undefined || this.selectedAddress === '') {
      this.selectLocationfromMap()
    }
    else {

      this.authService.timeInOutAttendance(id, this.name, this.Mindate, this.selectedAddress, this.logo == undefined ? "" : this.logo).subscribe(
        async (data: any) => {
          debugger;
          console.log(data);

          if (data.d == -1) {
            this.alertController.create({
              header: 'BPHT Attendance',
              // subHeader: 'Subtitle for alert',
              message: 'Attendance has already been recorded',
              buttons: ['OK']
            }).then(res => {
              res.present();
            });
          }
          else {
            if (data.d == 1) {
              debugger;

              if (id == 1) {
                window.localStorage.setItem("CheckTimeIn", this.fromDate.split("T")[0]);
                this.isPunchedIn = true;
                this.isPunchedOut = false;
              } else {
                window.localStorage.removeItem("CheckTimeIn");
                this.isPunchedIn = false;
                this.isPunchedOut = true;
              }

              const toast = await this.toastController.create({
                message: msg,
                duration: 3000
              });
              toast.present();
            }
            else {
              const toast = await this.toastController.create({
                message: "Something Is Wrong",
                duration: 2000
              });
              toast.present();
            }
          }
        },
        (error: any) => {
          // this.toastService.presentToast('Network Issue.');
        }

      );
    }
    debugger;
  }

  //Capture Image is used for capchuring camera  wen we click on camera button
  captureImage() {
    debugger;

    var options = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 60,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // var base64Image = 'data:image/jpeg;base64,' + imageData;
        this.logo = "data:image/jpeg;base64," + imageData;
        // Here canvas is use for compreasing the images under 45 kb
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = 200;
        canvas.height = 200;
        var img = new Image();
        img.src = this.logo;
        img.onload = () => {
          let imgWidth = img.width;
          let imgHeight = img.height;
          ctx.scale(canvas.width / imgWidth, canvas.height / imgHeight);
          ctx.drawImage(img, 0, 0);
          this.logo = canvas.toDataURL("image/jpeg");
          console.log("logo+", this.logo);
        };
      },
      (err) => {
        // Handle error
      }
    );
  }
  selectLocationfromMap() {
    debugger;
    this.navCtrl.navigateForward("mapforattendanc");
  }
}
