import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  RouterModule.forChild([{
    path: "",
    component: SideNavComponent,
    children: [
      { path: "dashboardTask", loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  },

  ])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
