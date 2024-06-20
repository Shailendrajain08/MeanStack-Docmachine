import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaDocumentsComponent } from './ca-documents/ca-documents.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
    {
        path : '',
        component : CaDocumentsComponent,
        pathMatch : 'full',
        canActivate: [authGuard], 
        data: { roles: ['ca'] }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CaDocumentsRoutingModule { }