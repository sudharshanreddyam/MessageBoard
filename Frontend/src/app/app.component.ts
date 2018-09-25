import { Component, ViewChild } from '@angular/core';
import { MessageComponent } from './messages.component';
import { NewMessageComponent } from './newmessage.component';

@Component({
  selector: 'app-root',
  template: `<h1>Hello Message Board </h1>
             <new-message (onPosted)='onPosted($event)'></new-message>
             <messages></messages>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MessageComponent) messages: MessageComponent; // Accessing properties and method of Message Component in messages variable
  title = 'Frontend';
  onPosted(message) {
    this.messages.messagesList.push(message);
  }
}
