import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';

@Component({
	selector: 'app-login-page',
	standalone: true,
	imports: [LoginComponent],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<div class="flex min-h-screen items-center justify-center pb-20">
			<app-login></app-login>
		</div>
	`,
})
export default class LoginPage {}
