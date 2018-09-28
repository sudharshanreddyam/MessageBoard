import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  template: `<mat-card>
                <mat-form-field>
                    <input matInput  [(ngModel)]="loginData.email" placeholder="Enter email id" type="email">
                </mat-form-field>
                <mat-form-field>
                    <input matInput [(ngModel)]="loginData.password" placeholder="Enter password" type="password">
                </mat-form-field>
                <button mat-raised-button color="primary" (click)='login()'>Login</button>
            </mat-card>`
})
export class LoginComponent {
    constructor(private auth: AuthService) {
    }
    loginData = {
        email: '',
        password: ''
    };

    login() {
        this.auth.login(this.loginData);
    }
}
