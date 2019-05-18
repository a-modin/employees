import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;
  private loading = false;
  private token = null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.token = localStorage.getItem('token') || null;
  }

  getUser() {
    return new Observable((observer => {
      if (this.user) {
        observer.next(this.user);
        observer.complete();

      } else if (this.token) {
        this.getUserByToken(this.token).subscribe(() => {
          observer.next(this.user);
          observer.complete();
        });

      } else {
        observer.next(null);
      }
    }));
  }

  login(login, password) {
    return new Observable(observer => {

      if (!login || !password) {
        observer.error();
      }

      this.http.post(`http://localhost:3000/auth`, { login, password }).subscribe((res: User) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);

        this.getUserByToken(this.token).subscribe(user => {
          observer.next(this.user);
          observer.complete();
        }, err => {
            observer.error();
        });
      }, err => {
          observer.error();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.token = null;
    this.user = null;
    this.router.navigate(['auth']);
  }

  getUserByToken(token) {
    return new Observable(observer => {
      this.http.get(`http://localhost:3000/user?token=${token}`).subscribe((res: User) => {
        this.user = res;
        observer.next(this.user);
        observer.complete();
      });
    });
  }
}
