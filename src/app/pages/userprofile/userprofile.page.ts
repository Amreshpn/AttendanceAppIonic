import { Component, OnInit } from "@angular/core";
import { LoaderService } from "src/app/services/loader.service";
import { AuthService } from "src/app/services/auth.service";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import * as moment from "moment";
import {
  AlertController,
  ToastController,
  NavController,
  MenuController,
  ActionSheetController,
} from "@ionic/angular";
@Component({
  selector: "app-userprofile",
  templateUrl: "./userprofile.page.html",
  styleUrls: ["./userprofile.page.scss"],
})
export class UserprofilePage implements OnInit {

  companyName: String = ""
  name: string = "";
  dob: any = "";
  dp: any;
  //gender: number = 0;
  gender: any = "";
  loader: any;
  PrefferedLabID: any = "";
  ccount: any;
  cprofile: any[];
  btnusername: any;
  showmenu: any;
  age: any;
  logo: any;
  dateofleave: any;
  dateofjoine: any
  role: string;
  department: string
  emailID: string;
  employeeID: any;
  employeeName: any;
  constructor(
    public navCtrl: NavController,
    public ionLoader: LoaderService,
    public authService: AuthService,
    public alertController: AlertController,
    public toastController: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private photoViewer: PhotoViewer,
    private menu: MenuController
  ) {
    this.btnusername = true;
    var Role = window.localStorage.getItem("Role");
    // this.logo="http://elabcorpsupport.elabassist.com/images/profileimages/82f291bd-731f-416d-b855-e935dee62eb8.jpg";


    this.getUserProfile();
  }

  ionViewWillEnter() { }
  async viewImage() {
    await this.photoViewer.show(this.logo);
  }
  ngOnInit() { }
  async selectPicture() {
    const actionSheet = await this.actionSheetCtrl.create({
      mode: "ios",
      header: "Upload Picture",
      buttons: [
        {
          text: "Camera",
          icon: "camera",
          handler: async () => {
            console.log("Camera clicked");
            // await this.captureImage();
            await this.openCamera();
          },
        },
        {
          text: "Gallery",
          icon: "images",
          handler: async () => {
            console.log("Gallery clicked");
            // await this.takePicture(0);
            await this.pickImage();
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
  takePicture(type: number) {
    debugger;
    var options = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 60,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then((imageData) => {
      debugger;
      console.log("imageData+", imageData);
      this.logo = "data:image/jpeg;base64," + imageData;
      console.log("logo+", this.logo);
    });
  }
  openCamera() {
    var options = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 60,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then((imageData) => {
      // var base64Image = 'data:image/jpeg;base64,' + imageData;
      this.logo = "data:image/jpeg;base64," + imageData;
      // Here canvas is use for compreasing the images under 45 kb
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      canvas.width = 200;
      canvas.height = 200;
      var img = new Image();
      img.src = this.logo;
      (img.onload = () => {
        let imgWidth = img.width;
        let imgHeight = img.height;
        ctx.scale(canvas.width / imgWidth, canvas.height / imgHeight);
        ctx.drawImage(img, 0, 0);
        this.logo = canvas.toDataURL("image/jpeg");
        console.log("logo+", this.logo);
      }),
        (err) => {
          // Handle error
        };
    });
  }
  captureImage() {
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

  pickImage() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
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
  getUserProfile() {
    debugger;
    // this.ionLoader.showLoader();
    this.authService.getUserDetails().subscribe((res: any) => {
      var data = res.d;
      debugger;
      this.name = data.ShortName;
      let splt = data.DOB.split("-");
      let newdate = splt[2] + "-" + splt[1] + "-" + splt[0];
      const myDate = moment(newdate).toDate();
      this.dob = moment(myDate)
        .utcOffset(+330)
        .format();
      //this.dob = moment(data.DOB).toDate();
      this.gender = data.Gender;
      this.PrefferedLabID = data.PrefferedLabID;
      // this.ionLoader.hideLoader();
      this.age = data.Age;
      console.log("resp++", data);

      if (data.ProfileImageUrl == "") {
        this.logo == undefined;
      } else {
        var str = data.ProfileImageUrl;
        this.logo = str.replace("~", "http://elabcorpsupport.elabassist.com");
        //  this.dp="http://elabcorpsupport.elabassist.com"+data.ProfileImageUrl;
        console.log("logo", this.logo);
      }
    });
    // this.getUserDetails().then(data => {
    debugger;
  }
  onChangeGender(ev) {
    this.gender = ev.detail.value;
    debugger;
  }
  getAge(dateString) {
    debugger;
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.age = age;
    return age;
  }

  sucessAlert() {
    this.alertController
      .create({
        header: "BPHT Attendance",
        // subHeader: 'Subtitle for alert',
        message: "Profile Updated Sucessfully..!!",
        buttons: ["OK"],
      })
      .then((res) => {
        res.present();
      });
  }
  failedAlert() {
    this.alertController
      .create({
        header: "BPHT Attendance",
        // subHeader: 'Subtitle for alert',
        message: "Something Is Wrong",
        buttons: ["OK"],
      })
      .then((res) => {
        res.present();
      });
  }
}
