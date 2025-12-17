import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
	lucideCheckCircle2,
	lucideChevronDown,
	lucideCircle,
	lucideHelpCircle,
	lucideLink,
	lucideLogOut,
} from '@ng-icons/lucide';
import { BrnNavigationMenuImports } from '@spartan-ng/brain/navigation-menu';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIconImports } from 'src/app/libs/ui/icon/src';
import { HlmNavigationMenuImports } from 'src/app/libs/ui/navigation-menu/src';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [
		RouterLink,
		HlmNavigationMenuImports,
		BrnNavigationMenuImports,
		HlmIconImports,
		HlmAvatarImports,
		HlmButton,
		HlmAvatarImports,
	],
	providers: [
		provideIcons({
			lucideChevronDown,
			lucideLink,
			lucideCircle,
			lucideHelpCircle,
			lucideCheckCircle2,
			lucideLogOut,
		}),
	],
	templateUrl: './navbar.component.html',
	host: {
		class: 'backdrop-blur-sm sticky top-0 z-50 w-full',
	},
})
export class NavbarComponent {
	readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	readonly entdeckenComponents = [
		{
			title: 'Alle Produkte',
			href: '/marketplace',
		},
		{
			title: 'Jacken',
			href: '/marketplace',
		},
		{
			title: 'Hosen',
			href: '/marketplace',
		},
		{
			title: 'Hemden',
			href: '/marketplace',
		},
		{
			title: 'Hoodies',
			href: '/marketplace',
		},
		{
			title: 'Shorts',
			href: '/marketplace',
		},

		{
			title: 'T-Shirts',
			href: '/marketplace',
		},
		{
			title: 'Kleider',
			href: '/marketplace',
		},
	];

	readonly settingComponents = [
		{
			title: 'Profile',
			href: '/components/alert-dialog',
			iconName: '',
			iconClass: '',
		},
		{
			title: 'Docs',
			href: '/components/hover-card',
			iconName: '',
			iconClass: '',
		},
		{
			title: 'Abmelden',
			action: 'logout',
			iconName: 'lucideLogOut',
			iconClass: 'relative top-[2px] ml-1 size-3',
		},
	];

	onLogOut() {
		this.router.navigate(['/']);
		this.authService.logout();
	}
}
