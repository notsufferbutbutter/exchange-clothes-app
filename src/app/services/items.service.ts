import { computed, inject, Injectable } from "@angular/core";
import { supabase } from "src/backend/infrastructure/supabase/superbase-client";
import { UserService } from "./user.service";
import { Item } from "../libs/models/item.record";

@Injectable({
    providedIn: 'root'
})
export class ItemsService {
    async getAllItemsFromOthers(currentUserId: string) :Promise<Item[]>{
        const { data, error } = await supabase
            .from('items')
            .select('*')
            .neq('owner_id', currentUserId);

        if(error) {
            console.error('Error at getting all items: ', error);
            return [];
        }

        return data.map(this.mapToItem);
    }

    async getAllItemsOfCurrentUser(currentUserId: string) :Promise<Item[]>{
        const { data, error } = await supabase
            .from('items')
            .select('*')
            .eq('owner_id', currentUserId);

        if(error) {
            console.error('Error at getting all items: ', error);
            return [];
        }

        return data.map(this.mapToItem);
    }

    async getItemById(itemId: number) :Promise<Item>{
        const { data, error } = await supabase
            .from('items')
            .select('*')
            .eq('item_id', itemId)
            .single();
        
        if(error) {
            console.error('Error at getting an item by its id', error);
        }

        return this.mapToItem(data);
    }

    async addNewItem(currentUserId: string, newItem: Partial<Item>) {
        const owner_id = currentUserId;
        const title = newItem.title;
        const description = newItem.description;
        const price = newItem.price;
        const images = newItem.images;
        const category = newItem.category;
        const size = newItem.size;
        const condition = newItem.condition;
        const brand = newItem.brand;
        const color = newItem.color
        const created_at = new Date().toISOString();

        const { data, error } = await supabase
            .from('items')
            .insert({
                title, description, price, images,
                owner_id, 
                category, size, condition, brand, color,
                created_at
            })
            .select();

        if (error || !data) {
            console.error("Failed at adding new item:", error);
            return;
        }
        return data[0];
    }

     async updateItem(currentUserId:string, itemId: number, updatedItem: Partial<Item>) {
        const title = updatedItem.title;
        const description = updatedItem.description;
        const price = updatedItem.price;
        const images = updatedItem.images;
        const category = updatedItem.category;
        const size = updatedItem.size;
        const condition = updatedItem.condition;
        const brand = updatedItem.brand;
        const color = updatedItem.color;
        const updated_at = new Date().toISOString();

        const { data, error } = await supabase
            .from('items')
            .update(
                {title, description, price, images, category, size, condition, brand, color, updated_at}
            )
            .eq('item_id', itemId)
            .eq('owner_id', currentUserId)
            .select();

        if (error || !data) console.error("Failed at updating item: ", itemId, ". Error:", error);
    }

    async archiveItem(itemId: number): Promise<boolean> {
        const { error } = await supabase
            .from('items')
            .update({ is_archived: true })
            .eq('item_id', itemId);

        if (error) {
            console.error("Failed to archive item:", itemId, error);
            return false;
        }

        return true;
    }

    private mapToItem(data: any) : Item{
        return {
            id: data.item_id,
            title: data.title,
            description: data.description,
            price: data.price,
            images: data.images,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            ownerId: data.owner_id,
            category: data.category,
            size: data.size,
            condition: data.condition,
            brand: data.brand,
            color: data.color
        }
    }
}