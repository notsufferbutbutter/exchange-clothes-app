import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-landing-page',
  imports: [NavbarComponent],
  template: `
    <app-navbar></app-navbar>
  `,
  styles: ``
})
export default class LandingPage {

}
