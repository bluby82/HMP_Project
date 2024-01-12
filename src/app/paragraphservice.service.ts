import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ParagraphserviceService {
  constructor(private http: HttpClient) {}

  getParagrafByCerbungId(cerbungId: number, userId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('id', cerbungId.toString());
    body.set('userId', userId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/get_paragraph_for_cerbung.php',
      urlEncodedData,
      { headers }
    );
  }

  addParagraph(cerbungID: number, userID: number, content: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('cerbungID', cerbungID.toString());
    body.set('userID', userID.toString());
    body.set('content', content);
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/add_paragraph.php',
      urlEncodedData,
      { headers }
    );
  }

  cekLikeParagraph(userId: number, paragraphId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('userId', userId.toString());
    body.set('paragraphId', paragraphId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/cek_like_paragraph.php',
      urlEncodedData,
      { headers }
    );
  }

  likeParagraph(userId: number, paragraphId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('userId', userId.toString());
    body.set('paragraphId', paragraphId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/like_paragraph.php',
      urlEncodedData,
      { headers }
    );
  }

  unlikeParagraph(userId: number, paragraphId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('userId', userId.toString());
    body.set('paragraphId', paragraphId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/unlike_paragraph.php',
      urlEncodedData,
      { headers }
    );
  }
}
