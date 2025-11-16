import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { RouterLink } from "@angular/router";

@Component({
	selector: 'app-signup',
	imports: [HlmCardImports, HlmLabelImports, HlmInputImports, HlmButtonImports, RouterLink],
	providers: [provideIcons({ lucideCheck, lucideChevronDown })],
	host: {
		class: 'contents',
	},
	template: `
		<section class="w-full max-w-sm" hlmCard>
			<div hlmCardHeader>
				<h3 hlmCardTitle>Create an account</h3>
			</div>

			<div hlmCardContent>
				<form>
					<div class="flex flex-col gap-6">
						<div class="grid gap-2">
							<label hlmLabel for="email">Email</label>
							<input type="email" id="email" placeholder="m@example.com" required hlmInput />
						</div>

						<div class="grid gap-2">
							<div class="flex items-center">
								<label hlmLabel for="password">Password</label>
							</div>
							<input type="password" id="password" hlmInput />
						</div>
					</div>
				</form>
			</div>

			<div hlmCardFooter class="flex-col gap-2">
				<button hlmBtn type="submit" class="w-full">Create an account</button>
        <a routerLink="/login" class="text-base underline-offset-4 hover:underline">Already have an account?</a>
			</div>
		</section>
	`,
})
export class SignupComponent {}