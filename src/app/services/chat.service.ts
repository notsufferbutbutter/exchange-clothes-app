import { inject, Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { supabase } from "src/backend/infrastructure/supabase/superbase-client";
import { ChatMessage } from "../libs/models/chat-message.record";
import { User } from "../libs/models/user.record";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private readonly userService = inject(UserService);

    private mapToChatMessage(row: any): ChatMessage {
        return {
            id: row.id,
            senderId: row.sender_id,
            receiverId: row.receiver_id,
            message: row.message,
            createdAt: row.created_at,
        };
    }

    subscribeToChatDatabaseByUserId(
        userId: string,
        onNewMessage: (newMessage: ChatMessage) => void
    ) {
        const channel = supabase
            //unique channel for each userId
            .channel(`public:chats:${userId}`)
            .on('postgres_changes', 
                { event: 'INSERT', schema: 'public', table:'chats'},
                (payload) => {
                    const insertedMessage = this.mapToChatMessage(payload.new);
                    onNewMessage(insertedMessage);
                }
            )
            .subscribe();
        return channel;
    }

    async getAllChatPartnersOfCurrentUser(userId: string) :Promise<User[]>{
        const { data, error } = await supabase
            .from('chats')
            .select('sender_id, receiver_id')
            .or(`sender_id.eq.${userId}, receiver_id.eq.${userId}`);

        if(error) {
            console.error('Error at getting all chat partners of current user');
            return [];
        }

        const chatPartnerIds = new Set<string>();
        for (const message of data) {
            if (message.sender_id === userId) chatPartnerIds.add(message.receiver_id);
            else chatPartnerIds.add(message.sender_id);
        }

        const chatPartners = Array.from(chatPartnerIds).map(id => 
            this.userService.getUserById(id)
        )

        const chatPartnersPromise = await Promise.all(chatPartners);

        return chatPartnersPromise as User[];
    }

    async getAllMessagesWithChatPartner(currentUserId: string, selectedPartnerId: string) :Promise<ChatMessage[]>{
        const orFilter = `and(sender_id.eq.${currentUserId},receiver_id.eq.${selectedPartnerId}),and(sender_id.eq.${selectedPartnerId},receiver_id.eq.${currentUserId})`;

        const { data, error } = await supabase
            .from('chats')
            .select('*')
            .or(orFilter)
            .order('created_at', { ascending: true });

        if(error) {
            console.error('Error at getting all messages with selected chat partner', error);
            return [];
        }

        return (data ?? []).map((row) => this.mapToChatMessage(row));
    }

    async addNewMessageWithChatPartner(senderId: string, reciverId: string, message: string) {
        const { error } = await supabase
            .from('chats')
            .insert({
                'sender_id': senderId,
                'receiver_id': reciverId,
                message,
                'created_at': new Date().toISOString()
            })
            .select();


        if(error) console.error('Error at adding new message with chat partner', error);
    }
}