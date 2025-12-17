import { DatePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Item } from '@ecp/app/libs/models/item.record';
import { TradeRequest } from '@ecp/app/libs/models/trade-request.record';
import { User } from '@ecp/app/libs/models/user.record';
import { HlmButtonImports } from '@ecp/app/libs/ui/button/src';
import { HlmCardImports } from '@ecp/app/libs/ui/card/src';
import { HlmDialogImports } from '@ecp/app/libs/ui/dialog/src';
import { HlmInputImports } from '@ecp/app/libs/ui/input/src';
import { HlmLabelImports } from '@ecp/app/libs/ui/label/src';
import { HlmTabsImports } from '@ecp/app/libs/ui/tabs/src';
import { ItemsService } from '@ecp/app/services/items.service';
import { TradeRequestService } from '@ecp/app/services/trade-request.service';
import { UserService } from '@ecp/app/services/user.service';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';

@Component({
  selector: 'app-trade-overview',
  imports: [HlmTabsImports, HlmCardImports, HlmLabelImports, HlmInputImports, HlmButtonImports, DatePipe,  
    HlmDialogImports, BrnDialogImports],
  templateUrl: './trade-overview.html',
  styleUrl: './trade-overview.css',
})
export class TradeOverview {
  readonly tradeRequestService = inject(TradeRequestService);
  readonly userService = inject(UserService);
  readonly itemService = inject(ItemsService);

  readonly currentUserId = this.userService.currentUser()?.id;
  
  public receivedRequests = signal<TradeRequest[]>([]);
  public sentRequests = signal<TradeRequest[]>([]);
  public successfulTrades = signal<TradeRequest[]>([]);
  
  // Cache for loaded users and items
  private usersCache = signal<Map<string, User>>(new Map());
  private itemsCache = signal<Map<number, Item>>(new Map());

  constructor() {
    effect(() => {
      if (!this.currentUserId) return;
      this.loadAllRequests();
    });
  }

  async loadAllRequests() {
    if (!this.currentUserId) return;

    const received = await this.tradeRequestService.getReceivedTradeRequest(this.currentUserId);
    const sent = await this.tradeRequestService.getSentTradeRequest(this.currentUserId);

    this.receivedRequests.set(received.filter(r => r.status === 'PENDING'));
    this.sentRequests.set(sent);
    this.successfulTrades.set([...received, ...sent].filter(r => r.status === 'ACCEPTED'));
    
    // Preload all users and items needed for display
    await this.preloadData([...received, ...sent]);
  }

  async preloadData(requests: TradeRequest[]) {
    const userIds = new Set<string>();
    const itemIds = new Set<number>();
    
    requests.forEach(req => {
      userIds.add(req.requesterId);
      userIds.add(req.receiverId);
      itemIds.add(req.requestedArticleId);
      req.offeredArticleIds.forEach(id => itemIds.add(id));
    });
    
    // Load all users
    const userPromises = Array.from(userIds).map(async id => {
      const user = await this.userService.getUserById(id);
      if (user) {
        this.usersCache.update(cache => {
          const newCache = new Map(cache);
          newCache.set(id, user);
          return newCache;
        });
      }
    });
    
    // Load all items
    const itemPromises = Array.from(itemIds).map(async id => {
      const item = await this.itemService.getItemById(id);
      if (item) {
        this.itemsCache.update(cache => {
          const newCache = new Map(cache);
          newCache.set(id, item);
          return newCache;
        });
      }
    });
    
    await Promise.all([...userPromises, ...itemPromises]);
  }

  getUser(id: string): User | undefined {
    return this.usersCache().get(id);
  }

  getItem(id: number): Item | undefined {
    return this.itemsCache().get(id);
  }

  async onAccept(request: TradeRequest) {
    if (!request || request.offeredArticleIds.length === 0) return;

    const success = await this.tradeRequestService.updateStatus(request.id, 'ACCEPTED');
    if (!success) return;

    // Archive all items involved in the trade (requested item + all offered items)
    const itemsToArchive = [request.requestedArticleId, ...request.offeredArticleIds];
    await Promise.all(
      itemsToArchive.map(itemId => this.itemService.archiveItem(itemId))
    );

    // Find all pending trade requests involving these archived items
    const relatedRequests = await this.tradeRequestService.getPendingRequestsByItemIds(itemsToArchive);
    
    // Auto-reject all related trade requests (excluding the current accepted one)
    const requestIdsToReject = relatedRequests
      .filter(r => r.id !== request.id)
      .map(r => r.id);
    
    if (requestIdsToReject.length > 0) {
      requestIdsToReject.forEach(async(id: number) => {
        await this.tradeRequestService.updateStatus(id, "REJECTED")
      })
    }

    // Reload requests to show updated state
    await this.loadAllRequests();
  }

  async onReject(request: TradeRequest) {
    const success = await this.tradeRequestService.updateStatus(request.id, 'REJECTED');
    if (success) {
      await this.loadAllRequests();
    }
  }
}
