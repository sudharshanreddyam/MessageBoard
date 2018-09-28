import { Component, ViewChild } from '@angular/core';
import { MessageComponent } from './messages.component';
import { NewMessageComponent } from './newmessage.component';

@Component({
  selector: 'home',
  template: `<new-message (onPosted)='onPosted($event)'></new-message>
             <messages></messages>`
})
export class HomeComponent {
  @ViewChild(MessageComponent) messages: MessageComponent; // Accessing properties and method of Message Component in messages variable
  title = 'Frontend';
  onPosted(message) {
    this.messages.messagesList.push(message);
  }
}
