import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  txtUsername = ""
  txtPassword = ""
  result = ""
  public alertButtons = ['OK'];

  constructor(private userservice: UserserviceService, private alertController: AlertController, private router: Router, private toastController: ToastController) { }
  showMenu: boolean = false;
  ngOnInit() {
    localStorage.setItem('idUserLogin', (0).toString());
  }

  cekLogin() {
    this.userservice.signIn(this.txtUsername, this.txtPassword).subscribe(
      (response: any) => {
        if (response.result === 'success') {
          this.txtUsername = "";
          this.txtPassword = "";
          localStorage.setItem('idUserLogin', response.id.toString());
          this.router.navigate(['/home'])
        } else {
          this.presentAlert('Status', 'Username atau password tidak sesuai');
          this.txtUsername = ""
          this.txtPassword = ""
        }
      }, error => {
        console.error('Error:', error);
      });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: this.alertButtons,
    });
    await alert.present();
  }

}
