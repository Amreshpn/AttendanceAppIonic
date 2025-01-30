import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import {
  BaseArrayClass, Environment, Geocoder, GeocoderResult, GoogleMap, GoogleMapOptions,
  GoogleMaps, GoogleMapsEvent, GoogleMapsMapTypeId, ILatLng, Marker
} from '@ionic-native/google-maps/ngx';
import { NavController, Platform } from '@ionic/angular';
import { AnyARecord } from 'dns';
import { NavparamService } from 'src/app/services/navparam.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {
  map: GoogleMap;
  //geocoder:Geocoder;

  initialLocation: ILatLng;
  // pin address
  public address: string;
  marker: Marker;
  markerPosition: ILatLng;
  lat: any;
  lng: any;
  placeid: any;
  GoogleAutocomplete: any;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  data: any;
  markers: any;
  nearbyItems: any;
  geocoder: any;
  addressinstruction:any;

  newlat: any;
  newlon: any;

  constructor(

    private navparamsrv: NavparamService,
    private platform: Platform,
    private navCtrl: NavController,
    private zone: NgZone
  ) {
    debugger;


    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];

  }
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
        'mapToolbar': false,
      },
    }
    this.map = GoogleMaps.create('map', options);
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
      this.map.addEventListener(GoogleMapsEvent.MAP_CLICK).subscribe((data) => {
        debugger;

        this.markerPosition = { lat: data[0].lat, lng: data[0].lng }
        this.marker.setPosition(this.markerPosition)
        Geocoder.geocode({ position: this.markerPosition }).then(async (mvcArray: BaseArrayClass<GeocoderResult[]>) => {
          if (mvcArray[0].length === 0) {
            this.address = "";
          }
          else {
            document.getElementById("p1").innerHTML = mvcArray[0].extra.lines.join();

            this.address = mvcArray[0].extra.lines.join();
            //  this.setAddress(mvcArray[0].extra.lines.join());
            console.log(this.address);
          }
        }, (e) => { console.log(e); return; })
      })


    })

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
//AUTOCOMPLETE, SIMPLY LOAD THE PLACE USING GOOGLE PREDICTIONS AND RETURNING THE ARRAY.
UpdateSearchResults() {
  debugger;
  if (this.autocomplete.input == '') {
    this.autocompleteItems = [];
    return;
  }
  this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
}
ClearAutocomplete() {
  this.autocompleteItems = []
  this.autocomplete.input = ''
}
SelectSearchResult(item) {
  //this.clearMarkers();
  debugger;
  this.autocompleteItems = [];
  this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
    if (status === 'OK' && results[0]) {
      debugger;
      console.log("result", results[0])
      this.newlat = results[0].geometry.location.lat();
      this.newlon = results[0].geometry.location.lng();
      let position = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),

      };
      this.address = results[0].formatted_address;
      //const location = new google.maps.LatLng(this.latitude, this.longitude);
      // var map = new google.maps.Map(document.getElementById("map"), {
      //   //center: { lat: 28.669590291912307, lng: 77.2256948223464 },
      //   center: position,
      //   compass: true,
      //   MyLocationEnabled: true,
      //   setMyLocationButtonEnabled: true,
      //   indoorPicker: false, //'indoorPicker': false,
      //   //zoom: true,          
      //   mapToolbar: false,
      //   zoom: 15,
      //   mapTypeId: 'roadmap'
      // });
      this.map.moveCamera({
        target: position,
        zoom: 19,
        bearing: 45
      })
      this.marker = this.map.addMarkerSync({
        position: position,
        draggable: true,
        title: "Your current location",
      })
    }
  })
}
selectPlace() {
  debugger;
  let obj = {
   // address: this.address ? this.address : '' +"," +this.addressinstruction,
   address: this.address  +"," +this.addressinstruction,
   
    // latlan: ""+ this.newlat+ "," +this.newlon,
    latlngs: "" + this.markerPosition.lat + "," + this.markerPosition.lng
  }
  console.log("SelectedAddrss= ",this.addressinstruction, obj.address);
  this.navparamsrv.setNavData(obj);
  this.navCtrl.pop();
}
  findPlace(point: ILatLng) {

  }
}