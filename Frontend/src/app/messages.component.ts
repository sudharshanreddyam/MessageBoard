import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';
import { MessageSchema } from './messageSchema';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'messages',
    template: `<div *ngFor="let message of messagesList">
                    <mat-card style="margin:8px">
                        <mat-card-title [routerLink]="['/messages/', message.owner]">{{message.text}}</mat-card-title>
                        <mat-card-content>{{message.owner}}</mat-card-content>
                    </mat-card>
                </div>
                <button mat-button>test</button>`
})

export class MessageComponent implements OnInit {
    messagesList: MessageSchema;
    constructor(private webService: WebService, private activeRoute: ActivatedRoute) { }
    ngOnInit() {
        const user = this.activeRoute.snapshot.params.name;
        this.webService.getMessages(user).subscribe(res => {
            this.messagesList = res;
        });
    }
}
