import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerAdminRoutingModule } from './power-admin.routing.module';
import { PowerAdminComponent } from './power-admin/power-admin.component';

@NgModule({
  declarations: [PowerAdminComponent],
  imports: [
    CommonModule,
    PowerAdminRoutingModule
  ]
})
export class PowerAdminModule { }
