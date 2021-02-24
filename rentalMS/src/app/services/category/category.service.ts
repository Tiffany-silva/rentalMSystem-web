import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    console.log(this.http.get(baseUrl));
    return this.http.get(baseUrl + '/categories', { responseType: 'json' });
  }

  getAllItemsOfCategory(categoryId: number): Observable<any> {
    return this.http.get(`${baseUrl}/categories/${categoryId}/items`);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(baseUrl + '/categories/add', {categoryName: data});
  }

  updateCategory(data: any, categoryId: number): Observable<any> {
    return this.http.put(`${baseUrl}/categories/update/${categoryId}`, {categoryName: data});
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${baseUrl}/categories/${categoryId}`);
  }

}
