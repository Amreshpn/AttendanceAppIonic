import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
// import { AuthConstants } from '../config/auth-constants';
// import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {
  constructor( public router: Router,public navCtrl:NavController) {}
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
debugger;

    var username = window.localStorage.getItem("UserFID");
      if(username==undefined || username == null){
        this.navCtrl.navigateRoot('login');
        resolve(false);
      }else{
        // this.navCtrl.navigateRoot('selectlab');
           var Role = window.localStorage.getItem("Role");
          switch(Role){
            case "Patient":
              this.navCtrl.navigateRoot('testprofiletab');
    
            break;
            case "Admin":
              this.navCtrl.navigateRoot('dashboard');
    
              break;
              case "Collection Boy":
                this.navCtrl.navigateRoot("phlebolanding");
      
                break;
    
          }
        resolve(false);
      }

      // this.storageService
      //   .get(AuthConstants.AUTH)
      //   .then(res => {
      //     if (res) {
      //       this.router.navigate(['home']);
      //       resolve(false);
      //     } else resolve(true);
      //   })
      //   .catch(err => {
      //     resolve(true);
      //   });
    });
  }
}
