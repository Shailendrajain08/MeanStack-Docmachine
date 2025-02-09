import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaDocumentsComponent } from './ca-documents/ca-documents.component';
import { CaDocumentsRoutingModule } from './cado-routing.module';
import { DropzoneComponent } from './dropzone/dropzone.component';
// import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [CaDocumentsComponent, DropzoneComponent],
  imports: [
    CommonModule,
    CaDocumentsRoutingModule,
    // NgxDropzoneModule
  ]
})
export class CADocModule { }
