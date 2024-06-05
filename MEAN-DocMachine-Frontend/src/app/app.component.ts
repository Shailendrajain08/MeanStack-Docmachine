import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignUpComponent } from "./Pages/sign-up/sign-up.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, SignUpComponent]
})
export class AppComponent {
  title = 'MEAN-DocMachine-Frontend';
}
