import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHeart, lucideMessagesSquare } from '@ng-icons/lucide';
import { BrnToggleGroupImports } from '@spartan-ng/brain/toggle-group';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  HlmCard,
  HlmCardContent,
  HlmCardDescription,
  HlmCardFooter,
  HlmCardTitle,
} from '@spartan-ng/helm/card';
import { Item } from 'src/app/libs/models/item.record';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';

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
  providers: [provideIcons({ })],
  templateUrl: 'closet-item.component.html'
})
export class ClosetItemComponent {
  item = input.required<Item>();
}
