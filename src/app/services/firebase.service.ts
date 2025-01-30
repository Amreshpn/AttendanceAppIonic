import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Direction } from '../models/directions'
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as constant from 'src/appconfig';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase,
  ) {

  }
  setLoggedIn(state, phleboid) {
    this.db.object('phlebotracker/labs/' + constant.LABID + '/phlebos/' + phleboid + '/isLoggedin').set(state);
  }
  getLoggedIn(phleboid): Observable<number> {
    return this.db.object<number>('phlebotracker/labs/' + constant.LABID + '/phlebos/' + phleboid + '/isLoggedin').valueChanges().pipe(take(1));
  }


  setLastLocationPhlebo(point: Direction, regid) {
    this.db.object('collectiontracker/labs/' + constant.LABID + '/collections/' + regid + '/lastloc/').set(point);
  }
  setCollectionPoint(point: Direction, regid) {
    this.db.object('collectiontracker/labs/' + constant.LABID + '/collections/' + regid + '/collectedAt/').set(point);
  }
  getCollectionPoint(regid): Observable<Direction> {
    return this.db.object<Direction>('collectiontracker/labs/' + constant.LABID + '/collections/' + regid + '/collectedAt').valueChanges().pipe(take(1));
  }
  getfilteredTrips(startdate: number, enddate: number, phleboFid: any): Observable<Direction[]> {
    return this.db.list<Direction>('phlebotracker/labs/' + constant.LABID + '/phlebos/' + phleboFid + '/routes', ref => ref.orderByKey().startAt(startdate.toString()).endAt(enddate.toString())).valueChanges();
  }
  getlastLocPhlebotrack(phleboid): Observable<Direction> {
    return this.db.object<Direction>("phlebotracker/labs/" + constant.LABID + "/phlebos/" + phleboid + "/lastloc").valueChanges().pipe(take(1));
  }
  setPhleboName(regid, phleboname) {
    this.db.object('collectiontracker/labs/' + constant.LABID + '/collections/' + regid + '/phleboName').set(phleboname);
  }
  setPhleboID(regid, phleboid) {
    this.db.object('collectiontracker/labs/' + constant.LABID + '/collections/' + regid + '/phleboID').set(phleboid);
  }
  setCreatedAt(regid, timestamp) {
    this.db.object('collectiontracker/labs/' + constant.LABID + '/collections/' + regid + '/createdAt').set(timestamp);
  }

  // isPunchin 
  setPunchedIn(role: string, userFID: string, state: number) {
    return this.db.object('emptracker/labs/' + constant.LABID + "/" + role + '/' + userFID + '/isPunchedin').set(state);
  }
  getPunchedIn(role, userfid): Promise<any> {
    debugger;

    return this.db.object('emptracker/labs/' + constant.LABID + "/" + role + '/' + userfid + '/isPunchedin').valueChanges().pipe(take(1)).toPromise();
  }

  //Punchins
  getPunchins(role: string, userfid: string, startdate: number, enddate: number): Promise<Direction[]> {
    return this.db.list<Direction>('emptracker/labs/' + constant.LABID + "/" + role + '/' + userfid + '/punchins', ref => ref.orderByKey().startAt(startdate.toString()).endAt(enddate.toString())).valueChanges().pipe(take(1)).toPromise();
  }
  getPunchouts(role: string, userfid: string, startdate: number, enddate: number): Promise<Direction[]> {
    return this.db.list<Direction>('emptracker/labs/' + constant.LABID + "/" + role + '/' + userfid + '/punchouts', ref => ref.orderByKey().startAt(startdate.toString()).endAt(enddate.toString())).valueChanges().pipe(take(1)).toPromise();
  }

  // Background tracked data firebase interaction
  pushDirection(role: string, userfid: string, point: Direction) {
    this.db.object('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/punchins/' + point.createdAt).set(point);
  }
  pushPunchoutDirection(role: string, userfid: string, point: Direction) {
    this.db.object('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/punchouts/' + point.createdAt).set(point);
  }
  setLastLocation(role: string, userfid: string, point: Direction) {
    this.db.object('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/lastloc').set(point);
  }
  getLastLocation(role: string, userfid: string): Promise<Direction> {
    debugger;
    return this.db.object<Direction>('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/lastloc').valueChanges().pipe(take(1)).toPromise();
  }


  // Trip handling
  getLastTrip(role: string, userfid: string): Promise<any> {
    return this.db.list('emptracker/labs/' + constant.LABID + "/" + role + '/' + userfid + '/trips', ref => ref.orderByKey().limitToLast(1)).valueChanges().pipe(take(1)).toPromise();
  }
  startnewTrip(role: string, userfid: string, timestamp: number) {
    return this.db.object('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/trips/' + timestamp + '/startedAt').set(timestamp);
  }
  endExistingTrip(role: string, userfid: string, timestamp: number, tripid: number) {
    return this.db.object('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/trips/' + tripid + '/endAt').set(timestamp);
  }
  startnewCollection(role: string, userfid: string, timestamp: number, tripid: number, regid: number) {
    return this.db.object('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/trips/' + tripid + '/collections/' + regid + "/startedAt").set(timestamp);
  }
  endExistingCollection(role: string, userfid: string, tripid: number, regid: number, point: Direction) {
    return this.db.object('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/trips/' + tripid + '/collections/' + regid + "/collectedAt").set(point);
  }
  getallTripList(role: string, userfid: string): Promise<any> {
    return this.db.list('emptracker/labs/' + constant.LABID + "/" + role + '/' + userfid + '/trips', ref => ref.orderByKey()).valueChanges().pipe(take(1)).toPromise();
  }
  getFilteredTripList(role: string, userfid: string, startdate: number, enddate: number): Promise<any> {
    return this.db.list('emptracker/labs/' + constant.LABID + "/" + role + '/' + userfid + '/trips', ref => ref.orderByKey().startAt(startdate.toString()).endAt(enddate.toString())).valueChanges().pipe(take(1)).toPromise();
  }
  getCollectionPoints(userfid: string, tripid: number): Promise<any> {
    return this.db.list('emptracker/labs/' + constant.LABID + '/phlebos/' + userfid + '/trips/' + tripid + 'collections', ref => ref.orderByKey()).valueChanges().pipe(take(1)).toPromise();
  }
  updateExistingPickups(role: string, userfid: string, tripid: number, pickupid: number, point: Direction, stateVerb: string) {
    return this.db.object('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/trips/' + tripid + '/pickups/' + pickupid + "/" + stateVerb + "At").set(point);
  }

  //logs
  putLogs(role: string, userfid: string, logmsg: string, timestamp: number): Promise<any> {
    return this.db.object('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/logs/' + timestamp).set(logmsg);
  }


  //For colse the tracking Page whener collection Done
  getCurrentDate(role: string, userfid: string, startedAt: number, endAt: number) {
    return this.db.object('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/trips/' + startedAt + '/collections/' + endAt + "/startedAt").valueChanges().pipe(take(1)).toPromise();
  }
  // Patient Tracking
  checkPatientAlerted(role: string, userfid: string, tripid: number, regid: number) {
    return this.db.object('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/trips/' + tripid + '/collections/' + regid + "/startedAt").valueChanges().pipe(take(1)).toPromise();
  }
  checkCollectionDone(role: string, userfid: string, tripid: number, regid: number) {
    return this.db.object('emptracker/labs/' + constant.LABID + '/' + role + '/' + userfid + '/trips/' + tripid + '/collections/' + regid + "/collectedAt").valueChanges().pipe(take(1)).toPromise();
  }
  getCreatedAt(regid): Promise<any> {
    return this.db.object('collectiontracker/labs/' + constant.LABID + '/collections/' + regid + '/createdAt').valueChanges().pipe(take(1)).toPromise();
  }
  setEndAt(regid, timestamp) {
    this.db.object('collectiontracker/labs/' + constant.LABID + '/collections/' + regid + '/EndAt').set(timestamp);
  }
  getEndAt(regid): Observable<any> {
    return this.db.object('collectiontracker/labs/' + constant.LABID + '/collections/' + regid + '/EndAt').valueChanges().pipe(take(1));
  }
  getRegwiseTrips(regid): Observable<Direction[]> {
    return this.db.list<Direction>('collectiontracker/labs/' + constant.LABID + '/collections/' + regid + '/routes').valueChanges();
  }
  getRegnCollectionLastLoc(regid): Observable<Direction> {
    return this.db.object<Direction>('collectiontracker/labs/' + constant.LABID + '/collections/' + regid + '/lastloc').valueChanges().pipe(take(1));
  }
  getRegnCollectionCollectat(regid): Observable<Direction> {
    return this.db.object<Direction>('collectiontracker/labs/' + constant.LABID + '/collections/' + regid + '/collectedAt').valueChanges().pipe(take(1));
  }
}
