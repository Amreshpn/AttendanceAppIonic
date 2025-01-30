import { Component, QueryList, ViewChildren, OnDestroy, Input } from "@angular/core";

import {
  Platform,
  AlertController,
  MenuController,
  NavController,
  IonRouterOutlet,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { Direction } from "src/app/models/directions";
import { FirebaseService } from "src/app/services/firebase.service";
import { ToastService } from "src/app/services/toast.service";
import { LoaderService } from "src/app/services/loader.service";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { Network } from "@ionic-native/network/ngx";
import { EventemitterService } from "src/app/services/eventemitter.service";
import { AlertService } from "src/app/services/alert.service";
import { AuthService } from "src/app/services/auth.service";
import {
  BackgroundGeolocation,
  BackgroundGeolocationLocationProvider,
  BackgroundGeolocationEvents,
  BackgroundGeolocationResponse,
} from "@ionic-native/background-geolocation/ngx";
import { LocationaccessService } from "src/app/services/locationaccess.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnDestroy {
  backButtonSubscription;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  NotificationList: Array<string> = [];
  NavigationPage: any;
  allowedpermission: boolean;
  UserName: any;
  showedAlert: boolean;
  confirmAlert: any;
  subscription: any;
  PhleboFID: string;
  role: string;
  allowCollection: string;
  allowPickup: string;
  static isPunchedin: boolean;
  logo: any;
  CreditBalance: any;
  CreditLimit: any;
  loadProgress: any;
  loadProgressBar: any;
  ShortName: any;
  patientName: any;
  mobNumber: any;
  public AppReference = AppComponent;
  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private menu: MenuController,
    private navCtrl: NavController,
    private router: Router,
    private emailComposer: EmailComposer,
    private fcm: FCM,
    private firebasesrv: FirebaseService,
    private toastsrv: ToastService,
    private localNotifications: LocalNotifications,
    private eventemitter: EventemitterService,
    private locaccess: LocationaccessService,
    private authService: AuthService
  ) {
    this.allowCollection = "false";
    this.allowPickup = "false";
    this.UserName = window.localStorage.getItem("ShortName");
    window.localStorage.setItem(
      "selectedLabID",
      "68d73074-85ac-4115-a8a7-f0fa4f31c98b" //test id
    );
    window.localStorage.setItem("SelectedLabName", "BPHT Attendance");
    this.allowedpermission = false;
    this.initializeApp();
    debugger;
    this.getUserProfile();
    // for hiding drower navigation
    var UserFID = window.localStorage.getItem("UserFID");
    debugger;
    if (UserFID == null) {
      // this.navCtrl.navigateRoot('login');
      this.menu.enable(false, "patient");
      this.menu.enable(false, "admin");
    }

    this.patientName = window.localStorage.getItem("ShortName");
    this.mobNumber = window.localStorage.getItem("MobileNumber");
    this.checkUpdate()
  }
  // get user profile is used for show user profile on drower user logo // profile
  getUserProfile() {
    debugger;
    // this.loadersrv.showLoader(); //
    this.authService.getUserDetails().subscribe((res: any) => {
      var data = res.d;
      debugger;
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
  async ngOnInit() {
    debugger;
    // this.eventemitter.getObservable().subscribe(async (data) => {
    //   debugger;

    //   if (data === "LOGGED_IN.CHECK_FOR_PUNCHIN") {
    //     debugger;

    //     this.PhleboFID = window.localStorage.getItem("UserFID");
    //     let r = window.localStorage.getItem("Role");
    //     if (r === "Collection Boy") {
    //       this.role = "phlebos";
    //     } else if (r === "Admin") {
    //       this.role = "Admin";
    //     } else if (r === "Round Boy") {
    //       this.role = "roundboys";
    //     } else if (r === "RefByUser") {
    //       this.role = "RefByUser";
    //     }
    //     await this.platform.ready().then(async () => {
    //       if (this.platform.is("android")) {
    //         debugger;
    //         this.initBackgeo();
    //         this.checkForPunchedin();
    //         /*             await this.requestPermissions().then( () => {
    //           if(this.allowedpermission === true){
    //             this.initBackgeo();
    //             this.checkForPunchedin();
    //           }
    //           else{
    //             this.alertsrvc.presentAlertConfirm("BPHT Attendance", "This app requires Location access to proceed.")
    //             this.forcedLogout();
    //           }
    //         }) */
    //       } else if (this.platform.is("cordova")) {
    //         this.initBackgeo();
    //         this.checkForPunchedin();
    //       }
    //     });
    //   }
    //   if (data === "CHECKED_SETTINGS") {
    //     this.checkSettings();
    //   }
    // });
  }
  initBackgeo() {
    this.backgroundGeolocation
      .configure({
        locationProvider:
          BackgroundGeolocationLocationProvider.DISTANCE_FILTER_PROVIDER,
        desiredAccuracy: 0,
        stationaryRadius: 10,
        distanceFilter: 5,
        interval: 3000,
        notificationsEnabled: true,
        notificationIconColor: "#0000aa",
        notificationTitle: "Location Tracking",
        notificationText: "Open app to disable.",
        stopOnTerminate: false,
        debug: false,
      })
      .then(() => {
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.location)
          .subscribe((location: BackgroundGeolocationResponse) => {
            console.log(location);
            let point: Direction = {
              latitude: location.latitude,
              longitude: location.longitude,
              createdAt: Math.floor(location.time / 1000),
              provider:
                location.provider === undefined ? "NULL" : location.provider,
              speed: location.speed === undefined ? 0 : location.speed,
              locProvider:
                location.locationProvider === undefined
                  ? 0
                  : location.locationProvider,
              accuracy: location.accuracy === undefined ? 0 : location.accuracy,
              altitude: location.altitude === undefined ? 0 : location.altitude,
              bearing: location.bearing === undefined ? 0 : location.bearing,
              isFromMockLocations:
                location.isFromMockProvider === undefined
                  ? false
                  : location.isFromMockProvider,
              mockLoc:
                location.mockLocationsEnabled === undefined
                  ? false
                  : location.mockLocationsEnabled,
            };
            this.firebasesrv.pushDirection(this.role, this.PhleboFID, point);
            this.firebasesrv.setLastLocation(this.role, this.PhleboFID, point);
            this.backgroundGeolocation.finish();
          });
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.start)
          .subscribe(() => {
            this.backgroundGeolocation
              .getCurrentLocation({
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 10000,
              })
              .then((location: BackgroundGeolocationResponse) => {
                debugger;
                let point: Direction = {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  createdAt: Math.floor(location.time / 1000),
                  provider:
                    location.provider === undefined
                      ? "NULL"
                      : location.provider,
                  speed: location.speed === undefined ? 0 : location.speed,
                  locProvider:
                    location.locationProvider === undefined
                      ? 0
                      : location.locationProvider,
                  accuracy:
                    location.accuracy === undefined ? 0 : location.accuracy,
                  altitude:
                    location.altitude === undefined ? 0 : location.altitude,
                  bearing:
                    location.bearing === undefined ? 0 : location.bearing,
                  isFromMockLocations:
                    location.isFromMockProvider === undefined
                      ? false
                      : location.isFromMockProvider,
                  mockLoc:
                    location.mockLocationsEnabled === undefined
                      ? false
                      : location.mockLocationsEnabled,
                };
                this.firebasesrv.pushDirection(
                  this.role,
                  this.PhleboFID,
                  point
                );
                this.firebasesrv.setLastLocation(
                  this.role,
                  this.PhleboFID,
                  point
                );
                this.backgroundGeolocation.finish();
              });
          });
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.stop)
          .subscribe((location: BackgroundGeolocationResponse) => {
            this.backgroundGeolocation
              .getCurrentLocation({
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 10000,
              })
              .then((location: BackgroundGeolocationResponse) => {
                let point: Direction = {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  createdAt: Math.floor(location.time / 1000),
                  provider:
                    location.provider === undefined
                      ? "NULL"
                      : location.provider,
                  speed: location.speed === undefined ? 0 : location.speed,
                  locProvider:
                    location.locationProvider === undefined
                      ? 0
                      : location.locationProvider,
                  accuracy:
                    location.accuracy === undefined ? 0 : location.accuracy,
                  altitude:
                    location.altitude === undefined ? 0 : location.altitude,
                  bearing:
                    location.bearing === undefined ? 0 : location.bearing,
                  isFromMockLocations:
                    location.isFromMockProvider === undefined
                      ? false
                      : location.isFromMockProvider,
                  mockLoc:
                    location.mockLocationsEnabled === undefined
                      ? false
                      : location.mockLocationsEnabled,
                };
                this.firebasesrv.pushPunchoutDirection(
                  this.role,
                  this.PhleboFID,
                  point
                );
                this.firebasesrv.setLastLocation(
                  this.role,
                  this.PhleboFID,
                  point
                );
                this.backgroundGeolocation.finish();
                this.backgroundGeolocation.removeAllListeners();
              });
          });
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.error)
          .subscribe((response: any) => {
            this.firebasesrv.putLogs(
              this.role,
              this.PhleboFID,
              "Error : " +
              (response.code === undefined ? "NULL" : response.code) +
              " : " +
              (response.message === undefined ? "NULL" : response.message) +
              "",
              Math.floor(new Date().getTime() / 1000)
            );
          });
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.backButtonEvent();

      this.splashScreen.hide();
      if (this.platform.is("android") || this.platform.is("ios")) {
        this.fcm.subscribeToTopic("Public");
        console.log("In FCM subscribeToTopic Public");

        this.localNotifications.on("click").subscribe((notification) => {
          debugger;
          this.NotificationList.push(JSON.parse(notification.AdditionalParam));
          window.localStorage.setItem(
            "NotificationList",
            JSON.stringify(this.NotificationList)
          );

          console.log("click : " + this.NavigationPage);
          console.log("click : " + JSON.stringify(notification));
        });

        this.fcm.onNotification().subscribe((notification) => {
          if (notification.wasTapped) {
            this.NotificationList.push(
              JSON.parse(JSON.stringify(notification.AdditionalParam))
            );
            window.localStorage.setItem(
              "NotificationList",
              JSON.stringify(this.NotificationList)
            );
            console.log(
              "notification.wasTapped in background  :" +
              JSON.stringify(notification)
            );
            console.log(
              "NavigationPage background " + notification.NavigationPage
            );
            this.NavigationPage = notification.NavigationPage;
          } else {
            console.log(
              "Received in foreground" + JSON.stringify(notification)
            );
            console.log(
              "NavigationPage foreground" + notification.NavigationPage
            );
            this.NavigationPage = notification.NavigationPage;
            this.NotificationList.push(
              JSON.parse(JSON.stringify(notification.AdditionalParam))
            );
            window.localStorage.setItem(
              "NotificationList",
              JSON.stringify(this.NotificationList)
            );
            if (notification.imageURL) {
              console.log("Received ImageFCM");
              this.localNotifications.schedule({
                title: notification.title,
                text: notification.body,
                attachments: [notification.imageURL],
                icon: "res://icon",
                smallIcon: "res://icon",
              });
            } else {
              console.log("Received else");
              this.localNotifications.schedule({
                title: notification.title,
                text: notification.body,
                icon: "file://assets/img/logo.png",
                smallIcon: "file://assets/img/logo.png",
              });
            }
          }
        });
      }
    });
  }
  ionViewWillEnter() {
    debugger;
  }
  ionViewDidEnter() {
    debugger;
    this.UserName = window.localStorage.getItem("ShortName");
  }

  backButtonEvent() {
    this.backButtonSubscription = this.platform.backButton.subscribe(
      async () => {
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
          if (outlet && outlet.canGoBack()) {
            outlet.pop();
          } else if (
            this.router.url === "/login" ||
            this.router.url === "/testprofiletab"
          ) {
            this.presentAlertConfirm();
          }
        });
      }
    );
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Confirm to Exit App !!!",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Exit",
          handler: () => {
            console.log("Confirm Okay");
            navigator["app"].exitApp();
          },
        },
      ],
    });
    await alert.present();
  }

  isPatient() {
    this.UserName = window.localStorage.getItem("ShortName");
    var role = window.localStorage.getItem("Role");

    if (role == "Patient") {
      return false;
    } else {
      return true;
    }
  }

  //Called when view is left
  ngOnDestroy() {
    // Unregister the custom back button action for this page
    this.backButtonSubscription.unsubscribe();
  }

  confirmExitApp() {
    this.showedAlert = true;
    this.confirmAlert = this.alertController
      .create({
        header: "Exit",
        message: "Are you sure you want to exit the application?",
        buttons: [
          {
            text: "Cancel",
            handler: () => {
              this.showedAlert = false;
              return;
            },
          },
          {
            text: "OK",
            handler: () => {
              // this.platform.exitApp();
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  giveFeedback() {
    let email = {
      to: "android@bluepearlinfotech.com",
      subject: "BPHT Attendance App Feedback",
      isHtml: true,
    };
    this.emailComposer.open(email);
  }



  Logout() {
    debugger;

    this.platform.ready().then(() => {
      if (this.platform.is("android") || this.platform.is("ios")) {
        this.fcm.onTokenRefresh().subscribe((token) => {
          console.log("refresh token ++", token);
          window.localStorage.setItem("FCMtoken", token);
        });
      }
    });
    let alert = this.alertController
      .create({
        header: "BPHT Attendance",
        message: "Are you sure you want to logout?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Logout",
            handler: () => {
              this.toastsrv.presentToast("Succesfully Logged OUT!!");
              window.localStorage.removeItem("Age");
              window.localStorage.removeItem("DOB");
              window.localStorage.removeItem("EmailID");
              window.localStorage.removeItem("Gender");
              window.localStorage.removeItem("MobileNumber");
              window.localStorage.removeItem("Role");
              window.localStorage.removeItem("ShortName");
              window.localStorage.removeItem("UserFID");
              this.navCtrl.navigateRoot("login");

            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
  firebaseLogout(regid): number {
    this.firebasesrv.setLoggedIn(0, regid);
    let res = this.checkForLoggedIn(regid);
    return res;
  }
  checkForPunchedin() {
    let role = window.localStorage.getItem("Role");
    if (role === null || role === undefined) {
      return;
    }
    let UserFID = window.localStorage.getItem("UserFID");
    if (role === "Collection Boy") {
      this.firebasesrv.getPunchedIn("phlebos", UserFID).then(async (result) => {
        if (result === null) {
          this.firebasesrv.setPunchedIn("phlebos", UserFID, 0);
        } else if (result === 0) {
          AppComponent.isPunchedin = false;
        } else if (result === 1) {
          await this.locaccess.checkforLocation().then(
            (result) => {
              if (result === true) {
                AppComponent.isPunchedin = true;
                this.backgroundGeolocation.start();
              }
            },
            (err) => {
              this.toastsrv.presentToast(err);
              AppComponent.isPunchedin = false;
            }
          );
        }
      });
    }
    if (role === "Round Boy") {
      this.firebasesrv.getPunchedIn("roundboys", UserFID).then((result) => {
        if (result === null) {
          this.firebasesrv.setPunchedIn("roundboys", UserFID, 0);
        } else if (result === 0) {
          AppComponent.isPunchedin = false;
        } else if (result === 1) {
          AppComponent.isPunchedin = true;
          this.backgroundGeolocation.start();
        }
      });
    }
  }
  async changePunchState(event: Event) {
    let role = window.localStorage.getItem("Role");
    let UserFID = window.localStorage.getItem("UserFID");
    let rolestring = "";
    if (role === "Collection Boy") {
      rolestring = "phlebos";
    } else if (role === "Round Boy") {
      rolestring = "roundboys";
    }
    if (!AppComponent.isPunchedin) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
      await this.locaccess.checkforLocation().then(
        (result) => {
          if (result === true) {
            this.firebasesrv
              .setPunchedIn(rolestring, UserFID, 1)
              .then(() => {
                this.eventemitter.publish("LOGGED_IN.PUNCHED_IN");
                AppComponent.isPunchedin = true;
                this.backgroundGeolocation.start();
              })
              .catch((err) => {
                console.log("Failed e : " + err);
              });
          }
        },
        (err) => {
          this.toastsrv.presentToast(err);
        }
      );
    } else {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
      await this.locaccess.checkforLocation().then(
        (result) => {
          if (result === true) {
            this.firebasesrv
              .setPunchedIn(rolestring, UserFID, 0)
              .then(() => {
                this.eventemitter.publish("LOGGED_IN.PUNCHED_OUT");
                AppComponent.isPunchedin = false;
                this.backgroundGeolocation.stop();
              })
              .catch((err) => {
                console.log("Failed e : " + err);
              });
          }
        },
        (err) => {
          this.toastsrv.presentToast(err);
        }
      );
    }
  }

  checkForLoggedIn(regid): number {
    let res = 0;
    this.firebasesrv.getLoggedIn(regid).subscribe((result) => {
      if (result === null) {
        res = 2;
      } else if (result === 1) {
        res = 1;
      }
    });
    return res;
  }
  preventDragToggle(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
  }
  checkSettings() {
    this.allowCollection = window.localStorage.getItem("allowCollection");
    this.allowPickup = window.localStorage.getItem("allowPickup");
  }



  // for client  gotoClientAccountPage() {
  gotoClientAccountPage() {
    let BillingType = window.localStorage.getItem("BillingType");
    if (BillingType == "3") {
      this.navCtrl.navigateForward("clientaccountview");
      // this.app.getActiveNav().push(ClientaccountviewPage);
      // this.menuCtrl.close();
    } else {
      this.navCtrl.navigateForward("postpaidclientaccountview");
      // this.app.getActiveNav().push(PostpaidclientaccountviewPe);
      // this.menuCtrl.close();
    }

    //
  }

  isHidden() {
    // debugger;

    let role = window.localStorage.getItem("selectedLabRole");

    this.CreditBalance = window.localStorage.getItem("CreditBalance");
    this.CreditLimit = window.localStorage.getItem("CreditLimit");
    var tp = JSON.parse(window.localStorage.getItem("TransactionPercentage"));
    if (tp >= 100) {
      var final = 100 - tp;
      this.loadProgress = final.toFixed(2);
      this.loadProgressBar = 0;

      // this.loadProgress = 0;
    } else if (tp <= 0) {
      this.loadProgress = 100;
      this.loadProgressBar = 100;
    } else {
      var final = 100 - tp;

      this.loadProgress = final.toFixed(2);
      this.loadProgressBar = final.toFixed(2);
    }

    if (role == "RefByUser") {
      this.ShortName = window.localStorage.getItem("EntityName");
    } else {
      this.ShortName = window.localStorage.getItem("ShortName");
    }
    if (window.localStorage.getItem("MobileNumber") == "") {
      this.UserName = window.localStorage.getItem("UserName");
    } else {
      this.UserName = window.localStorage.getItem("MobileNumber");
    }

    if (
      role == "Admin" ||
      role == "RefByUser" ||
      role == "LabUser_T2" ||
      role == "Sr. Lab User" ||
      role == "Jr. Lab User" ||
      role == "Lab User" ||
      role == "Pathologist" ||
      role == "Pathologist_T2" ||
      role == "Pathologist_T3" ||
      role == "Doctor" ||
      role == "AffiliationUser" ||
      role == "Collection Center Admin" ||
      role == "Collection Center User"
    ) {
      return false;
    } else {
      return true;
    }
  }

}
