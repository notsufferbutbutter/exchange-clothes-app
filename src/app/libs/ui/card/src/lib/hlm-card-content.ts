import { Directive, computed, input } from '@angular/core';
import { hlm } from 'src/app/libs/ui/utils/src';
import type { ClassValue } from 'clsx';

@Directive({
  selector: '[hlmCardContent]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardContent {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm('px-6', this.userClass()),
  );
}
