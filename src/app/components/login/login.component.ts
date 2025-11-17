import { Component, inject, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { HlmError } from '@spartan-ng/helm/form-field';

@Component({
	selector: 'app-login',
	imports: [HlmCardImports, HlmLabelImports, HlmInputImports, HlmButtonImports, RouterLink, ReactiveFormsModule, HlmError],
	providers: [provideIcons({ lucideCheck, lucideChevronDown })],
	host: {
		class: 'contents',
	},
	templateUrl: './login.component.html'
})
export class LoginComponent {
	private readonly _fb = inject(FormBuilder)
	private readonly _authService = inject(AuthService)
	errorMessage = signal<string | null>(null);
	route = inject(Router);

	public loginForm = this._fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
	})

	async onSubmit() {
		if (this.loginForm.invalid) return;
		
		const { error } = await this._authService.loginWithEmail(this.loginForm.value.email!, this.loginForm.value.password!);
		
		if (error) {
			this.errorMessage.set(error.message ?? "Invalid email or password");	
		};

		this.route.navigate(['/home'])
	}
	
	get email() {
		return this.loginForm.controls['email'];
	}

	get password() {
		return this.loginForm.controls['password'];
	}
}