import { Component, effect, inject } from '@angular/core';
import { FavouritesService } from '@ecp/app/services/favourites.service';
import { UserService } from '@ecp/app/services/user.service';
import { MarketplaceItemComponent } from '../marketplace-item/marketplace-item.component';

@Component({
  selector: 'app-favourites',
  imports: [MarketplaceItemComponent],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css',
})
export class Favourites {
    private readonly favouritesService = inject(FavouritesService);
    private readonly userService = inject(UserService);
    readonly favorites = this.favouritesService.favouriteItems;

    constructor() {
        effect(() => {
            const currentUserId = this.userService.currentUser()?.id;
            if (currentUserId) {
                this.favouritesService.getAllFavourites(currentUserId);
            }
        });
    }
}
