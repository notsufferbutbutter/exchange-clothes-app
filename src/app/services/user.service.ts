import { Injectable, signal } from "@angular/core";
import { User } from "../libs/models/user.record";
import { supabase } from "src/backend/infrastructure/supabase/superbase-client";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly currentUser = signal<User | null>(null);

    async getUserById(userId: string): Promise<User | undefined> {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', userId)
            .single();
        
        if(error || !data) {
            console.error('Error at getting current user', error);
            return undefined;
        }

        return this.mapToUser(data);
    }

    async setCurrentUserById(userId: string) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', userId)
            .single();
        
        if(error || !data) {
            console.error('Error at getting current user', error);
            return;
        }

        const user = this.mapToUser(data);
        this.currentUser.set(user);
    }


    async registerCurrentUser(userId: string, email: string) {
        const { error } = await supabase
            .from('users')
            .insert({ user_id: userId, email: email, created_at: new Date().toISOString() });

        if(error) console.error('Error at registering current user to the database', error);
    }

    resetUser() {
        this.currentUser.set(null);
    }

    private mapToUser(data: any): User {
        return {
            id: data.user_id,
            username: data.username ?? '',
            email: data.email,
            createdAt: data.created_at,
            updatedAt: data.updated_at ?? null,
            passwordHash: data.password_hash ?? null,
            avatarUrl: data.avatar_url ?? null,
            bio: data.bio ?? null,
            locationCity: data.location_city ?? null,
            locationCountry: data.location_country ?? null,
        };
    }
}