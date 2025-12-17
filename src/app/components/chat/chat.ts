import { AfterViewInit, Component, computed, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { ChatSidebar } from './chat-sidebar/chat-sidebar';
import { ChatService } from '@ecp/app/services/chat.service';
import { User } from '@ecp/app/libs/models/user.record';
import { UserService } from '@ecp/app/services/user.service';
import { ChatMessage } from '@ecp/app/libs/models/chat-message.record';
import { ChatSingleMessage } from './chat-single-message/chat-single-message';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmAvatar, HlmAvatarImage } from '@ecp/app/libs/ui/avatar/src';
import { HlmInput } from "@ecp/app/libs/ui/input/src";
import { supabase } from 'src/backend/infrastructure/supabase/superbase-client';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [ChatSidebar, ChatSingleMessage, HlmAvatar, ReactiveFormsModule, HlmInput, HlmInput, HlmAvatarImage, NgTemplateOutlet],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements AfterViewInit{
  @ViewChild('msgContainer') readonly msgContainer! : ElementRef<HTMLDivElement>;
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly chatService = inject(ChatService);
  readonly chatPartners = signal<User[]>([]);
  readonly currentUserId = computed(() => this.userService.currentUser()?.id ?? '');
  readonly currentPartner = signal<User | null>(null);
  readonly chatMessages = signal<ChatMessage[]>([]);
  readonly chatForm!: FormGroup

  ngAfterViewInit() {
    this.scrollToBottom();
  }


  constructor() {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    })

    effect(() => {
      if(this.chatMessages().length > 0) {
        this.scrollToBottom();
      }
    })

    effect(() => {
      const userId = this.currentUserId();
      if (!userId) return;

      this.chatService
        .getAllChatPartnersOfCurrentUser(userId)
        .then((partners) => this.chatPartners.set(partners))
        .catch((error) => {
          console.error('Error loading chat partners', error);
          this.chatPartners.set([]);
        });
    });

    effect(() => {
      const userId = this.currentUserId();
      const partnerId = this.currentPartner()?.id;
      if (!userId || !partnerId) return;

      this.chatService
        .getAllMessagesWithChatPartner(userId, partnerId)
        .then((data) => this.chatMessages.set(data))
        .catch((error) => {
          console.error('Error loading chat messages', error);
          this.chatMessages.set([]);
        });
    });

    effect((onCleanup) => {
      const userId = this.currentUserId();
      const partnerId = this.currentPartner()?.id

      if(!userId || !partnerId) return;

      const channel = this.chatService.subscribeToChatDatabaseByUserId(
        userId,
        (newMessage) => {
           const isRelevant = 
              (newMessage.senderId === userId && newMessage.receiverId === partnerId) ||
              (newMessage.senderId === partnerId && newMessage.receiverId === userId);

          if(isRelevant) {
            this.chatMessages.update((messages) => [...messages, newMessage])
          }

        });

      onCleanup(() => {
        supabase.removeChannel(channel);
      });
    })
  }

  onSelectPartner(selectedChatPartner: User) {
    this.currentPartner.set(selectedChatPartner);
  }

  onSubmitNewMessage() {
    const newMessage = this.chatForm.value.message;
    const userId = this.currentUserId()?? null;
    const partnerId = this.currentPartner()?.id ?? null;

     if(userId && partnerId) {
      this.chatService.addNewMessageWithChatPartner(userId, partnerId, newMessage);
      this.chatForm.reset();
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      const el = this.msgContainer?.nativeElement;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    }, 0);
  }
   
}
