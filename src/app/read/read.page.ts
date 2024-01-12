import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CerbungserviceService } from '../cerbungservice.service';
import { UserserviceService } from '../userservice.service';
import { ParagraphserviceService } from '../paragraphservice.service';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs';
import { NotificationserviceService } from '../notificationservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {
  idUserLogin = -1;
  idCerbung = 0;
  paragraphs: any;
  cerbung: any;
  teksParagraf = '';
  jumlahKarakter = 0;
  public alertButtons = ['OK'];
  statusFollow = false;
  statusLike = false;
  statusReq = false;
  access = 'Restricted';

  tmpStatusApprove = 'Request sent';

  statusKosong = false;

  constructor(
    private notificationservice: NotificationserviceService,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private cerbungservice: CerbungserviceService,
    private userservice: UserserviceService,
    private paragraphservice: ParagraphserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    const storedIdUserLogin = localStorage.getItem('idUserLogin');
    this.idUserLogin = storedIdUserLogin ? parseInt(storedIdUserLogin) : -1;

    this.refreshData();
  }

  refreshData() {
    this.route.params.subscribe((params) => {
      this.idCerbung = params['idCerbung'];
      this.cerbungservice.readCerbung(this.idCerbung).subscribe((data: any) => {
        this.cerbung = data;
        this.access = this.cerbung[0].type;
        if (this.idUserLogin == this.cerbung[0].id_user) {
          this.access = 'Public';
        }
        this.paragraphservice
          .getParagrafByCerbungId(this.idCerbung, this.idUserLogin)
          .subscribe((data) => {
            this.paragraphs = data;
          });
        this.cekFollow();
        this.cekLike();
        this.cekRequest();
      });
    });
  }

  refreshJumlahKarakter() {
    this.jumlahKarakter = this.teksParagraf.length;
  }

  tambahkanParagraf() {
    if (this.teksParagraf == '') {
      this.statusKosong = true;
      console.log(this.statusKosong);
    } else {
      this.statusKosong = false;
      this.paragraphservice
        .addParagraph(this.idCerbung, this.idUserLogin, this.teksParagraf)
        .subscribe(
          (data) => {
            this.teksParagraf = '';
            console.log('berhasil');
            this.refreshJumlahKarakter();
            this.refreshData();
          },
          (error) => {
            console.error('Error menambahkan paragraph:', error);
          }
        );
    }
  }

  trackByFn(index: number, item: any): any {
    return index;
  }

  cekFollow() {
    this.cerbungservice
      .cekFollowCerbung(this.idUserLogin, this.idCerbung)
      .subscribe((data) => {
        if (data) {
          console.log('sudah follow');
          this.statusFollow = true;
        } else {
          console.log('belum follow');
          this.statusFollow = false;
        }
      });
  }

  followCerbung() {
    this.cerbungservice
      .followCerbung(this.idUserLogin, this.idCerbung)
      .subscribe((data) => {
        this.refreshData();
      });
  }

  unfollowCerbung() {
    this.cerbungservice
      .unfollowCerbung(this.idUserLogin, this.idCerbung)
      .subscribe((data) => {
        this.refreshData();
      });
  }

  cekLike() {
    this.cerbungservice
      .cekLikeCerbung(this.idUserLogin, this.idCerbung)
      .subscribe((data) => {
        if (data) {
          console.log('sudah like');
          this.statusLike = true;
        } else {
          console.log('belum like');
          this.statusLike = false;
        }
      });
  }

  likeCerbung() {
    this.cerbungservice
      .likeCerbung(this.idUserLogin, this.idCerbung)
      .subscribe((data) => {
        this.refreshData();
      });
  }

  unlikeCerbung() {
    this.cerbungservice
      .unlikeCerbung(this.idUserLogin, this.idCerbung)
      .subscribe((data) => {
        this.refreshData();
      });
  }

  likeParagraph(paraId: number) {
    this.paragraphservice
      .likeParagraph(this.idUserLogin, paraId)
      .subscribe((data) => {
        this.refreshData();
      });
  }

  unlikeParagraph(paraId: number) {
    this.paragraphservice
      .unlikeParagraph(this.idUserLogin, paraId)
      .subscribe((data) => {
        this.refreshData();
      });
  }

  requestToContribute() {
    this.notificationservice
      .addRequest(this.idUserLogin, this.idCerbung)
      .subscribe(
        (data) => {
          this.refreshData();
        },
        (error) => {
          this.refreshData();
        }
      );
  }

  cekRequest() {
    this.notificationservice
      .cekRequest(this.idUserLogin, this.idCerbung)
      .subscribe((data: any) => {
        if (data) {
          console.log('Response:', data);
          this.statusReq = true;
          if (data.status === 'Declined') {
            this.tmpStatusApprove = 'Declined';
            this.access = 'Restricted';
          } else if (data.status === 'Approved') {
            this.tmpStatusApprove = 'Approved';
            this.access = 'Public';
          } else {
            this.tmpStatusApprove = 'Request sent';
            this.access = 'Restricted';
          }
          console.log('sudah req');
        } else {
          console.log('belum req');
          this.statusReq = false;
        }
      });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: this.alertButtons,
    });
    await alert.present();
  }
}
