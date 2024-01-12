import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserserviceService } from '../userservice.service';
import { CerbungserviceService } from '../cerbungservice.service';
import { NotificationserviceService } from '../notificationservice.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-respond',
  templateUrl: './respond.page.html',
  styleUrls: ['./respond.page.scss'],
})
export class RespondPage implements OnInit {

  idUserLogin = -1
  idRequest = 0
  user_id=0
  cerbung_id=0
  userData: any;
  cerbungData: any;
  requestData:any;

  constructor( private router: Router, private route: ActivatedRoute,  private http: HttpClient, private userservice:UserserviceService, private cerbungservice:CerbungserviceService, private notifservice:NotificationserviceService, private alertController: AlertController) { }

  ngOnInit() {
    const storedIdUserLogin = localStorage.getItem('idUserLogin');
    this.idUserLogin = storedIdUserLogin ? parseInt(storedIdUserLogin) : 0;
    const storedIdUserIdRequest= localStorage.getItem('user_id');
    this.user_id = storedIdUserIdRequest ? parseInt(storedIdUserIdRequest) : 0;
    const storedIdCerbungIdRequest =localStorage.getItem('cerbung_id');
    this.cerbung_id = storedIdCerbungIdRequest ? parseInt(storedIdCerbungIdRequest) : 0;

    this.loadData();
  }
  goBackToNotifications() {
    this.router.navigateByUrl('/notifications', { replaceUrl: true });
  }
  loadData() {
    this.getUserData();
    this.getCerbungData();
    this.getRequestData();
  }
  async presentConfirmation(status: string) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: `Are you sure you want to ${status.toLowerCase()} this request?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Operation canceled');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.updateStatus(status+"d");
          }
        }
      ]
    });
  
    await alert.present();
  }
  getUserData() {
    this.userservice.getUserById(this.user_id).subscribe(
      (response: any) => {
        if (response.result === 'OK') {
          this.userData = response.data;
        } else {
          alert(response.message);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getRequestData() {
    this.notifservice.getRequestById(this.user_id.toString(), this.cerbung_id.toString()).subscribe(
      (response: any) => {
        if (response.result === 'OK') {
          this.requestData = response.data;
        } else {
          alert(response.message)
        }
      },
      error => {
        // Handle kesalahan jika diperlukan
        console.error(error);
      }
    );
  }
  getCerbungData() {
    this.cerbungservice.getCerbungByIdRespond(this.cerbung_id.toString()).subscribe(
      (response: any) => {
        if (response.result === 'OK') {
          this.cerbungData = response.data;
        } else {
          alert(response.message);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateStatus(p_status:string) { 
    this.notifservice.updateRequestById( this.user_id.toString(), this.cerbung_id.toString(), p_status).subscribe(
      (response: any) => {
        if (response.result === 'OK') {
          this.ngOnInit()
        } else {
          alert(response.message)
        }
      },
      error => {
        console.error(error);
      }
    );
  }
}
