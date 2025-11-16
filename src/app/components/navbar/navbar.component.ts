import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    HlmButton
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
})
export class NavbarComponent {
  protected readonly _entdeckenComponents = [
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

  protected readonly _settingComponents = [
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
      href: '/components/progress',
      iconName: 'lucideLogOut',
      iconClass: 'relative top-[2px] ml-1 size-3',
    },
  ];

  protected readonly authService = inject(AuthService);
}
