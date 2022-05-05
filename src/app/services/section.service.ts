import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  getApiSections(api_id: number) {
    return this.http.get(
      `http://localhost:3000/api/sections/getApiSections/${api_id}`
    );
  }

  addApiSection(name: string, api_id: number) {
    const body = {
      name,
      api_id
    }

    return this.http.post(
      `http://localhost:3000/api/sections/addApiSection`,
      body
    );
  }

  getDataTypes() {
    return this.http.get(
      `http://localhost:3000/api/data-types`
    )
  }
}
