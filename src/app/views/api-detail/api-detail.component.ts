import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.css'],
})
export class ApiDetailComponent implements OnInit {
  apiId!: number;
  routeId!: number;

  apiData: any;
  routes: any[] = [];
  sections: any[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.apiId = Number(this.route.snapshot.paramMap.get('id'));

    this.route.queryParams.subscribe((params) => {
      this.routeId = Number(params['route']);
    });

    this.apiService.getApiDetail(this.apiId).subscribe((data: any) => {
      this.apiData = data.api;
      this.routes = data.routes;
      this.sections = data.sections;
    });
    console.log(this.apiData.name);
  }
}
