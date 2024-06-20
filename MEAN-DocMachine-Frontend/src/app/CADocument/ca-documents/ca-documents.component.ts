import { Component, ViewChild } from '@angular/core';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ca-documents',
  standalone: false,
  templateUrl: './ca-documents.component.html',
  styleUrl: './ca-documents.component.scss'
})
export class CaDocumentsComponent {
  @ViewChild(DropzoneDirective, { static: true }) directiveRef?: DropzoneDirective;
  public showInvoice: any
  public pending!: boolean;
  public completed!: boolean;
  public item1 : any;
  public all!: boolean;
  public config!: DropzoneConfigInterface;
  public type: string = 'directive';
  public status: boolean = false;
  public name:any;

  files: File[] = [];

  constructor(private authService : AuthService, private router:Router) {

  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  viewTask(data : any){

  }

  onUploadError($event : any) {

  }

  onUploadInit($event: any) {

  }

  onUploadSuccess($event:any) {

  }

  clicked(data: any) {

  }

  newTask() {

  }

  public logout() {
    this.authService.logout();
    this.router.navigate([""]);
  }
}
