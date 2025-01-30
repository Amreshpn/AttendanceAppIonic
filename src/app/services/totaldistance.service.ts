import { Injectable } from '@angular/core';
import { Direction } from 'src/app/models/directions';
import { ILatLng } from '@ionic-native/google-maps/ngx';
@Injectable({
  providedIn: 'root'
})
export class TotaldistanceService {
  private totaldistance : number;
  constructor() { }

  private degToRad(n) {
    return n * Math.PI / 180;
  }

  private radToDeg(n) {
    return n * 180 / Math.PI;
  }

  private getDistance(lat1, lon1, lat2, lon2, mode) {	
    var R = 6371; // Earth radius in km
	
    switch(mode)
    {	
      case 'spherical':
      default:
        var dLon = this.degToRad(lon2 - lon1);
        lat1 = this.degToRad(lat1);
        lat2 = this.degToRad(lat2);
        var d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)) * R;
      break;	
		
      case 'haversine':
        var dLat = this.degToRad(lat2 - lat1);
        var dLon = this.degToRad(lon2 - lon1);
        lat1 = this.degToRad(lat1);
        lat2 = this.degToRad(lat2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        var d = R * c;
      break;	
		
      case 'rectangle':
        var x = this.degToRad(lon2 - lon1) * Math.cos(this.degToRad(lat1 + lat2) / 2);
        var y = this.degToRad(lat2 - lat1);
        var d = Math.sqrt(x * x + y * y) * R;
      break;	
	  }	
	  return d;	
  }
  totDisBetweenpoints( directions : Direction []){
    this.totaldistance = 0;
    let points : ILatLng[] = [];
    points.push({
      lat : directions[0].latitude,
      lng : directions[0].longitude
    }) 
    for(let i = 0; i < directions.length-1; i++){
      this.totaldistance = this.totaldistance + this.getDistance(directions[i].latitude, directions[i].longitude, directions[i+1].latitude, directions[i+1].longitude, 'haversine');
      points.push({
        lat : directions[i+1].latitude,
        lng : directions[i+1].longitude
      })
    }
    let obj = {
      totaldistance : parseFloat((this.totaldistance*1.01).toFixed(3)),
      pointsarray : points
    }
    return obj;
  }
}
