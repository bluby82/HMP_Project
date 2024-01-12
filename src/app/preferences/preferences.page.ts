import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {
  idUserLogin = -1;
  userName = '';
  darkMode = false;
  newPassword = '';
  retypePassword = '';
  oldPassword = '';
  userImageProfile = '';

  constructor(
    private userService: UserserviceService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const storedIdUserLogin = localStorage.getItem('idUserLogin');
    this.idUserLogin = storedIdUserLogin ? parseInt(storedIdUserLogin) : -1;
    this.getUsername();
    this.getUserImageProfile();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if (this.darkMode) {
      localStorage.setItem('darkMode', 'true');
    } else {
      localStorage.setItem('darkMode', 'false');
    }
  }

  changePassword() {
    this.userService
      .checkPassword(this.idUserLogin, this.oldPassword)
      .subscribe((response: any) => {
        if (
          response.result == 'OK' &&
          this.newPassword.trim().length > 0 &&
          this.newPassword == this.retypePassword
        ) {
          this.userService
            .changePassword(this.idUserLogin, this.newPassword)
            .subscribe((response: any) => {
              if (response.result == 'OK') {
                console.log('Successfully change password');
                alert('Successfully change password');
              } else {
                console.log('Error in changing password: ', response.message);
                alert('Error in changing password: ' + response.message);
              }
            });
        } else {
          alert(
            'old Password is incorrect or new password is not equal to re-type password : ' +
              this.oldPassword +
              ' ' +
              this.newPassword +
              ' ' +
              this.retypePassword +
              ' ' +
              response.result
          );
          console.log(response.message);
        }
      });
  }

  getUsername() {
    this.userService
      .getUsername(this.idUserLogin)
      .subscribe((response: any) => {
        if (response.result == 'OK') {
          this.userName = response.data;
        } else {
          alert('ERROR: ' + response.message);
        }
      });
  }

  getUserImageProfile() {
    this.userService
      .getUserImageProfile(this.idUserLogin)
      .subscribe((response: any) => {
        if (response.result == 'OK') {
          this.userImageProfile = response.data;
        } else {
          alert('ERROR: ' + response.message);
        }
      });
  }

  // logout(){

  //   this.logOutConfirmation()

  // }

  async logOutConfirmation() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to Log out?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('No clicked');
          },
        },
        {
          text: 'LOGOUT',
          cssClass: 'danger',
          handler: () => {
            console.log('Yes clicked');
            localStorage.removeItem('idUserLogin');
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }
}
