import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/api.user';
import { Api } from '../models/api.model'
import {Header} from '../models/forms.model'
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

    getRouteDetails(routeId: number) {
        return this.http.get(
            `http://localhost:3000/api/apis/getRouteDetails/${routeId}`
        );
    }

    createApi(api: Api) {
        var body = {
            api: api,
            token: localStorage.getItem('token'),
        }

        return this.http.post(
            `http://localhost:3000/api/apis/addApi`,
            body
        )
    }

    deleteApi(apiId: number) {

        return this.http.delete(`http://localhost:3000/api/apis/${apiId}`);

    }

    editApi(apiId: number, api: Api,) {

        return this.http.put(`http://localhost:3000/api/apis/${apiId}`,
            api);

    }

    getApisOfUser() {
        var body = {
            'token': localStorage.getItem('token')
        }

        return this.http.post(`http://localhost:3000/api/apis/getApisOfUser/`, body);
    }

    deleteRoute(routeId: number) {

        return this.http.delete(`http://localhost:3000/api/apis/deleteRoute/${routeId}`);

    }

    getOneApi(apiId: number) {
        return this.http.get(`http://localhost:3000/api/apis/getOneApi/${apiId}`);
    }

    testRoute(url: string, method: string, headers: any, queryString: any) {
        let headersObj: {
            [key: string]: string
        } = {}
        headers.forEach((header: Header) => {
            headersObj[header.name] = header.value
        });

        let queryStringObj: {
            [key: string]: string
        } = {}
        queryString.forEach((query: Header) => {
            queryStringObj[query.name] = query.value
        });

        // TODO Body
        const body = {}

        switch (method) {
            case 'GET':
                return this.http.get(url, {headers: new HttpHeaders(headersObj), params: queryStringObj});
            case 'POST':
                return this.http.post(url, body, {headers: new HttpHeaders(headersObj), params: queryStringObj});
            case 'PUT':
                return this.http.put(url, body, {headers: new HttpHeaders(headersObj), params: queryStringObj});
            case 'DELETE':
                return this.http.delete(url, {headers: new HttpHeaders(headersObj), params: queryStringObj});
            case 'PATCH':
                return this.http.patch(url, body, {headers: new HttpHeaders(headersObj), params: queryStringObj});
            case 'HEAD':
                return this.http.head(url, {headers: new HttpHeaders(headersObj), params: queryStringObj});
            case 'OPTIONS':
                return this.http.options(url, {headers: new HttpHeaders(headersObj), params: queryStringObj});
            default:
                return this.http.get(url, {headers: new HttpHeaders(headersObj), params: queryStringObj});
        }
    }
}
