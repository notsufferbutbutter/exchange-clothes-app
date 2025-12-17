import { inject, Injectable, signal } from "@angular/core";
import { supabase } from "src/backend/infrastructure/supabase/superbase-client";
import { Item } from "../libs/models/item.record";
import { ItemsService } from "./items.service";

@Injectable({
    providedIn: 'root'
})
export class FavouritesService {
    private readonly itemsService = inject(ItemsService);

    readonly favouriteItems = signal<Item[]>([]);

    async getAllFavourites(currentUserId: string) :Promise<void>{
        const { data, error } = await supabase
            .from('favourites')
            .select('item_id')
            .eq('user_id', currentUserId);

        if(error || !data) {
            console.error('Error at getting all favourites', error);
            this.favouriteItems.set([]);
            return;
        }

        const itemIds = new Set<number>();
        data.forEach(row => itemIds.add(row.item_id));

        const favItems = Array.from(itemIds).map(itemId =>
            this.itemsService.getItemById(itemId)
        )

        const favItemsPromise = await Promise.all(favItems);
        this.favouriteItems.set(favItemsPromise);
    }

    async toggleFavourite(userId: string, itemId: number) {
        if(this.isFavourite(itemId)) await this.removeFavourite(userId, itemId);
        else await this.addFavourite(userId, itemId);
    }

    isFavourite(itemId: number) :boolean {
        return this.favouriteItems().some(item => item.id === itemId);
    }

    private async addFavourite(userId: string, itemId: number) {
         const { error } = await supabase
            .from('favourites')
            .insert({
                user_id: userId,
                item_id: itemId,
                created_at: new Date().toISOString()
            });

        if (error) console.error('Error at adding favorite:', error);

        const favouriteItem = await this.itemsService.getItemById(itemId);
        
        this.favouriteItems.update(items => {
            return [...items, favouriteItem];
        })
    }

   private async removeFavourite(userId: string, itemId: number) {
        const { error } = await supabase  
            .from('favourites')
            .delete()
            .eq('user_id', userId)
            .eq('item_id', itemId);
        
        if (error) console.error('Error at removing favorite:', error);

        this.favouriteItems.update(items => {
            const newItems = items.filter(item => item.id !== itemId)
            return newItems;
        })
    }
}