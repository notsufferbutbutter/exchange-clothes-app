import { Injectable, signal } from '@angular/core';
import { supabase } from 'src/backend/infrastructure/supabase/superbase-client';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	readonly isLoggedIn = signal<boolean>(false);
	readonly user = signal<any>(null);

	constructor() {
		this.restoreSession();
	}

	async restoreSession() {
		const { data } = await supabase.auth.getSession();
		if (data?.session) {
			this.isLoggedIn.set(true);
			this.user.set(data.session);
		}
	}

	async signupNewUser(email: string, password: string) {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) return { error };

		return { message: 'Check your email to verify your account' };
	}

	async loginWithEmail(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) return { error };

		this.isLoggedIn.set(true);
		this.user.set(data.user);

		return { data };
	}

	async logout() {
		await supabase.auth.signOut();
		this.isLoggedIn.set(false);
		this.user.set(null);
	}
}
