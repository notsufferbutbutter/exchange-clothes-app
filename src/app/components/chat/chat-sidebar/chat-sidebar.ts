import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { User } from '@ecp/app/libs/models/user.record';
import { HlmAvatar } from '@ecp/app/libs/ui/avatar/src';
import { HlmSidebarImports } from '@ecp/app/libs/ui/sidebar/src';


@Component({
  selector: 'app-chat-sidebar',
  imports: [HlmSidebarImports, HlmAvatar, NgClass],
  templateUrl: './chat-sidebar.html',
})
export class ChatSidebar {
  readonly chatPartners = input<User[]>([]);
  readonly currentPartnerId = input<string>();
  readonly selectedPartner = output<User>();

  onSelectPartner(chatPartner: User) {
    this.selectedPartner.emit(chatPartner);
  }
}
