import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:2000/api';
    constructor(private http: HttpClient) {
    }

    getMessages(): Observable <any> {
        return this.http.get(this.BASE_URL + '/messages');
    }

    postMessage(message: any): Observable <any> {
        return this.http.post(this.BASE_URL + '/messages', message);
    }
}

