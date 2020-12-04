import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUp: FormGroup;
  strength: any;
  validation: any;
  show: boolean;
  error = { alreadyExist: false };
  constructor(private fb: FormBuilder, private auth: AuthService) {}
  ngOnInit() {
    this.SignUp();
  }
  get name() {
    return this.signUp.get('name');
  }
  get username() {
    return this.signUp.get('username');
  }
  get email() {
    return this.signUp.get('email');
  }
  get password() {
    return this.signUp.get('password');
  }
  get confirmPassword() {
    return this.signUp.get('confirmPass');
  }
  get agree() {
    return this.signUp.get('agree');
  }
  SignUp() {
    this.signUp = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPass: ['', Validators.required],
        agree: [false, Validators.requiredTrue],
      },
      { validator: CustomValidators.confirmPassword }
    );
  }
  validate(password: string) {
    this.validation = [
      password.length > 5,
      password.search(/[A-Z]/) > -1,
      password.search(/[0-9]/) > -1,
      password.search(/[@#$_&;,!?+-]/) > -1,
    ];
    this.strength = this.validation.reduce((acu, cur) => acu + cur);
  }
  showPass(show: boolean) {
    this.show = show;
  }
  onSubmit() {
    this.auth.signIn(this.signUp.value).catch((err) => {
      this.error.alreadyExist =
        err.code === 'auth/email-already-in-use' ? true : false;
    });
  }
}
