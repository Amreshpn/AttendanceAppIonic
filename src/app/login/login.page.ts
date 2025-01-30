import { Component } from "@angular/core";
import {
  AlertController,
  LoadingController,
  NavController,
  MenuController,
  Platform,
} from "@ionic/angular";
import { AppServices } from "../../app/services.component";
import { AuthService } from "./../services/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "../services/loader.service";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { FirebaseService } from "src/app/services/firebase.service";
import { ToastService } from "src/app/services/toast.service";
import { EventemitterService } from "src/app/services/eventemitter.service";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";


@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {
  username: string;
  password: string;
  loader: any;
  inputSelected: boolean;
  passSelected: boolean;
  passIconType: string = "";
  passwordtoggle: "eye";
  CreditBalance: any;
  CreditLimit: any;
  IsAcive: any;
  IsActiveRegn: any;
  BillingType: any;

  showpassword = false;
  constructor(
    public loadingCtrl: LoadingController,
    private platform: Platform,
    private fcm: FCM,
    private menu: MenuController,
    public router: Router,
    public ionLoader: LoaderService,
    private navCtrl: NavController,
    public alertController: AlertController,
    private authService: AuthService,
    public appServices: AppServices,
    public androidPermissions: AndroidPermissions,
    private firebasesrv: FirebaseService,
  ) {
    /////// Set User Name and Password
    this.inputSelected = false;
    this.passSelected = false;
    var UserFID = window.localStorage.getItem("UserFID");
    debugger;
    if (UserFID == undefined || UserFID == null) {
      this.navCtrl.navigateRoot('login');
    } else {
      var Role = window.localStorage.getItem("Role");
      switch (Role) {
        case "Patient":
          // this.menu.enable(true, "patient");
          this.navCtrl.navigateRoot("emplyelandingtab");
          break;
        case "Admin":
          this.menu.enable(true, "admin");
          this.navCtrl.navigateRoot("dashboard");
          break;
      }
    }
    this.username = window.localStorage.getItem("UserName");
    this.password = window.localStorage.getItem("Password");
    if (this.password === null) {
      this.password = "";
    }
    this.checkUpdate();
  }


  checkUpdate() {
    this.authService.checkforUpdate().subscribe(
      (data: any) => {
        debugger;
        console.log("update+", data);
        debugger;
        const Version = 6;
        if (Version < data[0].version) {
          this.alertController
            .create({
              header: "BPHT Attendance",

              message: "You are using an old version app Please Update App.",
              buttons: [
                {
                  text: "Ok Update",
                  handler: () => {
                    this.forcceupdate();

                    this.platform.ready().then(() => {
                      window.open("market://details?id=com.bluepearl.attendancebpht", "_system");
                    });
                  },
                },
              ],
            })
            .then((res) => {
              res.present();
            });

        }
      }
    );
  }

  forcceupdate() {
    this.alertController
      .create({
        header: "BPHT Attendance",
        message: "You are using an old version app Please Update App.",
        buttons: [
          {
            text: "Ok Update",
            handler: () => {
              this.forcceupdate();

              this.platform.ready().then(() => {
                window.open("market://details?id=com.bluepearl.attendancebpht", "_system");
              });
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  ionViewWillEnter(): void {
    debugger;
  }
  ionViewDidEnter() {
    this.passIconType = "eye";
  }
  togglePassword(): void {
    this.showpassword = !this.showpassword;
    if (this.passIconType === "eye") {
      this.passIconType = "eye-off";
    } else {
      this.passIconType = "eye";
    }
  }
  forgetpassword() {
    console.log("forgotPassword clicked!!");
    this.navCtrl.navigateRoot("forgetpassword");
  }
  async loginAction() {
    debugger;
    //fcm token for app
    await this.platform.ready().then(async () => {
      if (this.platform.is("android") || this.platform.is("ios")) {
        await this.fcm.getToken().then(async (token) => {
          await window.localStorage.setItem("FCMtoken", token);
          console.log("In FCM CodeS token " + JSON.stringify(token));
        })
          .catch((err) => { });
        console.log("I am an iOS or android  device!");
      }
    });

    this.ionLoader.showLoader();

    this.authService.login(this.username, this.password).subscribe(
      (data: any) => {
        debugger;
        if (data != undefined) {
          this.ionLoader.hideLoader();
          if (data.d.Result == "Success") {
            if (
              data.d.Role == "Admin" ||
              data.d.Role == "Patient"
            ) {
              window.localStorage.setItem("UserName", this.username);
              window.localStorage.setItem("Password", this.password);
              window.localStorage.setItem("Age", data.d.Age);
              window.localStorage.setItem("DOB", data.d.DOB);
              window.localStorage.setItem("EmailID", data.d.EmailID);
              window.localStorage.setItem("Gender", data.d.Gender);
              window.localStorage.setItem("MobileNumber", data.d.MobileNumber);
              window.localStorage.setItem("Role", data.d.Role);
              window.localStorage.setItem("ShortName", data.d.ShortName);
              switch (data.d.Role) {
                case "Patient":
                  // this.menu.enable(true, "patient");
                  this.navCtrl.navigateRoot("emplyelandingtab");
                  break;
                case "Admin":
                  // this.menu.enable(true, "admin");
                  this.navCtrl.navigateRoot("dashboard");
                  break;
              }
            } else {
              this.alertController
                .create({
                  header: "BPHT Attendance",
                  message: "Please Try Again",
                  buttons: ["OK"],
                })
                .then((res) => {
                  res.present();
                });
            }
          } else {
            this.alertController
              .create({
                header: "BPHT Attendance",
                message: "Please Try Again",
                buttons: ["OK"],
              })
              .then((res) => {
                res.present();
              });
          }
        }
        if (data.userData) {
          debugger;
        } else {

        }
      },
      (error: any) => {

      }
    );
  }
  checkForLoggedIn(regid): number {
    let res = 0;
    this.firebasesrv.getlastLocPhlebotrack(regid).subscribe(
      (result) => {
        debugger;
        /*       if (result === null){
              res = 2;
            }
            else if(result === 1){
              res = 1;
            } */
      },
      (err) => {
        debugger;
        console.log(err);
      }
    );
    return res;
  }
  firebaseLogin(regid): number {
    this.firebasesrv.setLoggedIn(1, regid);
    let res = this.checkForLoggedIn(regid);
    return res;
  }

  changeInputBorder(type: boolean) {
    this.inputSelected = type;
  }
  changePassBorder(type: boolean) {
    this.passSelected = type;
  }

  authenticateLogin(username, password): Promise<any> {
    return Promise.resolve(
      this.appServices.authenticatrUser(username, password)
    );
  }
}
