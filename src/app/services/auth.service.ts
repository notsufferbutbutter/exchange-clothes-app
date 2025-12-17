import { Injectable, signal, inject } from '@angular/core';
import { supabase } from 'src/backend/infrastructure/supabase/superbase-client';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public readonly isLoggedIn = signal<boolean>(false);
	private readonly userService = inject(UserService);

	constructor() {
		this.restoreSession();
	}

	async restoreSession() {
		const { data, error } = await supabase.auth.getSession();
		if(error) console.error('Error at restoring session', error);
		if (!data.session) {
			this.isLoggedIn.set(false);
			return;
		}
		else {
			this.isLoggedIn.set(true);
			await this.userService.setCurrentUserById(data.session.user.id);
		}
	}


	async signup(email: string, password: string) {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error || !data.user) {
			console.error('Error at signing up: ', error);
			return { error };
		}

		const userId = data.user.id;

		await this.userService.registerCurrentUser(userId, email);

		return { message: 'Check your email to verify your account' };
	}

	async loginWithEmail(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error || !data.user?.id) {
			console.error('Error at having userId from login', error);
			return { error };
		}

		const userId = data.user.id;
		console.log(userId);
		this.isLoggedIn.set(true);
		await this.userService.setCurrentUserById(userId);

		return { data, error };
	}

	async logout() {
		await supabase.auth.signOut();
		this.isLoggedIn.set(false);
		this.userService.resetUser();
	}
}
