import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _sanitizer: any;
    constructor(private http: HttpClient) { }

    createUser(first_name: String, last_name: String, role_id: number, email: String) {
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

    editRole(id : number, role_id: number) {
        var body = {
            'role_id': role_id
        }

        return this.http.put(
            `http://localhost:3000/api/users/updateUserRole/${id}`, body
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

    getUserPhoto(url: string, auth_token?: string) {
        return this.http.get(url, {
            headers: new HttpHeaders({ 'Content-Type': 'image/jpg', 'Authorization': auth_token ?? '' }),
            responseType: 'blob',
        }).pipe(
            map((res: any) => {
                return res;
            })
        )
    }

    getUsers(){

        return this.http.get(
            
            `http://localhost:3000/api/users/`
                
        );

    }

    // updateUserRole(){
    //     return this.http.put('', )
    // }
}
