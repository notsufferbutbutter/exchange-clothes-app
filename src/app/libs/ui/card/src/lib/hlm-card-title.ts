import { Directive, computed, input } from '@angular/core';
import { hlm } from 'src/app/libs/ui/utils/src';
import type { ClassValue } from 'clsx';

@Directive({
  selector: '[hlmCardTitle]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmCardTitle {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm('leading-none font-semibold', this.userClass()),
  );
}
