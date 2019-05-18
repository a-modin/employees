import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate  {

  user: User;

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.userService.getUser().pipe(map((data: User) => {
      if (!data || data.role !== 'admin') {
        this.router.navigate(['employees']);
        return false;

      } else {
        return true;
      }
    }));

  }
}
