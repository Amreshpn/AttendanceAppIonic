"# BPHT Attendancediagonstics"
In order to remove conflict on gps while building :

METHOD 1 :
#remove platforms from root directory.
#if plugins directory doesn't exist, go to node_modules/cordova-plugin-googlemaps/plugin.xml and search for 'gps'. Then comment the line coming in result
expected result : "<!--       <uses-feature android:name="android.hardware.location.gps"/> -->"
#if plugin directory exists, folder is generated, do similar thing by going to /plugins/cordova-plugin-googlemaps/plugin.xml
#proceed to add and build android platform as usual.

METHOD 2 :
#npm install
#remove cordova-plugin-background-geolocation wherever it appears from package.json,
but not @mauron85/cordova-plugin-background-geolocation # ionic cordova platform add android # ionic cordova build android --prod --release # ionic cordova plugin add @mauron85/cordova-plugin-background-geolocation --save
--ion-color-primary: #f34f4f;
// --ion-color-primary-rgb: 56, 128, 255;
// --ion-color-primary-contrast: #ffffff;
// --ion-color-primary-contrast-rgb: 255, 255, 255;
// --ion-color-primary-shade: #ce2929;
// --ion-color-primary-tint: #d42929;
