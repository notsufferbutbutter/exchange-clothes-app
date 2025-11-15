import { Directive, computed, input } from '@angular/core';
import { hlm } from 'src/app/libs/ui/utils/src';
import type { ClassValue } from 'clsx';

export const hlmLarge = 'text-lg font-semibold';

@Directive({
  selector: '[hlmLarge]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmLarge {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm(hlmLarge, this.userClass()),
  );
}
