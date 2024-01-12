import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class NotificationserviceService {
  constructor(private http: HttpClient) {}
  getRequest(p_id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('idUser', p_id);
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/get_notification.php',
      urlEncodedData,
      { headers }
    );
  }
  getRequestById(p_userid: string, p_cerbungid: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('idUser', p_userid);
    body.set('idCerbung', p_cerbungid);
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/get_request.php',
      urlEncodedData,
      { headers }
    );
  }
  updateRequestById(p_userid: string, p_cerbungid: string, p_status: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('idUser', p_userid);
    body.set('idCerbung', p_cerbungid);
    body.set('status', p_status);
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/update_request.php',
      urlEncodedData,
      { headers }
    );
  }

  addRequest(p_userId: number, p_cerbungId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('userId', p_userId.toString());
    body.set('cerbungId', p_cerbungId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/add_request.php',
      urlEncodedData,
      { headers }
    );
  }

  cekRequest(p_userId: number, p_cerbungId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('userId', p_userId.toString());
    body.set('cerbungId', p_cerbungId.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/cek_request_cerbung.php',
      urlEncodedData,
      { headers }
    );
  }
}
