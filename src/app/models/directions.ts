export interface Direction {
    id?: any;
    latitude: number;
    longitude: number;
    createdAt: number;
    provider : string,
    speed : number,
    locProvider : number,
    accuracy : number,
    altitude : number,
    bearing : number,
    isFromMockLocations : boolean,
    mockLoc : boolean
  }