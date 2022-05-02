import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/api.user';
import {Api} from '../models/api.model'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getApisData() {
    return this.http.get('https://api-inflection-point.herokuapp.com/api/apis/');
  }

  getApiDetail(apiId: number) {
    return this.http.get(`https://api-inflection-point.herokuapp.com/api/apis/${apiId}`);
  }

  getRouteDetails(routeId: number) {
    return this.http.get(
      `https://api-inflection-point.herokuapp.com/api/apis/getRouteDetails/${routeId}`
    );
  }

  createApi(api: Api){
      return this.http.post(
        `https://api-inflection-point.herokuapp.com/api/apis/addApi`,
        api
      )
  }

  getApisOfUser(){
    let userId = localStorage.getItem('user_id');
    return this.http.get(`https://api-inflection-point.herokuapp.com/api/apis/getApisOfUser/${userId}`);

  }

}
