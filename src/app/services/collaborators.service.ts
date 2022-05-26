import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CollaboratorsService {
  constructor(private http: HttpClient) {}

  getCollaborators(api_id: number) {
    return this.http.get(
      'http://localhost:3000/api/collaborators/getCollaborators/' + api_id
    );
  }

  setCollaborators(api_id: number, collaborators: Array<number>) {
    var body = {
      data: {
        api: api_id,
        collaborators: collaborators,
      },
      token: localStorage.getItem('token'),
    };
    return this.http.post(
      'http://localhost:3000/api/collaborators/setCollaborators',
      body
    );
  }
}
