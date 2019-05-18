import { EmployeesService } from './../../services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.styl']
})
export class EditComponent implements OnInit, OnDestroy {

  addSubscription: Subscription;
  getSubscription: Subscription;

  employeeForm: FormGroup;
  id = null;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private employeesService: EmployeesService,
    private router: Router
  ) {
    if (this.activatedRoute.snapshot.routeConfig.path === 'edit/:id') {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
    }
  }

  ngOnInit() {
    this.createForm();

    if (this.id) {
      this.getSubscription = this.employeesService.getById(this.id).subscribe(data => {
        this.setForm(data);

      }, err => {
        console.error(err);
      });
    }
  }

  ngOnDestroy() {
    if (this.addSubscription) {
      this.addSubscription.unsubscribe();
    }

    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
  }

  setForm(data) {
    delete data.id;
    this.employeeForm.setValue(data);
  }

  createForm() {
    this.employeeForm = this.fb.group({

      firstName: new FormControl('', {
        validators: [
          Validators.required,
        ],
      }),

      secondName: new FormControl('', {
        validators: [
          Validators.required,
        ],
      }),

      patronymic: new FormControl('', {
        validators: [
          Validators.required,
        ],
      }),

      phone: new FormControl('', {
        validators: [
          Validators.required,
        ],
      }),

      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ],
      }),

      date: new FormControl('', {
        validators: [
          Validators.required,
        ],
      }),

    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const data = this.employeeForm.value;
      this.addSubscription = this.employeesService.post(data, this.id).subscribe(() => {
        this.router.navigate(['employees']);

      }, err => {
        console.error(err);
      });
    }
  }

}


