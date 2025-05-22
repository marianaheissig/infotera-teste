import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((mod) => mod.HomeComponent),
  }, 
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.component').then((mod) => mod.SearchComponent),
    
  }, 
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component').then((mod) => mod.CheckoutComponent),

  },
  {
    path: 'hotel/:id',
    loadComponent: () => import('./pages/hotel/hotel.component').then((mod) => mod.HotelComponent), 
  },
   {
    path: 'success',
    loadComponent: () => import('./pages/success/success.component').then((mod) => mod.SuccessComponent),

  },
];
