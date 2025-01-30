import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppServices } from './services.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { File } from '@ionic-native/file/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx'
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Validators, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { NavparamService } from './services/navparam.service'
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { ServiceWorkerModule } from '@angular/service-worker'
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

import { Geocoder } from '@ionic-native/google-maps/ngx';
import { CalendarModule } from 'ion2-calendar';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CalendarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppServices,
    HttpClientModule,
    EmailComposer,
    FormBuilder,
    Camera,
    PhotoViewer,
    File,
    FCM,
    Network,
    Diagnostic,
    LocationAccuracy,
    BarcodeScanner,
    LocalNotifications,
    DocumentViewer,
    FileOpener,
    FileTransfer,
    InAppBrowser,
    AndroidPermissions,
    BackgroundGeolocation,
    NavparamService,
    LaunchNavigator,
    OpenNativeSettings,

    Geocoder,



    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
