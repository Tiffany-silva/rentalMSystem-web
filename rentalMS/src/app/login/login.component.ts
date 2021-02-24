import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../services/token/token.service';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  isSuccessful: boolean;
  errorMessage: any;
  isLoggedIn: boolean;
  isLoginFailed: boolean;
  role: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.createForm();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getError(el: any) {
    switch (el) {
      case 'username':
        if (this.formGroup.get('username').hasError('required')) {
          return 'Username required';
        }
        break;
      case 'pass':
        if (this.formGroup.get('password').hasError('required')) {
          return 'Password required';
        }
        break;
      default:
        return '';
    }
    return '';
  }
  onSubmit(post: any) {
    const user = {
      username: post.username,
      password: post.password,
    };
    this.authService.login(user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        console.log(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().roles;
        console.log(this.role);
        this.isSuccessful = true;
        if (this.role[0] === 'ROLE_LESSOR'){
          this.router.navigate(['/lessor-home']);
        }else if (this.role[0] === 'ROLE_LESSEE'){
          this.router.navigate(['/home']);
        }else if (this.role[0] === 'ROLE_ADMIN'){
          this.router.navigate(['/admin-home']);
        }
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isLoginFailed = true;
      }
    );
  }
}
