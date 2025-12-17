import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmError } from '@spartan-ng/helm/form-field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	imports: [
		HlmCardImports,
		HlmLabelImports,
		HlmInputImports,
		HlmButtonImports,
		RouterLink,
		ReactiveFormsModule,
		HlmError,
	],
	providers: [provideIcons({ lucideCheck, lucideChevronDown })],
	host: {
		class: 'contents',
	},
	templateUrl: './login.component.html',
})
export class LoginComponent {
	private readonly route = inject(Router);
	private fb = inject(FormBuilder);
	private readonly authService = inject(AuthService);
	readonly errorMessage = signal<string | null>(null);

	public loginForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
	});

	async onSubmit() {
		if (this.loginForm.invalid) return;

		const { error } = await this.authService.loginWithEmail(
			this.loginForm.value.email!,
			this.loginForm.value.password!,
		);

		if (error) {
			this.errorMessage.set(error.message ?? 'Invalid email or password');
		} else {
			this.route.navigate(['/']);
		}
	}

	public get email() {
		return this.loginForm.controls['email'];
	}

	public get password() {
		return this.loginForm.controls['password'];
	}
}
