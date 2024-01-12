import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  txtImageURL = ""
  txtPassword = ""
  txtKonfirm = ""
  txtUser = ""
  status = ""
  public alertButtons = ['OK'];
  showMenu: boolean = false;
  userData: any = {}
  usersList: any[] = []
  statusDupe = false

  constructor(private userservice: UserserviceService, private alertController: AlertController, private router: Router) {

  }

  ngOnInit() {
    
  }

  
  registration() {
    this.userservice.signUp(this.txtUser, this.txtImageURL, this.txtPassword).subscribe(
      (response: any) => {
        if (response.result === 'success') {
          this.presentAlert('Status', 'Pendaftaran berhasil. Silahkan login!');
          this.router.navigate(['/login'])
        } else {
          this.presentAlert('Status', 'Pendaftaran gagal. Username sudah dipakai');
        }
      }, error => {
        console.error('Error:', error);
      });
  }
  checkPassword() {
    if (this.txtImageURL != "" && this.txtUser != "" && this.txtPassword != "") {
      if (this.txtPassword == this.txtKonfirm) {
        this.registration()
      } else {
        this.presentAlert('Status', 'Input password dan confirm password tidak sama!')
      }
    } else {
      this.presentAlert('Status', 'Pastikan semua input telah diisi!')
    }
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
