import { Component } from '@angular/core';
import { MarketplaceComponent } from '../../components/marketplace/marketplace.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
	selector: 'app-marketplace-page',
	standalone: true,
	imports: [MarketplaceComponent, NavbarComponent],
	template: `
		<app-navbar />
		<main class="px-4 pt-20">
			<app-marketplace />
		</main>
	`,
	styles: ``,
})
export default class MarketplacePage {}
