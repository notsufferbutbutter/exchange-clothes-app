import { Component } from '@angular/core';
import { SignupComponent } from '../../components/signup/signup.component';

@Component({
	selector: 'app-signup-page',
	imports: [SignupComponent],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<div class="flex min-h-screen items-center justify-center pb-20">
			<app-signup></app-signup>
		</div>
	`,
})
export default class SignupPage {}
