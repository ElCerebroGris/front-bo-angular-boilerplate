import { Routes } from '@angular/router';
import { CrudSampleComponent } from './components/crud-sample/crud-sample.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddSampleComponent } from './components/crud-sample/add-sample/add-sample.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'sample', component: CrudSampleComponent },
  { path: 'add-sample/:idSample', component: AddSampleComponent },
  { path: 'login', component: LoginComponent }
];
