import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronUp } from '@ng-icons/lucide';
import { HlmIcon } from 'src/app/libs/ui/icon/src';
import { hlm } from 'src/app/libs/ui/utils/src';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-select-scroll-up',
  imports: [NgIcon, HlmIcon],
  providers: [provideIcons({ lucideChevronUp })],
  host: {
    '[class]': '_computedClass()',
  },
  template: ` <ng-icon hlm size="sm" class="ml-2" name="lucideChevronUp" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HlmSelectScrollUp {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm(
      'flex cursor-default items-center justify-center py-1',
      this.userClass(),
    ),
  );
}
