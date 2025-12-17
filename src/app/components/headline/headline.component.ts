import { Component, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { HlmCardContent, HlmCardFooter } from 'src/app/libs/ui/card/src';
import { ArticleRecord } from '../../libs/models/article.record';

@Component({
	selector: 'app-headline',
	standalone: true,
	imports: [HlmCardContent, HlmCardFooter],
	providers: [provideIcons({ lucideChevronRight })],
	templateUrl: './headline.component.html',
})
export class HeadlineComponent {
	readonly headline = input.required<ArticleRecord>();
	readonly headlineCount = input.required<number>();
	readonly headlinesTotal = input.required<number>();
}
