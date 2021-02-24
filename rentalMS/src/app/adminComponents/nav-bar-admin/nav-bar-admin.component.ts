import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/token/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.scss']
})
export class NavBarAdminComponent{

  constructor( private auth: AuthService, private tokenstorage:TokenStorageService, private router:Router) {}


  logout(){
    let user=this.tokenstorage.getUser();
    let role={role: user.role};
    console.log(role);
    console.log(user);
    this.tokenstorage.signOut();
    this.router.navigate(['/login']);
  }

  isUserloggedIn():boolean{
    if(this.tokenstorage.isAuthenticated()){
      return true;
    }
    return false;
  }
}
