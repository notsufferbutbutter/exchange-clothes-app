import { Injectable, signal } from "@angular/core";
import { User } from "../libs/models/user.record";
import { supabase } from "src/backend/infrastructure/supabase/superbase-client";

interface UserProfileRow {
    user_id: string;
    email: string;
    username: string | null;
    created_at: string;
    updated_at?: string | null;
    password_hash?: string | null;
    avatar_url?: string | null;
    bio?: string | null;
    location_city?: string | null;
    location_country?: string | null;
}

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
            .maybeSingle();
        
        if(error || !data) {
            console.error('Error at getting current user', error);
            return undefined;
        }

        return this.mapToUser(data);
    }

    async setCurrentUserById(userId: string) {
        // The RPC uses auth.uid(), so the browser cannot create someone else's profile.
        const { data, error } = await supabase
            .rpc('ensure_current_user_profile')
            .single<UserProfileRow>();

        if (error || !data || data.user_id !== userId) {
            this.currentUser.set(null);
            const profileError = error ?? { message: 'Your user profile could not be loaded.' };
            console.error('Error at ensuring current user profile', profileError);
            return { error: profileError };
        }

        const user = this.mapToUser(data);
        this.currentUser.set(user);
        return { error: null };
    }

    resetUser() {
        this.currentUser.set(null);
    }

    private mapToUser(data: UserProfileRow): User {
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
