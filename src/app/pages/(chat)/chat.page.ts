import { Component } from "@angular/core";
import { Chat } from "@ecp/app/components/chat/chat";

@Component({
    selector: 'app-chat-page',
    imports: [Chat],
    template: `
        <app-chat />
    `,
})
export default class ChatPage {

}