import { NgModule } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { IsAdminGuard } from './guards/isAdmin.guard';

import { AuthComponent } from './pages/auth/auth.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { SystemComponent } from './pages/system/system.component';
import { EditComponent } from './pages/edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: 'employees',
        component: EmployeesComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'new',
        component: EditComponent,
        canActivate: [AuthGuard, IsAdminGuard]
      },

      {
        path: 'edit/:id',
        component: EditComponent,
        canActivate: [AuthGuard, IsAdminGuard]
      },
    ]
  },

  {
    path: 'auth',
    component: AuthComponent,
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
