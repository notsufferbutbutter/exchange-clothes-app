import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHeart, lucideMessagesSquare } from '@ng-icons/lucide';
import { BrnToggleGroupImports } from '@spartan-ng/brain/toggle-group';
import { HlmAspectRatio } from '@spartan-ng/helm/aspect-ratio';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  HlmCard,
  HlmCardContent,
  HlmCardDescription,
  HlmCardFooter,
  HlmCardTitle,
} from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { Item } from 'src/app/libs/models/item.record';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';

@Component({
  selector: 'app-item',
  imports: [
    NgIcon,
    HlmIcon,
    HlmAspectRatio,
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
  providers: [provideIcons({ lucideHeart, lucideMessagesSquare })],
  template: `
    <section hlmCard class="px-2 py-2">
      <div class="group overflow-hidden rounded-t-md h-[250px]">
        <img
          [src]="item().images[0]"
          alt="Product image"
          class="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div hlmCardContent class="flex flex-col gap-1 py-1 items items-center">
        <h3 hlmCardTitle>{{ item().title }}</h3>
        <p hlmCardDescription>Condition: {{ item()?.condition?.label }}</p>
        <p hlmCardDescription>Size: {{ item()?.size?.label }}</p>
        <p hlmCardDescription>Estimated Price: {{ item()?.price }} €</p>
        <p hlmCardDescription>
          Created at: {{ item()?.created_at | date: 'mediumDate' }}
        </p>
      </div>

      <div hlmCardFooter class="flex justify-between pt-0">
        <hlm-avatar>
          <img
            [src]="item()?.owner?.avatarUrl"
            alt="user profile"
            hlmAvatarImage
          />
          <span class="text-white bg-destructive" hlmAvatarFallback>{{
            item()?.owner?.username
          }}</span>
        </hlm-avatar>

        <!-- <button hlmBtn size="sm" class="flex gap-2">
					<ng-icon hlm name="lucideShoppingBag" size="sm" />
					Contact now
				</button> -->

        <div
          class="
					self-stretch rounded-full 
					flex items-center 
					py-2
					px-4
					border border-black
					hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div
            class="
					text-sm"
          >
            Tausch anfragen
          </div>
        </div>

        <div class="flex gap-3">
          <button
            hlmToggle
            size="sm"
            variant="outline"
            aria-label="Toggle heart"
            class="flex items-center data-[state=on]:bg-transparent data-[state=on]:*:[ng-icon]:*:[svg]:fill-red-500 data-[state=on]:*:[ng-icon]:*:[svg]:stroke-red-500"
          >
            <ng-icon name="lucideHeart" size="20" />
          </button>

          <button hlmBtn size="sm" class="flex items-center justify-center">
            <ng-icon name="lucideMessagesSquare" size="20" />
          </button>
        </div>
      </div>
    </section>
  `,
})
export class ItemComponent {
  item = input.required<Item>();
}
