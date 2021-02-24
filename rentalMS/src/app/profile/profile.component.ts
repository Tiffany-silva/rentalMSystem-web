import { Component, OnInit } from '@angular/core';
import {formatISO, parseISO} from 'date-fns';
import {UserService} from '../services/user/user.service';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../services/token/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  myProfile: any;
  id: any;
  errorMessage:any;
  role:any;

  constructor(private authService: AuthService,private router: Router, private tokenService: TokenStorageService,
              private userService: UserService) {
    this.getUserDetails();

  }

  ngOnInit() {
  }

  getUserDetails() {
    this.id=this.tokenService.getUser().id;
    this.role=this.tokenService.getUser().roles[0];
    this.userService.getUser(this.id).subscribe(data => {
      this.myProfile = data;
      console.log(data);
    })
  }

}
