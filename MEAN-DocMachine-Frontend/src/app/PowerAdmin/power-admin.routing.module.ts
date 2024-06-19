import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PowerAdminComponent } from './power-admin/power-admin.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
    {
        path : '',
        component : PowerAdminComponent,
        pathMatch : 'full',
        canActivate: [authGuard], 
        data: { roles: ['admin'] }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PowerAdminRoutingModule { }