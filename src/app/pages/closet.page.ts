import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ClosetComponent } from "../components/closet/closet.component";

@Component({
  selector: 'app-closet-page',
  imports: [NavbarComponent, ClosetComponent],
  template: `
    <app-navbar />
    <main class="pt-20 px-4">
      <app-closet />
    </main>
  `,
  styles: ``
})
export default class ClosetPage {
}
