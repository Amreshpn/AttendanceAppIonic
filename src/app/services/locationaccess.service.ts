import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { AlertController, Platform } from '@ionic/angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
//import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

const LOCATION_SETTINGS_PATH = "Go to System Settings -> App -> BPHT Attendance-> permissions-> Location-> Allow All the time ";
const TURN_ON_LOCATION = "turn on Location services";
const CLEAR_APP_SETTINGS = "Go to System Settings -> App -> BPHT Attendance -> Storage -> Clear all Storage";

@Injectable({
  providedIn: 'root'
})

export class LocationaccessService {

  constructor(
    private diagnostic: Diagnostic,
    private locationAccuracy: LocationAccuracy,
    private toastsrv: ToastService,
    public platform: Platform,
    private launchNavigator: LaunchNavigator,
    private androidPermissions: AndroidPermissions,
    private alertCtrl: AlertController,
    public openNativeSettings: OpenNativeSettings,
  ) { }


  //  Check for Location access : 
  //    1. Access to location services in both foreground and background for "always" scope.
  //    2. Location services accuracy is set to "HIGH ACCURACY" and not on "DEVICE ONLY" or "BATTERY SAVER".
  //    3. App has access to GPS service and GPS service is turned ON for app.
  //    Checking for all three in sequence 1 -> 2 -> 3 
  //    Return false if any one does not satisfies with proper toast to solve it.
  //    Return true otherwise.
  checkforLocation(): Promise<boolean> {
    debugger;


    return new Promise((resolve, reject) => {
      let UserFID = window.localStorage.getItem('UserFID');
      this.diagnostic.getLocationAuthorizationStatus().then((status) => {
        switch (status) {


          //First time request for location
          case this.diagnostic.permissionStatus.NOT_REQUESTED:
            this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.ALWAYS).then(status2 => {
              switch (status2) {

                //denied the access in popup
                case this.diagnostic.permissionStatus.DENIED_ALWAYS:

                  console.log("permission", this.diagnostic.permissionStatus)
                  console.log(".DENIED_ALWAYS", this.diagnostic.permissionStatus.DENIED_ALWAYS)


                  this.showaleart();

                  this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_BACKGROUND_LOCATION).then((data: any) => {
                    if (data.hasPermission) {
                      console.log("have permission");
                    }
                  });
                  reject("Permission is denied always. In order to proceed " + LOCATION_SETTINGS_PATH);
                  break;

                //accepted the access in popup for always, now check for accuracy and GPS
                case this.diagnostic.permissionStatus.GRANTED:
                  this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
                    this.diagnostic.isGpsLocationAvailable().then(result => {
                      if (result === true) {
                        resolve(true);
                      }
                      else {
                        reject("Please enable your GPS to continue.");
                      }
                    }).catch(err => { console.log("Failed e : " + err); })
                  }, err => { reject("Please set Location to High Accuracy to continue.") })
                  break;

                //accepted the access in popup for only during use.
                case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                  this.showaleart();
                  this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_BACKGROUND_LOCATION).then((data: any) => {
                    if (data.hasPermission) {
                      console.log("have permission");
                    }
                  });
                  reject("Permission granted only when in use" + LOCATION_SETTINGS_PATH);
                  break;
              }
            }, error => {
              console.error(error);
            });
            break;

          case this.diagnostic.permissionStatus.DENIED_ONCE:

            this.toastsrv.presentToast("Permission denied. Location access is required to continue");
            this.diagnostic.requestLocationAuthorization(this.diagnostic.locationAuthorizationMode.ALWAYS).then(status2 => {
              switch (status2) {

                //denied the access in popup
                case this.diagnostic.permissionStatus.DENIED_ALWAYS:
                  this.showaleart();
                  this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_BACKGROUND_LOCATION).then((data: any) => {
                    if (data.hasPermission) {
                      console.log("have permission");
                    }
                  });
                  reject("Permission is denied always ONCE. In order to proceed " + LOCATION_SETTINGS_PATH);
                  break;

                //accepted the access in popup for always, now check for accuracy and GPS
                case this.diagnostic.permissionStatus.GRANTED:
                  this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
                    this.diagnostic.isGpsLocationAvailable().then(result => {
                      if (result === true) {
                        resolve(true);
                      }
                      else {
                        reject("Please enable your GPS to continue.");
                      }
                    }).catch(err => { console.log("Failed e : " + err); })
                  }, err => { reject("Please set Location to High Accuracy to continue.") })
                  break;

                //accepted the access in popup for only during use.
                case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                  this.showaleart();
                  this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_BACKGROUND_LOCATION).then((data: any) => {
                    if (data.hasPermission) {
                      console.log("have permission");

                    }
                  });
                  reject("Permission granted only when in use " + LOCATION_SETTINGS_PATH);
                  break;
              }
            }, error => {
              console.error(error);
            });
            break;

          case this.diagnostic.permissionStatus.DENIED_ALWAYS:
            debugger;
            this.showaleart();
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_BACKGROUND_LOCATION).then((data: any) => {
              if (data.hasPermission) {
                console.log("have permission");
              }
            });
            reject("Permission permanently denied. " + LOCATION_SETTINGS_PATH);
            break;

          case this.diagnostic.permissionStatus.GRANTED:
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
              this.diagnostic.isGpsLocationAvailable().then(result => {
                if (result === true) {
                  resolve(true);
                }
                else {
                  reject("Please enable your GPS to continue.");
                }
              }).catch(err => { console.log("Failed e : " + err); })
            }, err => { reject("Please set Location to High Accuracy to continue.") })
            break;

          case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
            this.showaleart();
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_BACKGROUND_LOCATION).then((data: any) => {
              if (data.hasPermission) {
                console.log("have permission");

              }
            });
            reject("Permission granted only when in use." + LOCATION_SETTINGS_PATH);
            break;
        }
      })
    });
  }

  getMapType = (): string => {
    let app;
    if (this.platform.is('android')) {
      app = this.launchNavigator.APP.GOOGLE_MAPS;
    }
    else {
      app = this.launchNavigator.APP.USER_SELECT;
    }
    return app;
  }

  async showaleart() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '',
      // message: '<strong>We need access to your location in the background to ensure our app can function correctly. </strong>!!!',
      message: '<strong> <h5>  <img src="assets/items.png" class="card-alert"><br>Update location Setting</h5><br> Allow BPHT Attendance to access this devices location?</strong> <br><br> <span> Allow us to access your location all the time so we can provide presonal recommendations</span></strong>',
      buttons: [
        {
          text: 'No thanks',
          role: 'cancel',
          cssClass: 'secondary',

          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'update settings',
          handler: () => {
            this.openNativeSettings.open("application_details").then(val => {
              console.log('success')
            });
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
