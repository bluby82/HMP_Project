import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CerbungserviceService {
  constructor(private http: HttpClient) {}

  addCerbung(
    p_title: string,
    p_description: string,
    p_genre: number,
    p_type: string,
    p_imgUrl: string,
    p_userId: number
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('title', p_title);
    body.set('url', p_imgUrl);
    body.set('description', p_description);
    body.set('type', p_type);
    body.set('userID', p_userId.toString());
    body.set('genreID', p_genre.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/add_cerbung.php',
      urlEncodedData,
      { headers }
    );
  }

  // searchCerbungByKeyword(keyword: string): any[] {
  //   const result: any[] = [];

  //   this.cerbung.forEach(cerbung => {
  //     if (cerbung.title.toLowerCase().includes(keyword.toLowerCase())) {
  //       result.push(cerbung);
  //     }
  //   });

  //   return result;
  // }

  // searchCerbungByGenre(genre: string): any[] {
  //   const result: any[] = [];

  //   this.cerbung.forEach(cerbung => {
  //     if (cerbung.genre === genre) {
  //       result.push(cerbung);
  //     }
  //   });

  //   return result;
  // }

  // searchCerbung(keyword: string, genre: string): any[] {
  //   const result: any[] = [];

  //   this.cerbung.forEach(cerbung => {
  //     const titleMatch = cerbung.title.toLowerCase().includes(keyword.toLowerCase());
  //     const genreMatch = cerbung.genre.toLowerCase() === genre.toLowerCase();

  //     if (titleMatch && genreMatch) {
  //       result.push(cerbung);
  //     }
  //   });

  //   return result;
  // }

  cekFollowCerbung(userId: number, cerbungId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('userId', userId.toString());
    body.set('cerbungId', cerbungId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/cek_follow_cerbung.php',
      urlEncodedData,
      { headers }
    );
  }

  cekLikeCerbung(userId: number, cerbungId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('userId', userId.toString());
    body.set('cerbungId', cerbungId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/cek_like_cerbung.php',
      urlEncodedData,
      { headers }
    );
  }

  followCerbung(userId: number, cerbungId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('userId', userId.toString());
    body.set('cerbungId', cerbungId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/follow_cerbung.php',
      urlEncodedData,
      { headers }
    );
  }

  getCerbung(keyword: string, genre: string): Observable<any> {
    const url = 'https://ubaya.me/hybrid/160721046/project/get_cerbung.php';

    const params = new URLSearchParams();
    params.set('keyword', keyword);
    params.set('genre', genre);

    const fullUrl = `${url}?${params.toString()}`;

    return this.http.get(fullUrl);
  }

  getCerbungDetail(cerbungId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('id', cerbungId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/get_cerbung_detail.php',
      urlEncodedData,
      { headers }
    );
  }

  likeCerbung(userId: number, cerbungId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('userId', userId.toString());
    body.set('cerbungId', cerbungId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/like_cerbung.php',
      urlEncodedData,
      { headers }
    );
  }

  readCerbung(cerbungId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('id', cerbungId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/read_cerbung.php',
      urlEncodedData,
      { headers }
    );
  }

  unfollowCerbung(userId: number, cerbungId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('userId', userId.toString());
    body.set('cerbungId', cerbungId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/unfollow_cerbung.php',
      urlEncodedData,
      { headers }
    );
  }

  unlikeCerbung(userId: number, cerbungId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('userId', userId.toString());
    body.set('cerbungId', cerbungId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/unlike_cerbung.php',
      urlEncodedData,
      { headers }
    );
  }

  getFollowingCerbung(p_id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('idUser', p_id);
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/get_cerbung_following.php',
      urlEncodedData,
      { headers }
    );
  }

  getCerbungByIdArray(idArray: number[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('id', idArray.join(','));
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/get_cerbung_by_id.php',
      urlEncodedData,
      { headers }
    );
  }

  getCerbungByIdRespond(p_id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('id', p_id);

    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/get_cerbung_by_id_respond.php',
      urlEncodedData,
      { headers }
    );
  }

  getCerbungByIdUser(p_id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('userId', p_id.toString());

    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/get_cerbung_by_iduser.php',
      urlEncodedData,
      { headers }
    );
  }
}
