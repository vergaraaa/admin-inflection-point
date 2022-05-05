import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/api.user';
import { Api } from '../models/api.model'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) { }

    getApisData() {
      return this.http.get('http://localhost:3000/api/apis/');
    }

    getApiDetail(apiId: number) {
      return this.http.get(`http://localhost:3000/api/apis/${apiId}`);
    }

    createApi(api: Api) {
      return this.http.post(
          `http://localhost:3000/api/apis/addApi`,
        api
      )
    }

    deleteApi(apiId: number){

      return this.http.delete(`http://localhost:3000/api/apis/${apiId}`);

    }

    editApi(apiId: number, api: Api,){

      return this.http.put(`http://localhost:3000/api/apis/${apiId}`,
      api);

    }

    getApisOfUser() {
      var body = {
        'token': localStorage.getItem('token')
      }

      return this.http.post(`http://localhost:3000/api/apis/getApisOfUser/`, body);
    }

    deleteRoute(routeId: number){

      return this.http.delete(`http://localhost:3000/api/apis/deleteRoute/${routeId}`);

    }

    getOneApi(apiId: number){
        return this.http.get(`http://localhost:3000/api/apis/getOneApi/${apiId}`);
    }
}
