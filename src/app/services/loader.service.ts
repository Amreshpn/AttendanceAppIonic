
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = false;
  constructor(
    public loadingController: LoadingController
  ) { }

  // This will show then autohide the loader
  showHideAutoLoader() {

    this.loadingController.create({
      message: 'This Loader Will Auto Hide in 2 Seconds',
      duration: 2000
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });

  }

  // Show the loader for infinite time
  async showLoader() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Please wait...'
    }).then((res) => {
      res.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          res.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  // Hide the loader if already created otherwise return error
  async hideLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });

  }


}
