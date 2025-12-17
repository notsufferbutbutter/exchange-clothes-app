import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { BrnDialogImports, BrnDialog } from '@spartan-ng/brain/dialog';
import { HlmFieldGroup, HlmFieldLabel, HlmField } from '@spartan-ng/helm/field';
import { HlmInput, HlmInputImports } from "@spartan-ng/helm/input";
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { UserService } from '../../services/user.service';
import { ClosetItemComponent } from '../closet-item/closet-item.component';
import { Item } from '@ecp/app/libs/models/item.record';
import { ItemsService } from '@ecp/app/services/items.service';
import { FilesService } from '@ecp/app/services/files.service';


@Component({
	selector: 'app-closet',
	imports: [
		ClosetItemComponent, 
		HlmFieldGroup, HlmFieldLabel, HlmInput, HlmField, BrnSelectImports, HlmSelectImports, 
		ReactiveFormsModule,
		BrnDialogImports, HlmDialogImports, HlmLabelImports, HlmInputImports, HlmButtonImports,
	],
	templateUrl: './closet.component.html',
})
export class ClosetComponent {
	private readonly itemsService = inject(ItemsService);
	private readonly userService = inject(UserService);
	private readonly filesService = inject(FilesService);
	private fb = inject(FormBuilder);

	@ViewChild(BrnDialog) dialog!: BrnDialog;

	private get currentUserId(): string | undefined {
		return this.userService.currentUser()?.id;
	}

	readonly items = signal<Item[]>([]);
	readonly edittingItem = signal<Item | null>(null);
	files : File[] = []; 
	existingFileUrlsBeforeEdit :string[] = [];
	fileUrls : string[] = [];

	constructor() {
		effect(() => {
			const userId = this.currentUserId;
			if (!userId) {
				// User not loaded yet
				return;
			}
			this.itemsService
				.getAllItemsOfCurrentUser(userId)
				.then((items) => this.items.set(items));
		});
	}

	itemForm = this.fb.group({
		title: ['', Validators.required],
		brand: ['', Validators.required],
		category: ['', Validators.required],
		size: ['', Validators.required],
		condition: ['', Validators.required],
		color: ['', Validators.required],
		description: ['', Validators.required],
		images: [['']],
		price: ['', Validators.required]
	});

	async onSubmit() {
		if (this.itemForm.invalid || !this.currentUserId) return;

		// Validate files for new items only
		if (!this.edittingItem() && this.files.length === 0) {
			console.error('Please select at least one image');
			return;
		}

		const raw = this.itemForm.value;
		const newFileUrls = await this.filesService.uploadFilesToStorage(this.files);

		if(this.edittingItem()) {
			newFileUrls.forEach((newFileUrl) => this.existingFileUrlsBeforeEdit.push(newFileUrl));
			const updatedItem = {
				id: this.edittingItem()!.id,
				title: raw.title,	
				description: raw.description,
				price: Number(raw.price),
				images: this.existingFileUrlsBeforeEdit,
				createdAt: new Date().toISOString(),
				ownerId: this.currentUserId,
				category: raw.category,
				size: raw.size,
				condition: raw.condition,
				brand: raw.brand,
				color: raw.color
			} as Item;

			await this.itemsService.updateItem(this.currentUserId, this.edittingItem()!.id, updatedItem);
		}
		else {
			let newItem = {
				title: raw.title,
				description: raw.description,
				price: Number(raw.price),
				images: newFileUrls,
				updatedAt: new Date().toISOString(),
				category: raw.category,
				size: raw.size,
				condition: raw.condition,
				brand: raw.brand,
				color: raw.color
			} as Partial<Item>;

			const data = await this.itemsService.addNewItem(this.currentUserId, newItem);
			if(!data) {
				console.error('Error at adding new item to database');
				return;
			}
			this.items.update(items => [...items, data]);
		}
		
		this.onCleanUp();
	}

	onAdd() {
		this.dialog.open()
	}

	async onEdit(editingItem: Item) {
		if(!editingItem) {
			console.error('Error at loading item: ', editingItem);
			return;
		}

		this.existingFileUrlsBeforeEdit = editingItem.images;
		this.itemForm.patchValue({
			title: editingItem.title,
			description: editingItem.description,
			price: (editingItem.price)!.toString(),
			category: editingItem.category,
			size: editingItem.size,
			condition: editingItem.condition,
			brand: editingItem.brand,
			color: editingItem.color,
			images: editingItem.images
		})
		this.dialog.open()
		this.edittingItem.set(editingItem);
		
	}

	hasChanges() : boolean {
		const original = this.edittingItem();
		if(!original) return false;
		
		const currentItem = this.itemForm.value;

		if (original.title !== currentItem.title) return true;
		if (original.description !== currentItem.description) return true;
		if (original.price !== Number(currentItem.price)) return true;
		if (this.files.length > 0) return true;
		if (original.category !== currentItem.category) return true;
		if (original.size !== currentItem.size) return true;
		if (original.condition !== currentItem.condition) return true;
		if (original.brand !== currentItem.brand) return true;
		if (original.color !== currentItem.color) return true;
		return false;
	}

	onAddFile(event: Event) {
		const input = event.target as HTMLInputElement;
		if(input.files && input.files.length > 0) {
			this.files = Array.from(input.files);
		}

	}

	onCleanUp() {
		this.dialog.close();
		this.itemForm.reset();
		this.edittingItem.set(null);
		this.existingFileUrlsBeforeEdit = [];
		this.fileUrls = [];
		this.files = [];
	}
}
