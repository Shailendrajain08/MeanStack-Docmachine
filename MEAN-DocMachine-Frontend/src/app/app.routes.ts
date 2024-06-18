import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./AuthPages/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'power-admin',
        loadChildren: () => import('./PowerAdmin/power-admin.module').then(m=>m.PowerAdminModule)
    }
];
