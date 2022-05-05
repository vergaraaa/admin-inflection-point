import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { Api } from 'src/app/models/api.model';
import { Route } from 'src/app/models/forms.model';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css'],
})
export class RouteDetailComponent implements OnInit {
  @Input() routeId: any;

  isLoading: boolean = true;
  apisData: Api[] = [];

  route: any;
  input_params: any[] = [];
  output_params: any[] = [];
  query_strings: any[] = [];
  headers: any[] = [];
  query: string = "";

  constructor(private apiService: ApiService) {

  }
  
  ngOnInit(): void {
            console.log(this.routeId);

    // this.apiService.getApiDetail(this.route.api_id).subscribe((data: any) => {
    //   this.apisData = data;
    // });
  }

  getApiDetails(){

    this.apiService.getApiDetail(this.routeId).subscribe((data: any) => {
      this.route = data.route;
      this.input_params = data.input_params;
      this.output_params = data.output_params;
      this.query_strings = data.query_string;
      this.headers = data.headers;
      this.isLoading = false;
    });

  }

  deleteRoute(){

    this.apiService.deleteRoute(this.routeId).subscribe((data: any) => {

      this.getApiDetails();

    });
    
  }
  

  ngOnChanges(): void {

    this.getApiDetails();

  }
}
