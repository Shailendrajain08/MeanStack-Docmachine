import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-power-admin',
  standalone: false,
  templateUrl: './power-admin.component.html',
  styleUrl: './power-admin.component.scss'
})
export class PowerAdminComponent implements OnInit {

  item2: any;
  val: any;
  value: any = [];
  file: any;
  approved!: boolean;
  pending!: boolean;
  declined!: boolean;
  status: boolean = false;
  name: any;

  constructor(private authservice: AuthService, public router: Router, private toastr: ToastrService,
    private route: ActivatedRoute) {

  }

  async ngOnInit() {
    this.val = await this.authservice.getAllUser();
    this.route.params.subscribe(async params => {
      this.val = await this.authservice.getAllUser();
      this.file = this.route.snapshot.params['file'];

      if (this.file === 'approved') {
        this.approved = true;
        this.pending = false;
        this.declined = false;
        for (let value of this.val['data']) {
          if (value.role !== 'admin') {
            if (value.verified === 'yes') {
              this.value.push(value)
            }
          }
        }
      } else if (this.file === 'pending') {
        this.approved = false;
        this.pending = true;
        this.declined = false;
        for (let value of this.val['data']) {
          if (value.role !== 'admin') {
            if (value.verified === 'no') {
              this.value.push(value)
            }
          }
        }
      } else if (this.file === 'declined') {
        this.approved = false;
        this.pending = false;
        this.declined = true;
        for (let value of this.val['data']) {
          if (value.role !== 'admin') {
            if (value['verified'] == 'declined') {
              this.value.push(value)
            }
          }
        }
      }
    })
  }

  submit(_id: any,  emailId: any) {
    console.log(`userID is ${_id} and emailID is ${emailId} `)
    let x = "yes"
    this.authservice.updateOneUser(_id, x, emailId).subscribe((data:any)=> {
      console.log(data)
    })
  }

  decline(_id: any, emailId: any) {

  }

  delete(_id: any, i: any) {

  }

  newTask() {

  }

  logout() {

  }

}
