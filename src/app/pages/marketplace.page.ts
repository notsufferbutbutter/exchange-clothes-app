import { Component } from '@angular/core';
import { MarketplaceComponent } from '../components/marketplace/marketplace.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-marketplace-page',
  standalone: true,
  imports: [MarketplaceComponent, NavbarComponent],
  template: `
    <app-navbar />
    <app-marketplace />
  `,
  styles: ``,
})
export default class MarketplacePage {

}
