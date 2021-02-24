import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {TokenStorageService} from './token/token.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(public token: TokenStorageService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    let url: string = state.url;
    let v=this.checkUserLogin(next, url);
    console.log(v);
    return v;
  }

  // canActivate(): boolean {
  //   if (!this.token.isAuthenticated()) {
  //
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  //   return true;
  // }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    let role;
    if (this.token.isAuthenticated()===true) {
      if(this.token.getUser()){
        role=this.token.getUser().roles[0];

        console.log(this.token.getUser().roles[0]);
      }
      if (route.data.role && route.data.role.indexOf(role) === -1) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
