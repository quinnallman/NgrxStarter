import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    BASE_URL = 'https://jsonplaceholder.typicode.com'
    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        const url = this.BASE_URL + '/users'
        return this.http.get<User[]>(url)
    }

    updateUser(user: User): Observable<User> {
        const url = this.BASE_URL + '/users/' + user.id
        return this.http.put<User>(url, user)
    }
}