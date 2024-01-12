import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  hideMenu: boolean = true;
  idUserLogin: number;

  constructor(private router: Router, private navCtrl: NavController) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url
        this.hideMenu = this.isLoginRegistrationPage(currentRoute)
      }
    });
    const storedIdUserLogin = localStorage.getItem('idUserLogin')
    this.idUserLogin = storedIdUserLogin ? parseInt(storedIdUserLogin) : -1
    if (this.idUserLogin <= 0 && !this.isLoginRegistrationPage(this.router.url)) {
      this.navCtrl.navigateForward(['/login'])
    }
  }

  isLoginRegistrationPage(route: string): boolean {
    return (route == '/login' || route == '/registration')
  }

  openPage(page: string) {
    this.navCtrl.navigateForward('/' + page, {
      state: {
        idUserLogin: this.idUserLogin
      }
    });
  }

  clearLocalForCreate() {
    localStorage.removeItem('new_title');
    localStorage.removeItem('new_description');
    localStorage.removeItem('new_imgUrl');
    localStorage.removeItem('new_genre');

    localStorage.removeItem('new_access');
    localStorage.removeItem('new_firstPara');

    localStorage.removeItem('new_agree');
  }
}
