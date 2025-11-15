import { Directive, computed, input } from '@angular/core';
import { provideHlmIconConfig } from 'src/app/libs/ui/icon/src';
import { hlm } from 'src/app/libs/ui/utils/src';
import type { ClassValue } from 'clsx';

@Directive({
  selector: '[hlmMenuIcon]',
  providers: [provideHlmIconConfig({ size: 'sm' })],
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmMenuItemIcon {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    hlm('mr-2', this.userClass()),
  );
}
