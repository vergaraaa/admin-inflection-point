import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getApisData() {
    return this.http.get('http://localhost:3000/api/apis/getApis');
  }

  getApiDetail(apiId: number) {
    return this.http.get(`http://localhost:3000/api/apis/getApi/${apiId}`);
  }

  getRouteDetails(routeId: number) {
    return this.http.get(
      `http://localhost:3000/api/apis/getRouteDetails/${routeId}`
    );
  }
}
