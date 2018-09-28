import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:2000/api';
    constructor(private http: HttpClient) {
    }

    getMessages(user): Observable <any> {
        user =  user ? ('/' + user) : '';
        return this.http.get(this.BASE_URL + '/messages' + user);
    }

    postMessage(message: any): Observable <any> {
        return this.http.post(this.BASE_URL + '/messages', message);
    }
}

