import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreserviceService } from '../genreservice.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  idUserLogin = -1;

  new_title = '';
  new_description = '';
  new_imgUrl = '';
  new_genre = '';

  new_access = 'Restricted';
  new_firstPara = '';

  genres: any[] = [];
  arr_genre: string[] = [];

  statusKosong = false;

  constructor(
    private genreservice: GenreserviceService,
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const storedIdUserLogin = localStorage.getItem('idUserLogin');
    this.idUserLogin = storedIdUserLogin ? parseInt(storedIdUserLogin) : -1;

    this.genreservice.getGenres().subscribe(
      (genres: string[]) => {
        this.genres = genres;
      },
      (error) => {
        console.error('Error fetching genres', error);
      }
    );

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
  }

  create2Page() {
    if (
      this.new_title === '' ||
      this.new_description === '' ||
      this.new_imgUrl === '' ||
      this.new_genre === ''
    ) {
      this.statusKosong = true;
    } else {
      this.statusKosong = false;

      console.log(
        this.new_title,
        this.new_description,
        this.new_imgUrl,
        this.new_genre
      );
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
}
