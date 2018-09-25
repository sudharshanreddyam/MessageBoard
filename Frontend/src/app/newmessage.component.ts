import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebService } from './web.service';
import { FormsModule } from '@angular/forms';
import { MessageSchema } from './messageSchema';

@Component({
    selector: 'new-message',
    template: `
            <mat-card class="card">
                <mat-card-content>
                    <mat-card-content>
                        <input matInput [(ngModel)]="message.owner" placeholder="Name"/>
                    </mat-card-content>
                    <mat-card-content>
                        <textarea matInput [(ngModel)]="message.text" placeholder="Message"></textarea>
                    </mat-card-content>
                    <mat-card-actions>
                        <button matButton color="primary" (click)="post()" >POST</button>
                    </mat-card-actions>
                </mat-card-content>
            </mat-card>`
})

export class NewMessageComponent {
    @Output() onPosted = new EventEmitter();
    message = new MessageSchema();
    constructor(private webService: WebService) {
    }

    post() {
        this.webService.postMessage(this.message).subscribe(res => {
            console.log(res);
            this.onPosted.emit(this.message);
            this.message = new MessageSchema();
        });
    }
}



