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
	styleUrls: ['./headline.component.css'],
})
export class HeadlineComponent {
	headline = input.required<ArticleRecord>();
	headlineCount = input.required<number>();
	headlinesTotal = input.required<number>();
}
