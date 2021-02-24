import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/token/token.service';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar-lessee',
  templateUrl: './nav-bar-lessee.component.html',
  styleUrls: ['./nav-bar-lessee.component.scss']
})
export class NavBarLesseeComponent{

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
