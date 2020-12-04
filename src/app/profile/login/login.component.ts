import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../sign-up/sign-up.component.scss','./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private auth: AuthService) {}
  login: FormGroup;
  show: boolean;
  error = { wrongPass: false, notFound: false };
  ngOnInit(): void {
    this.Login();
  }
  get email() {
    return this.login.get('email');
  }
  get password() {
    return this.login.get('password');
  }
  Login() {
    this.login = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  showPass(show: boolean) {
    this.show = show;
  }
  get userAuth() {
    return this.auth;
  }
  onSubmit() {
    this.auth.logIn(this.login.value).catch((err) => {
      this.error.wrongPass = err.code === 'auth/wrong-password' ? true : false;
      this.error.notFound = err.code === 'auth/user-not-found' ? true : false;
    });
  }
}
