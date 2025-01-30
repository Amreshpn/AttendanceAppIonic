//import { Pipe, PipeTransform } from '@angular/core';
//import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
// import { Http, Headers, Response, RequestOptions } from '@angular/http';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ToastController, Platform, AlertController } from '@ionic/angular';
// import { Network } from '@ionic-native/network/ngx';

// import { Network } from '@ionic-native/network';

//import { Network } from 'ionic-native';
@Injectable()

export class AppServices {
  IsSearchFromDetailPage: boolean;
  headers = new HttpHeaders();
  options = { headers: this.headers, withCredintials: false };
  SupportUrl: string = "http://elabcorpsupport.elabassist.com/";
  // LiveUrl: string = ""; //Live url BPHT Attendance
  //LiveUrl: string = "http://www.test.elabassist.com/";  
  LiveUrl: string = "http://BPHT Attendance.elabassist.com/";   //Test Url BPHT Attendance

  //For Testing
  // SupportUrl: string = "http://elabcorpsupport.elabassist.com/";
  // LiveUrl: string = "http://www.test.elabassist.com/";


  loading: any;
  networkAvaible: any;
  private internetStatus: boolean = false;
  StatusList = [];
  OrderList = [];
  OrderDetailsList = [];
  RetailerList = [];
  AdminLabsList = [];
  List = [];
  CollectionCenterData = [];
  AllTestList = [];
  selecttestTabTest = [];
  profile = [];
  popularTests = [];
  DashBoardData = [];
  isHeaderEnabled = true;
  objParamList = [];

  AllDoctorList = [];

  // prescription1: any;
  // prescription2: any;
  // prescription3: any;
  // prescription4: any;


  constructor(private toast: ToastController,
    private alertCtrl: AlertController, private http: HttpClient,
    public platform: Platform) {
    //*** Please Chnages URL Here For App Data With Testing or Live 

    this.platform.ready().then(() => {
      // this.networkAvaible = network.type;
      // if (this.networkAvaible == 'none' || this.networkAvaible == null) {
      //   let text = 'Please Check your Net Connection';
      //   // this.presentAlert('Net Connection ', text);
      // }

    });
    //  console.log(" Network connection "+ Network.type);
    // let disconnectSubscription = network.onDisconnect().subscribe(() => {
    //   this.networkAvaible = network.type;
    // });

    // let connectSubscription = network.onConnect().subscribe(() => {
    //   console.log(" Network connection  on");
    //   this.networkAvaible = network.type;
    //   // We just got a connection but we need to wait briefly
    //   // before we determine the connection type. Might need to wait.
    //   // prior to doing any api requests as well.
    //   if (this.StatusList.length <= 1) {
    //     console.log(" Network get status connection  on");
    //     //this.GetOrdersByCollectionBoy();
    //   }

    //   setTimeout(() => {
    //     if (network.type === 'wifi') {
    //       this.networkAvaible = network.type;
    //       console.log('we got a wifi connection, woohoo!');
    //     }
    //   }, 3000);
    // });
    //this.GetOrdersByCollectionBoy();
  }


  /////////////// LOGIN //////////////
  /////////////////////////////////////
  async authenticatrUser(username, password) {
    debugger;
    // var headers = new Headers();
    // if (this.isHeaderEnabled) {
    //   headers.append('Access-Control-Allow-Origin', '*');
    //   headers.append('Content-Type', 'application/json; charset=utf-8');
    // }
    // let options = new RequestOptions({ headers: headers });
    let url = this.SupportUrl + "Services/GlobalUserService.svc/UserRegistration";

    let obj = {
      "objSP": {
        "Task": "3",
        "UserName": username,
        "Password": password,
      }
    }

    let userObj;
    let postParams = obj;
    //  this.authUser(url, postParams, this.options).then(data => {
    //  debugger;
    //   userObj  = data;
    //   if (data == null) {
    //     userObj = [];
    //   }
    //  }
    this.http.post(
      url, postParams, this.options
    ).toPromise()
      .then((res) => {
        if (res == null || res == undefined) {
          userObj = [];
        } else {
          userObj = res;
        }
      }
      );

    debugger;

    return userObj;

  }
  async authUser(url, postParams, options) {
    debugger;
    //if(this.networkAvaible!='none' && this.networkAvaible!=null && this.networkAvaible!=undefined){
    try {
      return this.http.post(
        url, postParams, options
      ).toPromise()
        .then((res) => console.log("Hiii" + res));

    } catch (e) {
      return [];
    }
    //}else{
    // return null;
    //}

  }
  // async authUser1(url, postParams, options) {
  //   //if(this.networkAvaible!='none' && this.networkAvaible!=null && this.networkAvaible!=undefined){
  //   try {
  //     return this.http.post(
  //       url, postParams, options
  //     ).toPromise()
  //       .then((res) => res.json());

  //   } catch (e) {
  //     return [];
  //   }
  //   //}else{
  //   // return null;
  //   //}

  // }


}


