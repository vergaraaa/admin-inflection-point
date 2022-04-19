import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) { }

    createUser(first_name: String, last_name: String, role_id: number, email: String){
        var body = {
            'first_name': first_name,
            'last_name': last_name,
            'role_id': role_id,
            'email': email
        }

        return this.http.post(
            `http://localhost:3000/api/users/`, body
        );
    }

    getUserByEmail(email: String) {
        var body = {
            'email': email
        }

        return this.http.post(
            `http://localhost:3000/api/users/getUserByEmail`, body
        );
    }
}
