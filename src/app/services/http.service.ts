import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers = new HttpHeaders();
  options = { headers: this.headers, withCredintials: false };
  SupportUrl: string = "http://elabcorpsupport.elabassist.com/";
  //LiveUrl: string = "https://BPHT Attendance.elabassist.com/";//Live url BPHT Attendance
  LiveUrl: string = "http://BPHT Attendance.elabassist.com/";   //Test Urll
  constructor(private http: HttpClient) { }

  post(url: any, obj: any) {
    // const url = SupportUrl.apiUrl + serviceName;


    return this.http.post(url, obj, this.options);
  }

  get(url: any) {
    // const url = SupportUrl.apiUrl + serviceName;


    return this.http.get(url, this.options);
  }
}
