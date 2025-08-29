import { Routes } from '@angular/router';
import { HomePage } from './pages/home.page/home.page';

export const routes: Routes = [
  // Default path
  {
    path: '',
    component: HomePage,
    pathMatch: 'full',
  },
  // Fallback route
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];