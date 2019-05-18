import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employees = new Subject<Employee>();
  loading = new Subject<any>();

  private store = {
    employees: null,
  };

  constructor(
    private http: HttpClient
  ) { }

  get() {
    this.http.get(`http://localhost:3000/employees`).subscribe((res: Employee[]) => {
      this.store.employees = res;
      this.employees.next(this.store.employees);

    }, err => {
      console.error(err);
    });
  }

  getById(id) {
    return this.http.get(`http://localhost:3000/employees?id=${id}`);
  }

  post(data, id = null) {
    return this.http.post(`http://localhost:3000/employee`, { data, id });
  }

  remove(id) {
    this.http.delete(`http://localhost:3000/employee?id=${id}`).subscribe(() => {
      const index = this.store.employees.findIndex(item => {
        return item.id === id;
      });

      this.store.employees.splice(index, 1);
      this.employees.next(this.store.employees.slice(0));

    }, err => {
      console.error(err);
    });
  }
}
