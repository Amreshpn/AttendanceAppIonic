import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, LoadingController, ToastController, AlertController } from "@ionic/angular";
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {

  loader: any;
  username: any;
  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public authService: AuthService,
    public ionLoader: LoaderService,
    private toastsrv: ToastService,

  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.menu.enable(false, 'patient');
  }
  forgetPassword() {
    debugger;
    this.ionLoader.showLoader();
    this.authService.forgetPassword(this.username).subscribe(async (res: any) => {
      debugger;

      this.ionLoader.hideLoader();
      var data = res.d;
      if (data.Result != null) {
        this.toastsrv.presentToast(data.Result);
      }
      else {
        this.toastsrv.presentToast(data.Result);
      }
    }, error => { console.log(error); this.ionLoader.hideLoader(); });
  }
}
