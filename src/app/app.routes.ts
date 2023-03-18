import { Route } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/reports',
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('@challenge/reports').then((m) => m.ReportsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
