import { Component } from '@angular/core';
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
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    HlmNavigationMenuImports,
    BrnNavigationMenuImports,
    HlmIconImports,
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
      href: '/components/alert-dialog',
    },
    {
      title: 'Jacken',
      href: '/components/hover-card',
    },
    {
      title: 'Hosen',
      href: '/components/progress',
    },
    {
      title: 'Hemden',
      href: '/components/scroll-area',
    },
    {
      title: 'Hoodies',
      href: '/components/tabs',
    },
    {
      title: 'Shorts',
      href: '/components/tooltip',
    },

    {
      title: 'T-Shirts',
      href: '/components/tooltip',
    },
    {
      title: 'Kleider',
      href: '/components/tooltip',
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
}
