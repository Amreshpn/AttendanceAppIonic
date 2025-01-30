import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpService } from "./http.service";
import { DatePipe } from "@angular/common";
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData$ = new BehaviorSubject<any>([]);
  SupportUrl: string = "http://elabcorpsupport.elabassist.com/";
  LiveUrl: string = "http://BPHT Attendance.elabassist.com/";   //Test url
  profile = [];
  selecttestTabTest = [];

  guid = window.localStorage.getItem("UserFID");
  selectedLabID: any;
  fromDate: any;
  Mindate: any;
  time: any;
  btnusername: any;
  isPunchedIn: any;
  isPunchedOut: any;
  objParamList = [];
  GroupTestList = [];
  popularTests = [];
  constructor(
    private httpService: HttpService,
    private router: Router,
    private storage: Storage,
  ) {
    this.profile = [];
  }


  login(username: any, Password: any): Observable<any> {
    debugger;
    let FCMtoken = window.localStorage.getItem("FCMtoken");
    let LabID = window.localStorage.getItem("selectedLabID");

    let obj = {
      objSP: {
        Task: "3",
        UserName: username,
        Password: Password,
        AppID: LabID,
        MobileDeviceID:
          FCMtoken == null || FCMtoken == undefined ? "" : FCMtoken,
      },
    };

    let url =
      this.SupportUrl + "Services/GlobalUserService.svc/UserRegistration";
    return this.httpService.post(url, obj);
  }


  forgetPassword(
    username: any
  ): Observable<any> {
    debugger;
    var datePipe = new DatePipe("en-US");

    let url =
      this.SupportUrl + "Services/GlobalUserService.svc/UserRegistration";
    let obj = {
      objSP: {
        Task: "4",
        UserName: username,
      },
    };

    debugger;

    return this.httpService.post(url, obj);
  }

  signup(postData: any): Observable<any> {
    return this.httpService.post("signup", postData);
  }

  //Get user profile Details
  getUserDetails(): Observable<any> {
    debugger;
    let userFID = window.localStorage.getItem("UserFID");
    let url =
      this.SupportUrl + "Services/GlobalUserService.svc/GetUserProfile?UserID=";
    let obj = {
      UserID: userFID,
    };

    return this.httpService.post(url, obj);
  }

  timeInOutAttendance(
    id: any,
    name: any,
    date: any,
    location: any,
    dp: any
  ): Observable<any> {
    debugger;

    let tempdate = date.split(" ")[0]
    debugger;
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
    this.fromDate = localISOTime; // new Date(localISOTime).toISOString();
    console.log("fromDate", this.fromDate);
    let url = this.LiveUrl + "Services/Membership.svc/CreateUserAttendence";
    let obj =
    {
      id: 0,
      employeeID: 0,
      punchIn: "2023-12-29T11:04:07.280Z",
      punchOut: "2023-12-29T11:04:07.280Z",
      loginType: 0,
      selfieImage: "string",
      employeeLocation: "string",
      latitute: "string",
      onLeave: true,
      leaveType: 0
    }
    return this.httpService.post(url, obj);
  }
  //   GlobalUserID: userFID,
  //   EntityType: EntityID,
  //   CurrentLocation: location == undefined || location == null ? '' : location,
  //   Flag: id,
  //   PunchIn: id == 1 ? date : '',
  //   PunchOut: id == 0 ? date : '',
  //   Date: tempdate + " 00:00:00",
  //   Base64ProfileImage: dp,
  //   DeviceType: 1,
  //   LabId: LabID

  // }



  //////////////////// Check for update //////////////////////////////////////
  checkforUpdate(): Observable<any> {
    debugger;
    let userFID = window.localStorage.getItem("UserFID");

    var datePipe = new DatePipe("en-US");

    let guid = window.localStorage.getItem("selectedLabID");
    let url =
      this.LiveUrl +
      "Services/UserService.svc/MobileAppUpdateVersion?LabID=" +
      guid;
    return this.httpService.get(url);
    // let url =  "http://hsppl.live/Services/UserService.svc/MobileAppUpdateVersion?LabID="+guid;

    //let url = this.LiveUrl + "Services/UserService.svc/MobileAppUpdateVersion?LabID="+guid;
    //http://hsppl.live/Services/UserService.svc/MobileAppUpdateVersion?LabID=4dc18595-28af-4183-9a07-611bc6ceccf6

  }


}
