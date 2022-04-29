import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/api.user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getApisData() {
    return this.http.get('http://localhost:3000/api/apis/');
  }

  getApiDetail(apiId: number) {
    return this.http.get(`http://localhost:3000/api/apis/${apiId}`);
  }

  getRouteDetails(routeId: number) {
    return this.http.get(
      `http://localhost:3000/api/apis/getRouteDetails/${routeId}`
    );
  }

  createApi(){
      
  }

  getApisOfUser(){
    let userId = localStorage.getItem('user_id');
    return this.http.get(`http://localhost:3000/api/apis/getApisOfUser/${userId}`);

  }

}
