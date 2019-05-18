import { User } from './../../models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.styl']
})
export class SystemComponent implements OnInit, OnDestroy {

  user;
  showGoBackBut = false;

  routerSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.routerSubscription = router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.showGoBackBut = val.url === '/employees' ? false : true;

        if (val.url === '/') {
          this.router.navigate(['employees']);
        }
      }
    });
  }

  ngOnInit() {
    this.userSubscription = this.userService.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout() {
    this.userService.logout();
  }

  goBack() {

  }

}
