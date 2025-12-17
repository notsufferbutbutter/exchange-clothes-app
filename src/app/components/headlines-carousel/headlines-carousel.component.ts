import { Component, computed, input, signal } from '@angular/core';
import Autoplay from 'embla-carousel-autoplay';
import { HlmCard } from 'src/app/libs/ui/card/src';

import { RouterLink } from '@angular/router';
import {
	HlmCarousel,
	HlmCarouselContent,
	HlmCarouselItem,
	HlmCarouselNext,
	HlmCarouselPrevious,
} from 'src/app/libs/ui/carousel/src';
import { ArticleRecord } from '../../libs/models/article.record';
import { HeadlineComponent } from '../headline/headline.component';

@Component({
	selector: 'app-headlines-carousel',
	standalone: true,
	imports: [
		RouterLink,
		HlmCarousel,
		HlmCarouselContent,
		HlmCarouselItem,
		HlmCarouselNext,
		HlmCarouselPrevious,
		HlmCard,
		HeadlineComponent,
	],
	templateUrl: './headlines-carousel.component.html',
})
export class HeadlinesCarouselComponent {
	readonly plugins = [Autoplay({ delay: 3500 })];
	readonly headlines = input.required<ArticleRecord[]>();
	readonly headlinesTotal = computed(() => this.headlines().length);
	readonly currentHeadline = signal<number>(1);
	
	next() {
		if (this.currentHeadline() < this.headlinesTotal()) {
			this.currentHeadline.update((i) => i + 1);
		} else {
			this.currentHeadline.set(1);
		}
	}

	prev() {
		if (this.currentHeadline() >= 2) {
			this.currentHeadline.update((i) => i - 1);
		} else {
			this.currentHeadline.set(this.headlinesTotal());
		}
	}
}
