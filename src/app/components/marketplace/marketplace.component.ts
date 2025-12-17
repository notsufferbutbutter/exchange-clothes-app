import { Component, computed, effect, inject, signal } from '@angular/core';
import { HlmAutocomplete } from '@spartan-ng/helm/autocomplete';
import { Item } from 'src/app/libs/models/item.record';
import { MarketplaceItemComponent } from '../marketplace-item/marketplace-item.component';
import { ItemsService } from '@ecp/app/services/items.service';
import { UserService } from '@ecp/app/services/user.service';

@Component({
	selector: 'app-marketplace',
	imports: [HlmAutocomplete, MarketplaceItemComponent],
	templateUrl: './marketplace.component.html',
})
export class MarketplaceComponent {
	private readonly userService = inject(UserService);
	private readonly itemsService = inject(ItemsService);
	private readonly items = signal<Item[]>([]);
	readonly search = signal<string>('');
	transformOption = (item: Item) => item.title;
	readonly filteredOption = computed<Item[]>(() =>
		this.items().filter((item) => item.title.toLowerCase().includes(this.search().toLocaleLowerCase())),
	);

	constructor() {
		effect(() => {
			const userId = this.userService.currentUser()?.id;
			if (!userId) {
				// User not loaded or not logged in yet; do nothing.
				return;
			}
			this.itemsService
				.getAllItemsFromOthers(userId)
				.then((items) => this.items.set(items));
		});
	}
}
