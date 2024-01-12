import { Component, OnInit } from '@angular/core';
import { NotificationserviceService } from '../notificationservice.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  idUserLogin: number =0 ;
  user_id:number=0;
  cerbung_id:number=0;
  status : boolean=true;
  notificationData: any[] = [];
  constructor(private notificationservice: NotificationserviceService, private alertController: AlertController,  private router: Router,  // <-- Inject Router
  private toastController: ToastController,
  private navCtrl: NavController) { }

  ngOnInit() {
    const storedIdUserLogin = localStorage.getItem('idUserLogin');
    this.idUserLogin = storedIdUserLogin ? parseInt(storedIdUserLogin) : 0;
    this.getNotificationData();
  }
  getNotificationData() {
      this.notificationservice.getRequest(this.idUserLogin.toString()).subscribe(
        (response: any) => {
          if (response.result === 'OK') {
            this.notificationData = response.data;
          } else {
            this.status=false
          }
        },
        error => {
          console.error(error);
        }
      );
  }
  
  respondToRequest(p_userId:number, p_cerbungId:number) {

    localStorage.setItem('user_id',p_userId.toString());
    localStorage.setItem('cerbung_id',p_cerbungId.toString());

    this.router.navigate(['/respond']);
  }
}
