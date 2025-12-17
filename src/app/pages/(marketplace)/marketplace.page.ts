import { Component } from '@angular/core';
import { MarketplaceComponent } from '../../components/marketplace/marketplace.component';

@Component({
	selector: 'app-marketplace-page',
	standalone: true,
	imports: [MarketplaceComponent],
	template: `
		<app-marketplace />
	`
})
export default class MarketplacePage {}
