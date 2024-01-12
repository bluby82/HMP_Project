import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenreserviceService {
  genre: any;

  constructor(private http: HttpClient) {}

  getGenres(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post(
        'https://ubaya.me/hybrid/160721046/project/get_genres.php',
        {},
        { headers }
      )
      .pipe(map((response: any) => response.map((genre: any) => genre.name)));
  }

  getGenreIdByName(genreName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('genreName', genreName);

    return this.http.post(
      'https://ubaya.me/hybrid/160721046/project/get_genre_id.php',
      body.toString(),
      { headers }
    );
  }
}
