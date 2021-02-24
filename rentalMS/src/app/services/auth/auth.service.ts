import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({  'Access-Control-Allow-Origin': '*'})
};
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly apiKey:string='659ad79210abf40244561adc10b63988';

  constructor(private http: HttpClient) {
  }
  // logs all types of users
  login(credentials: { username: string; password: string; }): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: credentials.username,
      password: credentials.password,
    }, httpOptions);
  }
  // registers all types of users
  registerUser(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup',user, httpOptions);
  }

  uploadImageAndGetURL(file:any): Observable<any>{
    let formdata: FormData = new FormData();
    formdata.append('image', file[0]);
    console.log(file[0]);
    return this.http.post(`https://api.imgbb.com/1/upload`, formdata, {params :{key: this.apiKey}})
      .pipe(map((response:any)=>response['data']['url']));
  }
}
