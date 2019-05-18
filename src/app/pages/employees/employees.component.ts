import { User } from './../../models/user';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { UserService } from './../../services/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.styl']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  employees = null;
  user = null;

  displayedColumns: string[] = ['firstName', 'secondName', 'patronymic', 'phone', 'email', 'date'];

  employeesSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private employeesService: EmployeesService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.employeesSubscription = this.employeesService.employees.subscribe(data => {
      this.employees = data;
    });

    this.employeesService.get();
    this.userSubscription = this.userService.getUser().subscribe((data: User) => {
      this.user = data;
      if (this.user.role === 'admin') {
        this.displayedColumns.push('controls');
      }
    });
  }

  ngOnDestroy() {
    if (this.employeesSubscription) {
      this.employeesSubscription.unsubscribe();
    }

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  remove(employee) {
    this.employeesService.remove(employee.id);
  }

  edit(employee) {
    this.router.navigate(['/edit', employee.id]);
  }
}
