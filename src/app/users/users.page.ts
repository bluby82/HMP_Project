import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  selectedSegment = 'mostLiked';
  idUserLogin = -1;
  arrUser: any[] = [];

  constructor(
    private router: Router,
    private userService: UserserviceService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const storedIdUserLogin = localStorage.getItem('idUserLogin');
    this.idUserLogin = storedIdUserLogin ? parseInt(storedIdUserLogin) : -1;
    this.getAllUsers();
  }

  segmentChanged(event: any) {
    if (event.detail.value === 'mostLiked') {
      this.getAllUsers();
    } else if (event.detail.value === 'following') {
      this.getFollowedUsers();
    }
  }

  getFollowedUsers() {
    this.userService
      .getFollowedUser(this.idUserLogin)
      .subscribe((response: any) => {
        if (response.result == 'OK') {
          this.arrUser = response.data;
        } else if (response.result == 'EMPTY') {
          alert("you don't follow any user: " + this.idUserLogin);
        } else {
          alert('ERROR: ' + response.message);
        }
      });
  }

  getAllUsers() {
    this.userService
      .getAllUsers(this.idUserLogin)
      .subscribe((response: any) => {
        if (response.result == 'OK') {
          this.arrUser = response.data;
        } else if (response.result == 'EMPTY') {
          alert("you don't follow any user: " + this.idUserLogin);
        } else {
          alert('ERROR: ' + response.message);
        }
      });
  }

  selectUser(user: any) {
    const userId = user.user_id;
    this.navCtrl.navigateForward('/selected-user/' + userId, {
      state: {
        idUserLogin: this.idUserLogin,
      },
    });
  }
}
