import { Component } from '@angular/core';
import { HlmField, HlmFieldDescription, HlmFieldGroup, HlmFieldLabel, HlmFieldSet } from '@spartan-ng/helm/field';
import { HlmInput } from '@spartan-ng/helm/input';
import { LoginComponent } from '../components/login/login.component';

@Component({
	selector: 'app-login-page',
    standalone: true,
	imports: [LoginComponent],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<div class="flex justify-center items-center min-h-screen pb-20">
			<app-login></app-login>
		</div>
	`
})
export default class LoginPage {}