import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { Api } from 'src/app/models/api.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  apisData: Api[] = [];
  statusData: any = {};
  query: string = '';
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getApis();
    this.getStatus();
  }

  getApis() {
    this.apiService.getApisData().subscribe((data: any) => {
      this.apisData = data;
    });
  }

  search() {
    return this.apisData.filter((api) => {
      return (
        api.name.toLowerCase().includes(this.query.toLowerCase()) ||
        api.description.toLowerCase().includes(this.query.toLowerCase())
      );
    });
  }

  getStatus() {
    this.apiService.getStatus().subscribe((data: any) => {
      this.statusData = data;
      console.log(this.statusData);
    });
  }
}
