import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css'],
})
export class RouteDetailComponent implements OnInit {
  @Input() routeId: any;

  isLoading: boolean = true;

  route: any;
  input_params: any[] = [];
  output_params: any[] = [];
  query_strings: any[] = [];
  headers: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.apiService.getRouteDetails(this.routeId).subscribe((data: any) => {
      this.route = data.route;
      this.input_params = data.input_params;
      this.output_params = data.output_params;
      this.query_strings = data.query_string;
      this.headers = data.headers;
      this.isLoading = false;
    });
  }
}
