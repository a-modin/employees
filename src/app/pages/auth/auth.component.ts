import { UserService } from './../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.styl']
})
export class AuthComponent implements OnInit, OnDestroy {

  getUserSubscription: Subscription;
  loginSubscription: Subscription;

  authForm: FormGroup;
  authError = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.authForm = this.fb.group({

      login: new FormControl('', {
        validators: [
          Validators.required,
        ],
        updateOn: 'submit'
      }),

      password: new FormControl('', {
        validators: [
          Validators.required,
        ],
        updateOn: 'submit'
      }),

    });
  }

  ngOnInit() {
    this.getUserSubscription = this.userService.getUser().subscribe(data => {
      if (data) {
        this.router.navigate(['employees']);
      }
    });
  }

  ngOnDestroy() {
    if (this.getUserSubscription) {
      this.getUserSubscription.unsubscribe();
    }

    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onSubmit() {
    const login = this.authForm.value.login;
    const password = this.authForm.value.password;

    this.loginSubscription = this.userService.login(login, password).subscribe(data => {
      if (data) {
        this.authError = false;
        this.router.navigate(['employees']);
      }
    }, err => {
      this.authError = true;
    });
  }
}
