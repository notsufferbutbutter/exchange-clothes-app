import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { BrnToggleGroupImports } from '@spartan-ng/brain/toggle-group';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmCard, HlmCardContent, HlmCardDescription, HlmCardFooter, HlmCardTitle } from '@spartan-ng/helm/card';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';
import { Item } from 'src/app/libs/models/item.record';

@Component({
	selector: 'app-closet-item',
	imports: [
		HlmCardContent,
		HlmCard,
		HlmCardTitle,
		HlmCardDescription,
		HlmCardFooter,
		DatePipe,
		HlmAvatarImports,
		BrnToggleGroupImports,
		HlmToggleGroupImports,
	],
	providers: [provideIcons({})],
	templateUrl: 'closet-item.component.html',
})
export class ClosetItemComponent {
	readonly item = input.required<Item>();
	readonly editClick = output<boolean>();

	onClick() {
		this.editClick.emit(true);
	}
}
