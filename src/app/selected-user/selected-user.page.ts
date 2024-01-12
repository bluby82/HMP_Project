import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { CerbungserviceService } from '../cerbungservice.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-selected-user',
  templateUrl: './selected-user.page.html',
  styleUrls: ['./selected-user.page.scss'],
})
export class SelectedUserPage implements OnInit {
  userId = 0;
  user: any = null;
  arrCerbung: any[] = [];
  statusFollow = 0;

  idUserLogin = -1;

  constructor(
    private route: ActivatedRoute,
    private userService: UserserviceService,
    private cerbungService: CerbungserviceService,
    private navCtrl: NavController
  ) {
    const snapshot: ActivatedRouteSnapshot = route.snapshot;
    this.userId = snapshot.params['userId'];
    const storedIdUserLogin = localStorage.getItem('idUserLogin');
    this.idUserLogin = storedIdUserLogin ? parseInt(storedIdUserLogin) : -1;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = +params['userId'];
      this.checkFollowUser();

      this.getUserById();

      this.getCerbungByUserID();
    });
  }

  getUserById() {
    this.userService.getUserById(this.userId).subscribe((response: any) => {
      if (response.result == 'OK') {
        this.user = response.data;
      }
    });
  }

  getCerbungByUserID() {
    this.cerbungService.getCerbungByIdUser(this.userId).subscribe(
      (response: any) => {
        if (response.result == 'OK') {
          this.arrCerbung = response.data;
        }
      },
      (error) => {
        console.error('Error in getCerbungByIdUser request:', error);
        alert('Error loading Cerbung data, ' + error);
      }
    );
  }

  goReadPage(cerbungId: number) {
    this.navCtrl.navigateForward('/read/' + cerbungId, {
      state: {
        idUserLogin: this.idUserLogin,
      },
    });
  }

  checkFollowUser() {
    this.userService
      .checkFollowUser(this.idUserLogin, this.userId)
      .subscribe((response: any) => {
        if (response.result == 'OK') {
          if (response.data == 'followed') {
            this.statusFollow = 1;
          } else {
            this.statusFollow = 0;
          }
        } else if (response.result == 'MISSING') {
        } else {
          console.log('cek follow ERROR', response.message);
          alert('ERROR: ' + response.message);
        }
      });
  }

  followUser() {
    this.userService
      .followUser(this.idUserLogin, this.userId)
      .subscribe((response: any) => {
        if (response.result == 'OK') {
          this.statusFollow = 1;
        }
      });
  }

  unfollowUser() {
    this.userService
      .unFollowUser(this.idUserLogin, this.userId)
      .subscribe((response: any) => {
        if (response.result == 'OK') {
          this.statusFollow = 0;
        }
      });
  }
}
