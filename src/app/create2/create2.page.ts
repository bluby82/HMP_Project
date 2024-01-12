import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create2',
  templateUrl: './create2.page.html',
  styleUrls: ['./create2.page.scss'],
})
export class Create2Page implements OnInit {
  idUserLogin = -1;

  dataCerbungTadi: any;

  new_title = '';
  new_description = '';
  new_imgUrl = '';
  new_genre = '';

  new_access = 'Restricted';
  new_firstPara = '';

  jumlahKarakter = 0;

  statusKosong = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const storedIdUserLogin = localStorage.getItem('idUserLogin');
    this.idUserLogin = storedIdUserLogin ? parseInt(storedIdUserLogin) : -1;

    this.new_access = 'Restricted';

    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams) {
        this.new_title = queryParams['title'] || '';
        this.new_description = queryParams['description'] || '';
        this.new_imgUrl = queryParams['imgUrl'] || '';
        this.new_genre = queryParams['genre'] || '';
        this.new_access = queryParams['access'] || 'Restricted';
        this.new_firstPara = queryParams['firstPara'] || '';
      }
    });
    this.refreshJumlahKarakter();
  }

  refreshJumlahKarakter() {
    if (this.new_firstPara === '') {
      this.jumlahKarakter = 0;
    } else {
      this.jumlahKarakter = this.new_firstPara.length;
    }
  }

  create1Page() {
    this.statusKosong = false;

    const queryParams = {
      title: this.new_title,
      description: this.new_description,
      imgUrl: this.new_imgUrl,
      genre: this.new_genre,
      access: this.new_access,
      firstPara: this.new_firstPara,
    };

    this.router.navigate(['/create'], {
      queryParams: queryParams,
    });
  }

  create3Page() {
    this.statusKosong = false;

    if (this.new_access === '' || this.new_firstPara === '') {
      this.statusKosong = true;
    } else {
      const queryParams = {
        title: this.new_title,
        description: this.new_description,
        imgUrl: this.new_imgUrl,
        genre: this.new_genre,
        access: this.new_access,
        firstPara: this.new_firstPara,
      };

      this.router.navigate(['/create3'], {
        queryParams: queryParams,
      });
    }
  }
}
