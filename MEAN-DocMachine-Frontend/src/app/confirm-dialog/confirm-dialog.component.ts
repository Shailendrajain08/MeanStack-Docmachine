import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from './confirm-dialog.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [NgIf],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent implements OnInit {

  message: any;

  constructor(private confirmService : ConfirmDialogService){

  }

  ngOnInit(): any {
    /**
     *   This function waits for a message from alert service, it gets
     *   triggered when we call this from any other component
     */
     this.confirmService.getMessage().subscribe(message => {
         this.message = message;
     });
 }

}
