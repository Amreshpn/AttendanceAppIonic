import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, MenuController, AlertController } from '@ionic/angular';
import { PlaceService } from 'src/app/services/place.service';
import { NavparamService } from '../../services/navparam.service'
import { environment } from 'src/environments/environment.prod';
import {
  Environment, GoogleMap, GoogleMaps, GoogleMapOptions,
  GoogleMapsMapTypeId, LatLng, Geocoder, GeocoderResult, GoogleMapsEvent, BaseArrayClass, ILatLng,
  Marker, PolylineOptions, Polyline
} from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-mapforattendanc',
  templateUrl: './mapforattendanc.page.html',
  styleUrls: ['./mapforattendanc.page.scss'],
})
export class MapforattendancPage implements OnInit {

  map: GoogleMap;
  initialLocation: ILatLng;
  // pin address
  public address: string;
  marker: Marker;
  markerPosition: ILatLng;
  lat: any;
  lng: any;
  googleAutocomplete: any;
  data: any;

  constructor(
    private chRef: ChangeDetectorRef,
    private placeService: PlaceService,
    private platform: Platform,
    private navparamsrv: NavparamService,
    private navCtrl: NavController,
    private menu: MenuController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    debugger;
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDxN8oqgwfeP8qbFOQer944DvbkExHSTmY',
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDxN8oqgwfeP8qbFOQer944DvbkExHSTmY'
    });
    let options: GoogleMapOptions = {
      mapType: GoogleMapsMapTypeId.ROADMAP,

      controls: {
        'compass': true,
        'myLocationButton': true,
        'myLocation': true,
        'indoorPicker': true, //'indoorPicker': false,
        'zoom': true,
        'mapToolbar': false
      },
    }
    this.map = GoogleMaps.create('map_canvas', options);
    this.map.getMyLocation({ enableHighAccuracy: true }).then((location) => {
      debugger;

      this.initialLocation = { lat: location.latLng.lat, lng: location.latLng.lng };
      this.markerPosition = this.initialLocation;
      this.map.moveCamera({
        target: this.initialLocation,
        zoom: 19,
        bearing: 45
      })
    }).then(() => {
      this.marker = this.map.addMarkerSync({
        position: this.initialLocation,
        draggable: true,
        title: "Your current location",
      })
      this.findInitial(this.initialLocation);
    }).then(() => {
      // this.map.addEventListener(GoogleMapsEvent.MAP_CLICK).subscribe((data) =>{
      //   debugger;

      //   this.markerPosition = {lat : data[0].lat, lng: data[0].lng}
      //   this.marker.setPosition(this.markerPosition)
      //   Geocoder.geocode({position: this.markerPosition}).then( async (mvcArray : BaseArrayClass<GeocoderResult[]>) =>{
      //     if(mvcArray[0].length === 0){
      //       this.address = "";
      //     }
      //     else{
      //       document.getElementById("p1").innerHTML = mvcArray[0].extra.lines.join();

      //       this.address = mvcArray[0].extra.lines.join();
      //       //  this.setAddress(mvcArray[0].extra.lines.join());
      //       console.log(this.address);
      //     }
      //   }, (e) => {console.log(e); return;})
      // })
    })
  }
  setAddress(arg0: any) {
    debugger;
    console.log("inside setAddress...", arg0);
    this.alertController.create({
      header: 'BPHT Attendance',
      message: arg0,
      buttons: ['OK']
    }).then(res => {

      res.present();

    });
    this.data = arg0;
  }
  findInitial(point: ILatLng) {
    Geocoder.geocode({ position: point }).then((mvcArray: BaseArrayClass<GeocoderResult[]>) => {
      if (mvcArray[0].length === 0) {
        this.address = "";
      }
      else {
        this.address = mvcArray[0].extra.lines.join();
      }
    })
  }

  findPlace(point: ILatLng) {

  }

  selectPlace() {
    let obj = {
      address: this.address ? this.address : '',
      latlng: "" + this.markerPosition.lat + "," + this.markerPosition.lng
    }
    this.navparamsrv.setNavData(obj);
    this.navCtrl.pop();
  }
}
