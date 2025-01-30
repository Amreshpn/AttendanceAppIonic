export let SHOW_VEHICLES_WITHIN = 20;
export let POSITION_INTERVAL = 10 * 1000;
export let VEHICLE_LAST_ACTIVE_LIMIT = 2 * 60 * 1000; // 2 mins

export let DEAL_STATUS_PENDING = 'pending';
export let DEAL_STATUS_ACCEPTED = 'accepted';
export let TRIP_STATUS_GOING = 'going';
export let TRIP_STATUS_FINISHED = 'finished';
export let TRIP_STATUS_CANCELED = 'canceled';
export let DEAL_TIMEOUT = 20 * 1000; // 20s


export let DEFAULT_AVATAR = "./assets/img/default.png";

export const environment = {
  production: true,
  appName: 'ober',

  firebaseConfig: {
    apiKey: "AIzaSyD9n1OeJlSM3elsQtAofUxBrGXGz_o-v9c",
    authDomain: "elabassistlogistics.firebaseapp.com",
    databaseURL: "https://elabassistlogistics-default-rtdb.firebaseio.com",
    projectId: "elabassistlogistics",
    storageBucket: "elabassistlogistics.appspot.com",
    messagingSenderId: "585761476300",
    appId: "1:585761476300:web:705cf5535f487e28ae3c69",
    measurementId: "G-7M8XETJCQ6"
  },

  langArr: [
    { name: 'English', code: 'en' },
    { name: 'española', code: 'es' },
    { name: 'عربى', code: 'ar' },
    { name: '中文', code: 'cn' }
  ], mapOptions: {
    zoom: 17,
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  }
};
