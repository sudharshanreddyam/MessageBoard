import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'nav',
  template: `<mat-toolbar color="primary">
                <button matButton routerLink = "/">Message Board</button>
                <button matButton routerLink = "/messages">Messages</button>
                <span style="flex:1 1 auto"></span>
                <button matButton *ngIf="!auth.isAuthenticated" routerLink = "/register">Register</button>
                <button matButton *ngIf="auth.isAuthenticated" routerLink = "/register">Welcome {{auth.name}}</button>
                <button matButton *ngIf="auth.isAuthenticated" (click)="auth.logout()">Log out</button>
                <button matButton *ngIf="!auth.isAuthenticated" routerLink="/login">Login</button>
            </mat-toolbar>`
})
export class NavComponent {
    constructor(private auth: AuthService) {
    }
}
