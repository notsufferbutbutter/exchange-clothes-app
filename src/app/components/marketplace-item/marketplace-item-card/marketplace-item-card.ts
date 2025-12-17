import { DatePipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Item } from '@ecp/app/libs/models/item.record';
import { HlmAvatar } from '@ecp/app/libs/ui/avatar/src';
import { HlmButton, HlmButtonImports } from '@ecp/app/libs/ui/button/src';
import { HlmCard, HlmCardContent, HlmCardDescription, HlmCardFooter, HlmCardTitle } from '@ecp/app/libs/ui/card/src';
import { ChatService } from '@ecp/app/services/chat.service';
import { FavouritesService } from '@ecp/app/services/favourites.service';
import { ItemsService } from '@ecp/app/services/items.service';
import { TradeRequestService } from '@ecp/app/services/trade-request.service';
import { UserService } from '@ecp/app/services/user.service';
import { NgIcon } from '@ng-icons/core';
import { BrnToggleGroupImports } from '@spartan-ng/brain/toggle-group';

@Component({
  selector: 'app-marketplace-item-card',
  imports: [
    NgIcon,
		HlmCardContent,
		HlmCard,
		HlmCardTitle,
		HlmCardDescription,
		HlmCardFooter,
		HlmButton,
		HlmButtonImports,
		DatePipe,
    HlmAvatar,
    BrnToggleGroupImports
  ],
  templateUrl: './marketplace-item-card.html',
  styleUrl: './marketplace-item-card.css',
})
export class MarketplaceItemCard {
  private readonly userService = inject(UserService);
	readonly favouritesService = inject(FavouritesService);
  readonly item = input.required<Item>();
  readonly openClick = output<boolean>();
  
	

	async onToggle(): Promise<void> {
		const currentUserId = this.userService.currentUser()?.id;
		if (!currentUserId) return;

		await this.favouritesService.toggleFavourite(currentUserId, this.item().id);
	}

	isItemFavourite(): boolean {
		return this.favouritesService.isFavourite(this.item().id);
	}

  openTradeDialog(){
    this.openClick.emit(true);
  }
}
