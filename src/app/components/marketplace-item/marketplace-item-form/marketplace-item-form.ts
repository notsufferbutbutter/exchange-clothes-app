import { DatePipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from '@ecp/app/libs/models/item.record';
import { HlmAvatarImports } from '@ecp/app/libs/ui/avatar/src';
import { HlmButton, HlmButtonImports } from '@ecp/app/libs/ui/button/src';
import { HlmCardContent, HlmCard, HlmCardTitle, HlmCardDescription, HlmCardFooter } from '@ecp/app/libs/ui/card/src';
import { HlmDialogImports } from '@ecp/app/libs/ui/dialog/src';
import { HlmInputImports } from '@ecp/app/libs/ui/input/src';
import { HlmLabelImports } from '@ecp/app/libs/ui/label/src';
import { HlmToggleImports } from '@ecp/app/libs/ui/toggle/src';
import { ChatService } from '@ecp/app/services/chat.service';
import { ItemsService } from '@ecp/app/services/items.service';
import { TradeRequestService } from '@ecp/app/services/trade-request.service';
import { UserService } from '@ecp/app/services/user.service';
import { NgIcon } from '@ng-icons/core';
import { BrnDialog, BrnDialogImports } from '@spartan-ng/brain/dialog';
import { BrnToggleGroupImports } from '@spartan-ng/brain/toggle-group';

@Component({
  selector: 'app-marketplace-item-form',
  imports: [
    HlmButton,
    HlmButtonImports,
    CommonModule,
    HlmAvatarImports,
    HlmToggleImports,
    BrnToggleGroupImports,
    HlmDialogImports,
    BrnDialogImports,
    ReactiveFormsModule,
    HlmInputImports,
    HlmLabelImports,
  ],
  templateUrl: './marketplace-item-form.html',
  styleUrl: './marketplace-item-form.css',
})
export class MarketplaceItemForm implements AfterViewInit {
  private readonly fb = inject(FormBuilder);
  private readonly itemsService = inject(ItemsService);
  private readonly userService = inject(UserService);
  private readonly chatService = inject(ChatService);
  private readonly tradeRequestService = inject(TradeRequestService);

  readonly item = input.required<Item>();
  readonly closeClick = output<boolean>();
  readonly selectedItemIds = signal<number[]>([]);
  readonly userItems = signal<Item[]>([]);
  readonly tradeForm! : FormGroup;
  public isSubmitting = signal(false);
  readonly router = inject(Router);
  currentUserId! : string | undefined;

  @ViewChild(BrnDialog) dialog!: BrnDialog;

  constructor() {
    this.tradeForm = this.fb.group({
      message: ['', Validators.required]
    })

    effect(async() => {
      this.currentUserId = this.userService.currentUser()?.id;
      if(!this.currentUserId) return;
      this.itemsService
        .getAllItemsOfCurrentUser(this.currentUserId)
        .then((data) => this.userItems.set(data))
        .catch((error) => console.error('Error getting all current items of user', error))
    })
  }

  ngAfterViewInit(): void {
    // Automatically open the dialog when this component is rendered
    if (this.dialog) {
      this.dialog.open();
    }
  }

  toggleItemSelection(itemId: number, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const current = this.selectedItemIds();
    if (current.includes(itemId)) {
      this.selectedItemIds.set(current.filter(id => id !== itemId));
    } else {
      this.selectedItemIds.set([...current, itemId]);
    }
  }

  isItemSelected(itemId: number): boolean {
    return this.selectedItemIds().includes(itemId);
  }


  onCancel() {
    this.selectedItemIds.set([]);
    this.tradeForm.reset();
    if (this.dialog) {
      this.dialog.close();
    }
    this.closeClick.emit(true);
  }

  
  async onSubmitTradeRequest() {
    this.isSubmitting.set(true);

    const itemOwnerId = this.item().ownerId;
    const requestedItemId = this.item().id;

    if (!this.currentUserId || !itemOwnerId || !requestedItemId) {
      console.error('Missing required IDs for trade request');
      return;
    }

    try {
      const selectedItems = this.userItems().filter(item => this.selectedItemIds().includes(item.id));
        
      for (const selectedItem of selectedItems) {
        const imageUrl = selectedItem.images[0];
        const itemMessage = `Tauschangebot: ${selectedItem.title}\n${imageUrl}`;
        await this.chatService.addNewMessageWithChatPartner(this.currentUserId, itemOwnerId, itemMessage);
      }
  
      const userMessage = this.tradeForm.value.message?.trim();
      if (userMessage) {
        await this.chatService.addNewMessageWithChatPartner(this.currentUserId, itemOwnerId, userMessage);
      }
  
      const result = await this.tradeRequestService.addTradeRequest(
                                                          this.currentUserId,
                                                          itemOwnerId,
                                                          requestedItemId,
                                                          this.selectedItemIds(),
                                                          userMessage
                                                        );
  
      this.isSubmitting.set(false);
  
      if (result) {
        this.onCancel();
        this.router.navigate(['/chat']);
        alert('Tauschangebot gesendet! Die Konversation wurde im Chat geöffnet.');
      } else {
        alert('Fehler beim Senden des Tauschangebots. Bitte versuche es erneut.');
      }
    } catch (error) {
      console.error('Error creating trade request:', error);
      this.isSubmitting.set(false);
      alert('Fehler beim Senden des Tauschangebots. Bitte versuche es erneut.');
    }
  }
}
