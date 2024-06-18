import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-verified',
  standalone: false,
  templateUrl: './not-verified.component.html',
  styleUrl: './not-verified.component.scss'
})
export class NotVerifiedComponent {
  constructor(private router:Router){}

  onSubmit() {
    this.router.navigate(['/'])
  }
}
