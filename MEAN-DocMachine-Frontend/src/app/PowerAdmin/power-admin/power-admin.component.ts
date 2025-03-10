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
  user:any;
  role:any

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

    await this.authservice.getUserDetail().subscribe(
      (res: any) => {
        this.user = res;
        this.name = this.user.data.fullName;
        this.role = this.user.data.role;
      })
  }

  submit(_id: any, i: any, emailId: any) {
    let x;
    if (this.approved) {
      x = 'no'
    }
    else if (this.pending) {
      x = 'yes'
    }
    else if (this.declined) {
      x = 'yes'
    }
    this.authservice.updateOneUser(_id, x, emailId).subscribe((data: any) => {
      this.value.splice(i, 1)
      if (this.approved) {
        this.toastr.success('Revoked Successfully');
      }
      else if (this.pending || this.declined) {
        this.toastr.success('Approved Successfully');
      }
    })
  }

  decline(_id: any, i: any, emailId: any) {
    this.authservice.updateOneUser(_id, "declined", emailId)
      .subscribe(
        async data => {
          this.value.splice(i, 1)
          //this.message = data['message']
          this.toastr.success('Account declined successfully');

        },
        error => {
          console.log("error")
        });
  }

  delete(_id: any, i: any) {

    this.authservice.deleteUser(_id)
      .subscribe(
        (data: any) => {
          this.value.splice(i, 1)
          this.toastr.success('Account Deleted');

        },
        error => {
          console.log("error")
        });
  }

  newTask() {

  }

  public logout() {
    this.authservice.logout();
    this.router.navigate([""]);
  }

}
