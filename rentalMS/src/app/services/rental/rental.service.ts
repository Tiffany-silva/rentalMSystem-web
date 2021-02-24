import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:8080/api';
@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http: HttpClient) { }

  updateRentalStatus(id:any, rentalId: number, status:any): Observable<any> {
    return this.http.put(`${baseUrl}/users/${id}/rentals/${rentalId}/updateStatus/${status}`,{});
  }

  extendReturnDate(id:any, returnDate:any): Observable<any> {
    return this.http.put(`${baseUrl}/extendReturnDate/${id}`, {returnDate: returnDate});
  }

  getAllRentals(): Observable<any> {
    return this.http.get(baseUrl);
  }

  checkAvailability(itemId:any, data:any){
    return this.http.post(`${baseUrl}/items/checkAvailability/${itemId}`,data);
  }
  getMyOrders(userId:any): Observable<any> {
    return this.http.get(`${baseUrl}/users/${userId}/myorders`);
  }
  getAllForStatus(status:any): Observable<any> {
    return this.http.get(`${baseUrl}/findAllForStatus`, {params: {bookingStatus: status}});
  }
  findAllRentalsOfUser(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/users/${id}/rentals`);
  }

  createRental(data:any, itemId:any, userId:any): Observable<any> {
    return this.http.post(`${baseUrl}/items/${itemId}/rentals/${userId}`,data);
  }

  findAllForStatusOfUser(id:any, status:any): Observable<any> {
    return this.http.get(`${baseUrl}/findAllForStatusOfUser`, {params: {id: id, bookingStatus: status}});
  }

}
