import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HlmDialogImports } from '@ecp/app/libs/ui/dialog/src';
import { HlmInputImports } from '@ecp/app/libs/ui/input/src';
import { HlmLabelImports } from '@ecp/app/libs/ui/label/src';
import { HlmToggleImports } from '@ecp/app/libs/ui/toggle/src';
import { ChatService } from '@ecp/app/services/chat.service';
import { FavouritesService } from '@ecp/app/services/favourites.service';
import { ItemsService } from '@ecp/app/services/items.service';
import { TradeRequestService } from '@ecp/app/services/trade-request.service';
import { UserService } from '@ecp/app/services/user.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHeart, lucideMessagesSquare } from '@ng-icons/lucide';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { BrnToggleGroupImports } from '@spartan-ng/brain/toggle-group';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { Item } from 'src/app/libs/models/item.record';
import { MarketplaceItemCard } from './marketplace-item-card/marketplace-item-card';
import { MarketplaceItemForm } from './marketplace-item-form/marketplace-item-form';

@Component({
	selector: 'app-marketplace-item',
	imports: [
		HlmButtonImports,
		CommonModule,
		HlmAvatarImports,
		HlmToggleImports,
		BrnToggleGroupImports,
		HlmDialogImports,
		BrnDialogImports,
		ReactiveFormsModule,
		HlmInputImports,
		HlmLabelImports,
		MarketplaceItemCard,
		MarketplaceItemForm
	],
	providers: [provideIcons({ lucideHeart, lucideMessagesSquare })],
	template: `
		<app-marketplace-item-card [item]="item()" (openClick)="openTradeDialog()"/>
		@if(isFormOpen()) {
			<app-marketplace-item-form [item]="item()" (closeClick)="closeTradeDialog()"/>
		}
		
	`,
})
export class MarketplaceItemComponent {
	readonly item = input.required<Item>();
	isFormOpen = signal(false);


	openTradeDialog() {
		this.isFormOpen.set(true);
	}

	closeTradeDialog() {
		this.isFormOpen.set(false);
	}
}
