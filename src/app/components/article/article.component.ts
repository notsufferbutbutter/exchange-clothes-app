import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { HlmButton } from 'src/app/libs/ui/button/src';
import {
  HlmCard,
  HlmCardContent,
  HlmCardDescription,
  HlmCardFooter,
  HlmCardTitle,
} from 'src/app/libs/ui/card/src';
import { HlmIcon } from 'src/app/libs/ui/icon/src';
import { ArticleRecord } from '../../libs/models/article.record';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    NgIcon,
    HlmIcon,
    HlmCardContent,
    HlmCard,
    HlmCardTitle,
    HlmCardDescription,
    HlmCardFooter,
    HlmButton,
  ],
  providers: [provideIcons({ lucideChevronRight })],
  host: {
    class: 'w-full',
  },
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent {
  article = input.required<ArticleRecord>();
}
