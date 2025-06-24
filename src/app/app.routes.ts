import { Routes } from '@angular/router';
import { FormBuilder } from './form-builder/form-builder';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'form/builder',
  },
  {
    path: 'form/builder',
    component: FormBuilder,
  },
];
