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
		if (error || !data.session) {
			if (error) console.error('Error at restoring session', error);
			this.isLoggedIn.set(false);
			this.userService.resetUser();
			return;
		}
		const { error: profileError } = await this.userService.setCurrentUserById(data.session.user.id);
		this.isLoggedIn.set(!profileError);
	}


	async signup(email: string, password: string) {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error || !data.user) {
			console.error('Error at signing up: ', error);
			return { error: error ?? { message: 'Signup did not return an account. Please try again.' } };
		}

		// The database trigger creates the profile even when email confirmation
		// means signup returns no session. Only access it once authenticated.
		if (data.session) {
			const { error: profileError } = await this.userService.setCurrentUserById(data.session.user.id);
			this.isLoggedIn.set(!profileError);
			if (profileError) {
				return { error: { message: `Your account was created, but your profile is unavailable: ${profileError.message}` } };
			}
			return { message: 'Your account is ready.' };
		}

		return { message: 'Check your email to verify your account' };
	}

	async loginWithEmail(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error || !data.user?.id) {
			console.error('Error at having userId from login', error);
			return { error: error ?? { message: 'Login did not return an account. Please try again.' } };
		}

		const userId = data.user.id;
		const { error: profileError } = await this.userService.setCurrentUserById(userId);
		this.isLoggedIn.set(!profileError);
		if (profileError) return { error: profileError };

		return { data, error };
	}

	async logout() {
		await supabase.auth.signOut();
		this.isLoggedIn.set(false);
		this.userService.resetUser();
	}
}
