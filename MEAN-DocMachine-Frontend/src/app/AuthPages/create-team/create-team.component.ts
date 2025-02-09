import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import data from '../../bank.json';
import * as data1 from '../../currency.json';
import { Bank } from '../../data.model';
import { Currency } from '../../data.model';

@Component({
  selector: 'app-create-team',
  standalone: false,
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.scss'
})
export class CreateTeamComponent implements OnInit{


  @Input() que: any;
  @Input() entities: any;
  @ViewChild('inputName', { static: true }) public inputRef: ElementRef | undefined;
  @ViewChild(DropzoneDirective, { static: true }) directiveRef?: DropzoneDirective;
  public type: string = 'directive';
  public disabled: boolean = false;
  public item: any;
  public authToken: any;
  public headers: any;
  public file: Array<any> = [];
  public loginForm!: FormGroup;
  public letterHead = false;
  public roundSeal = false;
  public forSeal = false;
  public letterHeadDone = false;
  public roundSealDone = false;
  public forSealDone = false;
  public config!: DropzoneConfigInterface;
  public submitted: boolean = false;
  public isDisabled: boolean = false;
  public jsondata: any;
  public dataJson: any;
  public bankName:any = [];
  public currencyName:any = [];
  public toggle!: boolean;
  public dataJson1: any;
  public jsondata1: any;
  public toggle1!: boolean;
  public submitted1: boolean = false;
  public vcontrol!: FormArray;
  public x: any;
  public y: any;
  public api_base: any;
  public dynamicVariable = false;
  public modo1: any=['choose Account type'];
  apiUrl = `http://localhost:3000/v1`;

constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
private authService: AuthService, private router: Router, private toastr: ToastrService) {
  this.loadFromLocalStorage()
    console.log(this.api_base)
    console.log(this.authToken)
    this.headers = {
      Authorization: this.authToken,
    }
}
ngOnInit(): void {
  this.jsondata = data as unknown as Bank;
    this.dataJson = data1 as unknown as Currency;
    this.jsondata1 = data1 as unknown as Currency;
    this.dataJson1 = data1 as unknown as Currency;
    this.loginForm = this.formBuilder.group({
      teamName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9 _]+$"), (Validators.minLength(3))]],
      iec: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9 _]{10}$"), Validators.maxLength(10)]],
      adress: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9 _]{10}$"), Validators.maxLength(10)]],
      caEmail: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      chaEmail: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      gst: ['', [Validators.required, Validators.pattern("^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$"), Validators.maxLength(15)]],
      location: new FormArray([this.initLocation()]),
      commodity: new FormArray([this.initComo()]),
      bankDetails: new FormArray([this.initCourse()], Validators.required)
})
}



initLocation() {
  return this.formBuilder.group({
    location: ['']
  });
}

initComo() {
  return this.formBuilder.group({
    como: ['']
  });
}

initCourse() {
  return this.formBuilder.group({
    bank: ['', Validators.required],
    bicAddress: ['', [Validators.required, Validators.pattern("^[A-Za-z]{6}[A-Za-z0-9]{5}$"), Validators.maxLength(11)]],
    accNumber: ['', [Validators.required, Validators.pattern("^[0-9]{3,34}")]],
    // accType: ['', Validators.required],
    currency: ['', Validators.required],
  });
}

initProduct() {
  return new FormGroup({
    product: new FormControl('')
  });
}

getCourses(form: any) {
  return form.get('bankDetails').controls;
}

getCoursesLoc(form: any) {
  return form.get('location').controls;
}

getCoursesCom(form: any) {
  return form.get('commodity').controls;
}

onAddCourse(e:any) {

  if (e.controls.bankDetails.invalid) {
    this.submitted1 = true
    this.toastr.error('You can add another bank after filling first one!');
    console.log("2")
    this.isDisabled = false;
    return;
  }
  console.log("fffff")
  this.currencyName.push('')
  this.bankName.push('')
  const control = this.loginForm.controls.bankDetails as FormArray;
  control.push(this.initCourse());
  this.isDisabled = false;
  this.modo1.push('Choose Account Type');
}

onAddCourseLoc(e:any) {

  if (e.controls.location.invalid) {
    this.submitted1 = true
    this.toastr.error('You can add another bank after filling first one!');
    console.log("2")
    this.isDisabled = false;
    return;
  }
  console.log("fffff")
  const control = this.loginForm.controls.location as FormArray;
  control.push(this.initLocation());
  this.isDisabled = false;
}

onAddCourseCom(e:any) {

  if (e.controls.commodity.invalid) {
    this.submitted1 = true
    this.toastr.error('You can add another bank after filling first one!');
    console.log("2")
    this.isDisabled = false;
    return;
  }
  console.log("fffff")
  const control = this.loginForm.controls.commodity as FormArray;
  control.push(this.initComo());
  this.isDisabled = false;

}

removeAddress(i:any) {
  console.log(i)
  let control1 = this.loginForm.controls.bankDetails as FormArray;
  control1.removeAt(i);
  this.bankName.splice(i, 1)
  this.currencyName.splice(i, 1)
}

removeAddressLoc(i:any) {
  console.log(i)
  let control1 = this.loginForm.controls.location as FormArray;

  control1.removeAt(i);
}

removeAddressCom(i:any) {
  console.log(i)
  let control1 = this.loginForm.controls.commodity as FormArray;

  control1.removeAt(i);
}


public onUploadInit(args: any): void {
  console.log('onUploadInit:', args);
}

public onUploadError(args: any): void {
  //this.uploading = false;
  console.log('onUploadError:', args, args[1].message);
}
public onUploadSuccess(args: any): void {
  //this.uploading = false;]
  console.log(args[1].data)
  console.log(Object.keys(args[1].data)[0])
  this.file.push(args[1].data)
  console.log(this.file)
  this.letterHead = false;
  this.roundSeal = false;
  this.forSeal = false;
  if (Object.keys(args[1].data)[0] == 'Letter Head') {
    this.letterHeadDone = true;
  }
  else if (Object.keys(args[1].data)[0] == 'Round Seal') {
    this.roundSealDone = true;
  }
  else {
    this.forSealDone = true;
  }

}

public sending(args: any, value:any) {
  args[2].append('fileType', value);
  if (value == 'Letter Head') {
    this.letterHead = true;
  }
  else if (value == 'Round Seal') {
    this.roundSeal = true;
  }
  else {
    this.forSeal = true;
  }
}

get f() { return this.loginForm.controls; }

get g(): FormArray {
  return this.loginForm.get('bankDetails') as FormArray;
}

get h(): FormArray {
  return this.loginForm.get('location') as FormArray;
}

get c(): FormArray {
  return this.loginForm.get('commodity') as FormArray;
}

onSubmit() {

  console.log(this.loginForm.value.bankDetails)
  console.log(this.loginForm.value)
  console.log("1")
  this.submitted = true
  this.submitted1 = true
  this.isDisabled = true;
  if (this.loginForm.invalid) {
    this.toastr.error('Invalid inputs, please check!');
    console.log("2")
    this.isDisabled = false;
    return;
  }

  console.log("3")
  this.loginForm.value.file = this.file
  console.log(this.loginForm.value)

  let array1:any=[]
  this.loginForm.value.bankDetails.forEach((value:any, index:any) => {
    const newVal = { ...value };
    newVal['accType']=this.modo1[index]
    array1.push(newVal)

});
this.loginForm.value.bankDetails=array1
  this.authService.creatTeam(this.loginForm.value)
    .subscribe(
      (data:any) => {
        console.log("king123")
        console.log(data['data']._id)
        this.item = data
        this.toastr.success('Company details uploaded successfully!');
        this.router.navigate(['/addMember'], { queryParams: { id: data['data']._id } })

      },
      (error:any) => {
        this.toastr.error('something wrong, please check the details!');
        console.log("error")
      });
}

searchData(e:any, i:any) {
  this.x = i
  this.toggle = true;
  console.log(e)
  this.jsondata = []
  for (let data of this.dataJson) {
    if (data.bank.toLowerCase().includes(e.toLowerCase())) {
      this.jsondata.push(data)
    }


  }
}

searchCurrency(e:any, i:any) {
  this.y = i
  this.toggle1 = true;
  console.log(e)
  this.jsondata1 = []
  for (let data of this.dataJson1) {
    if (data.currency.toLowerCase().includes(e.toLowerCase())) {
      console.log('1')
      this.jsondata1.push(data)
    }


  }
  console.log(this.jsondata1)
  console.log(this.currencyName.length)
}

public loadFromLocalStorage() {
  const token = localStorage.getItem('token');
  this.authToken = token;
  return this.authToken;
}

bankClick(e:any, i:any) {
  this.bankName[i] = e
  console.log(this.bankName)
  this.toggle = false;

}

currencyClick(e:any, i:any) {
  this.currencyName[i] = e
  console.log(this.currencyName)

  this.toggle1 = false;


}

modo(e:any, i:any) {
  console.log(e)
  this.modo1[i]=e
  // this.modo1[i+1]='choose Account Type'
  if (e === 'OD-over draft' || e === 'CC- cash credit' || e === 'CA-Current account') {
    this.currencyName[i] = "INR"
  }
}

}
