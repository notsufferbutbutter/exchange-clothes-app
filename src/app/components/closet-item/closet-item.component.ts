import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { BrnToggleGroupImports } from '@spartan-ng/brain/toggle-group';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCard, HlmCardContent, HlmCardDescription, HlmCardFooter, HlmCardTitle } from '@spartan-ng/helm/card';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';
import { Item } from 'src/app/libs/models/item.record';

@Component({
	selector: 'app-closet-item',
	imports: [
		NgIcon,
		HlmCardContent,
		HlmCard,
		HlmCardTitle,
		HlmCardDescription,
		HlmCardFooter,
		HlmButton,
		DatePipe,
		HlmAvatarImports,
		BrnToggleGroupImports,
		HlmToggleGroupImports,
	],
	providers: [provideIcons({})],
	templateUrl: 'closet-item.component.html',
})
export class ClosetItemComponent {
	item = input.required<Item>();
}
