import { Component, inject, signal } from '@angular/core';
import { ClosetItemComponent } from '../closet-item/closet-item.component';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { BrnDialogContent, BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmFieldGroup, HlmFieldLabel, HlmField } from '@spartan-ng/helm/field';
import { HlmInput, HlmInputImports } from "@spartan-ng/helm/input";
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Item } from 'src/app/libs/models/item.record';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmButtonImports } from '@spartan-ng/helm/button';


@Component({
  selector: 'app-closet',
  imports: [
    ClosetItemComponent, 
    HlmFieldGroup, HlmFieldLabel, HlmInput, HlmField, BrnSelectImports, HlmSelectImports, 
    ReactiveFormsModule,
    BrnDialogImports, HlmDialogImports, HlmLabelImports, HlmInputImports, HlmButtonImports
  ],
  templateUrl: './closet.component.html',
  styleUrl: './closet.component.css'
})
export class ClosetComponent {
  private readonly _fb = inject(FormBuilder);

  public addItemForm = this._fb.group(
    {
      name: [''],
      brand: [''],
      category: [''],
      size: [''],
      condition: [''],
      color: [''],
      description: [''],
      images: [null],
    }
  )

  //todo: create closetItem, which is different to marketplaceItem type
  public items = signal<Item[]>([]);


  onSubmit() {
    if (this.addItemForm.invalid) return;

    const raw = this.addItemForm.value;
    const newItem = {
      id: Date.now(),
      title: raw.name || 'Untitled',
      description: raw.description || '',
      price: null,
      images: raw.images,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      owner_id: 'local-user',
      category_id: 0,
      size_id: 0,
      condition_id: 0,
    } as any; 

    this.items.set([...this.items(), newItem]);
    this.addItemForm.reset();
  }
}
