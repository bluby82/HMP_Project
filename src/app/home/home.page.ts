import { Component } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { CerbungserviceService } from '../cerbungservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, catchError, forkJoin, map, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  idUserLogin = -1;
  cerbungs: any[] = [];
  search: string = '';
  genre: string = '';
  details: any[] = [];
  authorData: any = {};
  paragraphData: any = {};
  likesData: any = {};

  constructor(
    private userservice: UserserviceService,
    private cerbungservice: CerbungserviceService,
    private router: Router,
    private navCtrl: NavController
  ) {}
  ngOnInit() {
    this.cerbungservice
      .getCerbung(this.search, this.genre)
      .subscribe((data: any) => {
        this.cerbungs = data;
      });

    const storedIdUserLogin = localStorage.getItem('idUserLogin');
    this.idUserLogin = storedIdUserLogin ? parseInt(storedIdUserLogin) : -1;
  }

  searchCerbung() {
    this.cerbungservice
      .getCerbung(this.search, this.genre)
      .subscribe((data: any) => {
        this.cerbungs = data;
      });
  }

  clearGenre() {
    this.genre = '';
    this.searchCerbung();
  }

  goReadPage(index: number) {
    this.cerbungservice
      .getCerbung(this.search, this.genre)
      .subscribe((data: any) => {
        this.cerbungs = data;
      });
    this.navCtrl.navigateForward('/read/' + index, {
      state: {
        idUserLogin: this.idUserLogin,
      },
    });
  }
}
