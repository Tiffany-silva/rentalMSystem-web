import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Role, User} from '../entityModels/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isSuccessful = false;
  errorMessage = '';
  roles: Role[] = [Role.LESSEE, Role.LESSOR, Role.ADMIN];
  formGroup: FormGroup;
  titleAlert = 'This field is required';
  post: any = '';
  selectedProfile: File;
  progress = 0;
  message = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate();
  }

  createForm() {
    const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailRegex)]],
      name: [null, Validators.required],
      username: [null, Validators.required],
      role: [null],
      password: [null, [Validators.required, this.checkPassword]],
      validate: ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate === '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.formGroup.get('username').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = 'You need to specify at least 3 characters';
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
          this.formGroup.get('username').setValidators(Validators.required);

        }
        this.formGroup.get('name').updateValueAndValidity();
        this.formGroup.get('username').updateValueAndValidity();
      }
    );
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get username() {
    return this.formGroup.get('username') as FormControl;
  }

  checkPassword(control: any) {
    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? {requirements: true} : null;
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid email address' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This email address is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  onSubmit(post: any): void {
    console.log(post);
    const user = {
      name: post.name,
      username: post.username,
      email: post.email,
      password: post.password,
      role: post.role
    };
    console.log(this.selectedProfile);
    this.authService.uploadImageAndGetURL(this.selectedProfile).subscribe(url => {
      console.log(url);
      user['photoURL'] = url;
      this.authService.registerUser(user).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.router.navigate(['/login']);
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    });
  }

  selectFile(event) {
    this.selectedProfile = event.target.files;
  }


}
