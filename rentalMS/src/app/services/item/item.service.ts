import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  updateQuantity(itemId: number, categoryId: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/categories/${categoryId}/items/${itemId}/updateQuantity`, {quantity: data});
  }

  updatePrice(itemId: number, categoryId: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/categories/${categoryId}/items/${itemId}/updatePrice`, {price: data});
  }

  updateItem(itemId: number, categoryId: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/categories/${categoryId}/items/${itemId}/update`, data);
  }
  getAllItems(): Observable<any> {
    return this.http.get(baseUrl + '/items', {responseType: 'json'});
  }

  getItem(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/items/itemId/${id}`);
  }

  createItem(userId: number, categoryId: number, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/users/${userId}/categories/${categoryId}/items`, data);
  }

  deleteItem(itemId: number, categoryId: number): Observable<any> {
    return this.http.delete(`${baseUrl}/categories/${categoryId}/items/${itemId}`);
  }
  getAllItemsByUser(userId: number): Observable<any> {
    return this.http.get(`${baseUrl}/users/${userId}/items`);
  }

}
