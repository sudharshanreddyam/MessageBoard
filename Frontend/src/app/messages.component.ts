import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';
import { MessageSchema } from './messageSchema';

@Component({
    selector: 'messages',
    template: `<div *ngFor="let message of messagesList">
                    <mat-card style="margin:8px">
                        <mat-card-title>{{message.text}}</mat-card-title>
                        <mat-card-content>{{message.owner}}</mat-card-content>
                    </mat-card>
                </div>
                <button mat-button>test</button>`
})

export class MessageComponent implements OnInit {
    messagesList: MessageSchema;
    constructor(private webService: WebService) { }
    ngOnInit() {
        this.webService.getMessages().subscribe(res => {
            console.log(res);
            this.messagesList = res;
        });
    }
}
