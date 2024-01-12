import { Component, OnInit } from '@angular/core';
import { CerbungserviceService } from '../cerbungservice.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ParagraphserviceService } from '../paragraphservice.service';
import { GenreserviceService } from '../genreservice.service';

@Component({
  selector: 'app-create3',
  templateUrl: './create3.page.html',
  styleUrls: ['./create3.page.scss'],
})
export class Create3Page implements OnInit {
  idUserLogin = -1;

  cerbungIdBaru: number = 0;
  genreId = 0;

  dataCerbungTadi: any;

  new_title = '';
  new_description = '';
  new_imgUrl = '';
  new_genre = '';

  new_access = 'Restricted';
  new_firstPara = '';

  cbAgree = false;

  public alertButtons = ['OK'];

  statusKosong = false;

  constructor(
    private genreservice: GenreserviceService,
    private router: Router,
    private cerbungservice: CerbungserviceService,
    private paragraphservice: ParagraphserviceService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const storedIdUserLogin = localStorage.getItem('idUserLogin');
    this.idUserLogin = storedIdUserLogin ? parseInt(storedIdUserLogin) : -1;

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

    console.log(
      this.new_title,
      this.new_description,
      this.new_imgUrl,
      this.new_genre,
      this.new_access,
      this.new_firstPara
    );
  }

  addCerbung() {
    if (this.cbAgree === false) {
      this.statusKosong = true;
    } else {
      this.cbAgree = false;
      this.statusKosong = false;

      this.genreservice
        .getGenreIdByName(this.new_genre)
        .subscribe((response: any) => {
          if (response.genreId) {
            this.genreId = response.genreId;
            console.log(this.genreId);
            console.log(this.idUserLogin);
            this.cerbungservice
              .addCerbung(
                this.new_title,
                this.new_description,
                this.genreId,
                this.new_access,
                this.new_imgUrl,
                this.idUserLogin
              )
              .subscribe((response: any) => {
                if (response) {
                  this.cerbungIdBaru = response;
                  console.log(this.cerbungIdBaru + 'halohalo');
                  this.paragraphservice
                    .addParagraph(
                      this.cerbungIdBaru,
                      this.idUserLogin,
                      this.new_firstPara
                    )
                    .subscribe(
                      (data) => {
                        console.log('paragraf berhasil');
                        this.router.navigate(['/home']);
                      },
                      (error) => {
                        console.log('Error menambahkan paragraph:', error);
                      }
                    );
                }
              });
          }
        });
    }
  }

  create2Page() {
    this.statusKosong = false;

    const queryParams = {
      title: this.new_title,
      description: this.new_description,
      imgUrl: this.new_imgUrl,
      genre: this.new_genre,
      access: this.new_access,
      firstPara: this.new_firstPara,
    };
    this.router.navigate(['/create2'], {
      queryParams: queryParams,
    });
  }
}
