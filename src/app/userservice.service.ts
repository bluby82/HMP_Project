import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserserviceService {

  constructor(private http: HttpClient) { }

  signIn(p_username:string, p_password: string)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', p_username);
    body.set('password', p_password);
    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.me/hybrid/160721046/project/login.php", urlEncodedData, { headers });
  }
  getUsername(p_id:number)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.me/hybrid/160721046/project/get_username.php", urlEncodedData, { headers });
  }

  getUserImageProfile(p_id:number)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.me/hybrid/160721046/project/get_user_imageprofile.php", urlEncodedData, { headers });
  }
  getUserById(p_id:number)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
  
    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.me/hybrid/160721046/project/get_user_by_id.php", urlEncodedData, { headers });
  }

  signUp(p_username: string, p_imgUrl: string, p_password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', p_username);
    body.set('urlPhoto', p_imgUrl);
    body.set('password', p_password);
    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.me/hybrid/160721046/project/registration.php", urlEncodedData, { headers });
  }

  changePassword(p_userId: number, p_newpassword: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('userId', p_userId.toString());
    body.set('newPassword', p_newpassword);
    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.me/hybrid/160721046/project/change_password.php", urlEncodedData, { headers });
  }

  checkPassword(p_idUser: number, p_old_password: string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('userId', p_idUser.toString());
    body.set('password', p_old_password);
    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.me/hybrid/160721046/project/check_password.php", urlEncodedData, { headers });
  }

  getFollowedUser(p_idUser: number){
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('userId', p_idUser.toString());
    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.me/hybrid/160721046/project/get_followed_user.php", urlEncodedData, { headers });
  }

  getAllUsers(p_idUser: number){
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('userId', p_idUser.toString());
    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.me/hybrid/160721046/project/get_users.php", urlEncodedData, { headers });
  }

  checkFollowUser(p_idUserFollower:number, p_idUserFollowed: number){
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('userIdFollower', p_idUserFollower.toString());
    body.set('userIdFollowed', p_idUserFollowed.toString());

    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.me/hybrid/160721046/project/cek_follow_user.php", urlEncodedData, { headers });
  }


  followUser(p_idUserFollower:number, p_idUserFollowed: number){
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('userIdFollower', p_idUserFollower.toString());
    body.set('userIdFollowed', p_idUserFollowed.toString());

    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.me/hybrid/160721046/project/follow_user.php", urlEncodedData, { headers });
  }

  unFollowUser(p_idUserFollower:number, p_idUserFollowed: number){
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('userIdFollower', p_idUserFollower.toString());
    body.set('userIdFollowed', p_idUserFollowed.toString());

    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.me/hybrid/160721046/project/unfollow_user.php", urlEncodedData, { headers });
  }

}
