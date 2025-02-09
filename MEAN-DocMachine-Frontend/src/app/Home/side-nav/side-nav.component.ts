import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-side-nav',
    standalone: true,
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.scss',
    imports: [CommonModule, RouterLink, ConfirmDialogComponent, RouterOutlet]
})
export class SideNavComponent {

  exp!: boolean;
  inw!: boolean;
  imp: any;
  out: any;
  others!: boolean;
  nt!: boolean;
  billuc!: boolean;
  lc1!: boolean;
  nonlc1!: boolean;
  lcI!: boolean;
  view: boolean = false;
  applicant: any;
  role: any;
  id: any;
  name: any;
  ct!: boolean;
  status: boolean = false;
  status1: boolean = false;
  status2: boolean = false;
  status3: boolean = false;
  status4: boolean = false;
  status5: boolean = false;
  status6: boolean = false;
  status7: boolean = false;
  status8: boolean = false;
  status9: boolean = false;
  status10: boolean = false;
  status11: boolean = false;
  status12: boolean = false;
  status13: boolean = false;
  status14: boolean = false;
  status15: boolean = false;
  status16: boolean = false;
  status17: boolean = false;
  status18: boolean = false;
  status19: boolean = false;
  status20: boolean = false;
  statusS4: boolean = false;
  statusS5: boolean = false;
  statusS6: boolean = false;
  statusS7: boolean = false;
  statusS8: boolean = false;
  statusS9: boolean = false;

  mt1: any;
  mt2: any;
  nt1!: boolean;
  billuc1!: boolean;
  mt3!: boolean;
  mt4: any;
  val!: Object;
  customer: any;
  new:  boolean = false;
  new1: boolean = false;
  new2: boolean = false;
  new3: boolean = false;
  new4: boolean = false;
  new5: boolean = false;
  new7: boolean = false;
  new6: boolean = false;
  new8: boolean = false;
  new9: boolean = false;
  new10: boolean = false;
  new11: boolean = false;
  new12: boolean = false;
  new13: boolean = false;
  new14!: boolean;
  new15!: boolean;
  new16!: boolean;
  new17!: boolean;
  new19!: boolean;
  new18!: boolean;
  new20!: boolean;
  new21!: boolean;
  new22!: boolean;
  new23!: boolean;
  new24!: boolean;
  new25!: boolean;
  new26!: boolean;

  hideIncoice(){

  }

  newTask(){

  }

  newTask1(){

  }

  newTask2(){

  }

  newTask3(){

  }

  newTask4(){

  }

  newTask5(){

  }

  newTask6(){

  }

  newTask7(){

  }

  newTask8(){

  }

  newTask9(){

  }

  newTask10(){

  }

  newTask11(){

  }

  newTask12(){

  }

  newTask13(){

  }

  newTask14(){

  }

  newTask15(){

  }

  newTask16(){

  }

  newTask17(){

  }

  newTask18(){

  }

  newTask19(){

  }

  newTask20(){

  }

  newTask21(){

  }

  newTask22(){

  }

  newTask23(){

  }

  newTask24(){

  }

  newSub1(){

  }

  newSub2(){

  }

  newSub3(){

  }
  newSub4(){

  }
  newSub5(){

  }
  newSub6(){

  }
  newSub7(){

  }
  newSub8(){

  }
  newSub9(){

  }
  newSub10(){

  }
  newSub11(){

  }
  newSub12(){

  }
  newSub13(){

  }
  newSub14(){

  }

  newSub15(){

  }
  newSub16(){

  }
  newSub17(){

  }
  newSub18(){

  }
  newSub19(){

  }
  newSub20(){

  }
  newSub21(){

  }
  newSub22(){

  }
  newSub23(){

  }
  newSub24(){

  }
  newSub25(){

  }
  newSub26(){

  }


  lcSight(){

  }

  lcUsance(){

  }

  buc(){

  }

  buc1(){

  }

  nonlcSight(){

  }

  nonlcUsance(){

  }

  logout(){

  }

}
