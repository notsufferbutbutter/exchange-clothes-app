import { Component, input } from '@angular/core';
import { ArticleObject } from '../../../libs/models/article-object.interface';
import { HlmCardContent, HlmCardFooter } from '@spartan-ng/helm/card';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [HlmCardContent, HlmCardFooter],
  providers: [provideIcons({ lucideChevronRight })],
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css'],
})
export class HeadlineComponent {
  headline = input.required<ArticleObject>();
  headlineCount = input.required<number>();
  headlinesTotal = input.required<number>();
}
