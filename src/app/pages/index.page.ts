import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [NavbarComponent],
  template: `
    <app-navbar></app-navbar>
  `,
  styles: ``
})
export default class LandingPage {
  //todo: create landing page
  route = inject(Router);
  
  constructor() {
    this.route.navigate(['/home']);
  }
}
