import { Injectable } from "@angular/core";
import { supabase } from "src/backend/infrastructure/supabase/superbase-client";
import { TradeRequest } from "../libs/models/trade-request.record";

@Injectable({
    providedIn: 'root'
})
export class TradeRequestService {
    async addTradeRequest(
        requesterId: string, 
        receiverId: string, 
        requestedItemId: number, 
        offeredItemId: number[],
        message: string) 
    {
        const { data, error } = await supabase
            .from('trade_requests')
            .insert({
                requester_id: requesterId,
                receiver_id: receiverId,
                requested_item_id: requestedItemId,
                offered_item_ids: offeredItemId,
                created_at: new Date().toISOString(),
                status: 'PENDING',
                message
            })
            .select();

        if(error) {
            console.error('Error at adding new trade request');
            return;
        }
        return data?.[0] ? this.mapToTradeRequest(data[0]) : null;
    }

    async getReceivedTradeRequest(currentUserId: string) :Promise<TradeRequest[]> {
        const { data, error } = await supabase
            .from('trade_requests')
            .select('*')
            .eq('receiver_id', currentUserId)
        
        if ( error ) {
            console.error('Error at getting received trade requests');
            return [];
        }

        return data.map(this.mapToTradeRequest);
    }

    async getSentTradeRequest(currentUserId: string) :Promise<TradeRequest[]> {
        const { data, error } = await supabase
            .from('trade_requests')
            .select('*')
            .eq('requester_id', currentUserId)
        
        if ( error ) {
            console.error('Error at getting sent trade requests');
            return [];
        }

        return data.map(this.mapToTradeRequest);
    }

    async updateStatus(id: number, status: 'ACCEPTED' | 'REJECTED'): Promise<boolean> {
        const { error } = await supabase
        .from('trade_requests')
        .update({ 
            status,
            updated_at: new Date().toISOString()
        })
        .eq('id', id);

        if (error) {
        console.error('Failed to update trade request status:', error);
        return false;
        }

        return true;
    }

    async getPendingRequestsByItemIds(itemIds: number[]): Promise<TradeRequest[]> {
        const { data, error } = await supabase
        .from('trade_requests')
        .select('*')
        .eq('status', 'PENDING')
        .or(`requested_item_id.in.(${itemIds.join(',')}),offered_item_ids.cs.{${itemIds.join(',')}}`);

        if (error || !data) {
        console.error('Failed to load trade requests by item IDs:', error);
        return [];
        }

        return data.map(this.mapToTradeRequest);
    }


    private mapToTradeRequest(data: any) {
        return {
            id: data.id,
            requesterId: data.requester_id,
            receiverId: data.receiver_id,
            requestedArticleId: data.requested_item_id,
            offeredArticleIds: data.offered_item_ids,
            message: data.message,
            status: data.status,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        }
    }
}