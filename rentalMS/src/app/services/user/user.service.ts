import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:8080/api';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateEmail(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updateEmail/${id}`, data);
  }

  updatePassword(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updatePassword/${id}`, data);
  }

  updateName(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updateName/${id}`, data);
  }

  updatePhotoURL(id:any, data:any): Observable<any> {
    return this.http.put(`${baseUrl}/updatePhotoURL/${id}`, data);
  }

  getUser(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/users/userId/${id}`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(baseUrl+ '/users');
  }

  create(data:any): Observable<any> {
    return this.http.post(baseUrl,data);
  }

  deleteUser(id:any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
