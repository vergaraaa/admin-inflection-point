import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '../models/forms.model';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }

  addRoute(route: Route) {
    return this.http.post(
      `http://localhost:3000/api/routes/addRoute`,
      route
    );
  }
}
