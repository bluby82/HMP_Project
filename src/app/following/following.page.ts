import { Component, OnInit } from '@angular/core';
import { CerbungserviceService } from '../cerbungservice.service';
import { UserserviceService } from '../userservice.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {

  idUserLogin: number =0 ;
  followingCerbungData: any[] = [];
  status : boolean=true;
  usernameMap: { [userId: number]: string } = {};
  constructor(private cerbungservice: CerbungserviceService,private userservice: UserserviceService, private alertController: AlertController, private router: Router, private toastController: ToastController, private navCtrl: NavController) { }

  ngOnInit() {
    const storedIdUserLogin = localStorage.getItem('idUserLogin');
    this.idUserLogin = storedIdUserLogin ? parseInt(storedIdUserLogin):0;
    this.tampilFollowing();
  }
  

  tampilFollowing() {
    this.cerbungservice.getFollowingCerbung(this.idUserLogin.toString()).subscribe(
      (response: any) => {
        if (response.result === 'OK') {
          const cerbungIds = response.dataId.map((item: { cerbung_id: any; }) => item.cerbung_id);
          this.cerbungservice.getCerbungByIdArray(cerbungIds).subscribe(
            (cerbungResponse: any) => {
              if (cerbungResponse.result === 'OK') {
                this.followingCerbungData = cerbungResponse.data;
              } else {
                //alert(cerbungResponse.message + "1")
                this.status=false
              }
            },
            error => {
             alert( error + "2");
            }
          );
        } else {
          this.status=false
          //alert(response.message + "3")
        }
      },
      error => {
       alert(error + "4");
      }
    );
  }
  goReadPage(cerbungId: number) {
    this.navCtrl.navigateForward('/read/' + cerbungId, {
      state: {
        idUserLogin: this.idUserLogin
      }
    });
  }
}
