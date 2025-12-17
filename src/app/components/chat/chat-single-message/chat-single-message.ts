import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ChatMessage } from '@ecp/app/libs/models/chat-message.record';
import { HlmAvatar, HlmAvatarImage } from '@ecp/app/libs/ui/avatar/src';


@Component({
  selector: 'app-chat-single-message',
  imports: [NgClass, HlmAvatar, HlmAvatarImage],
  templateUrl: './chat-single-message.html',
})
export class ChatSingleMessage {
  readonly chatMessage = input.required<ChatMessage>();
  readonly currentUserId = input.required<string>();
  readonly parsedMessage = computed(() => {
    const message = this.chatMessage().message;
    
    if (message.includes('Tauschangebot:')) {
      const lines = message.split('\n');
      const text = lines[0];
      const imageUrl = lines.slice(1).find(line => 
        line.startsWith('http://') || line.startsWith('https://'));
        return { text, imageUrl: imageUrl || null };
    }

    return { message, imageUrl: null };
  });
}
