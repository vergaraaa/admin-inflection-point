import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { Api } from 'src/app/models/api.model';
import { Route } from 'src/app/models/forms.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css'],
})
export class RouteDetailComponent implements OnInit {
  @Input() routeId: any;
  @Input() havePermissionToEdit: boolean = false;
  @Input() apiUrl: string = "";
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  isLoading: boolean = true;
  apisData: Api[] = [];

  route: any;
  input_params: any[] = [];
  output_params: any[] = [];
  query_strings: any[] = [];
  headers: any[] = [];
  query: string = '';

  testApiResponse: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private url: ActivatedRoute,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    console.log(this.input_params)
  }

  deleteRoute() {
    this.routeService.deleteRoute(this.routeId).subscribe((data: any) => {
      this.getRoutesDetails();
      this.onDelete.emit();
      let api_id = this.url.snapshot.paramMap.get('id');
      // window.location.reload();
      this.router.navigate(['/api/' + api_id]);
    });
  }

  getRoutesDetails() {
    this.apiService.getRouteDetails(this.routeId).subscribe((data: any) => {
      this.route = data.route;
      this.input_params = data.input_params;
      this.output_params = data.output_params;
      this.query_strings = data.query_string;
      this.headers = data.headers;
      this.isLoading = false;
    });
  }

  ngOnChanges(): void {
    this.getRoutesDetails();
    this.testApiResponse = '';
  }

  testRoute(url: string) {
    const method = this.route.method;

    // Reemplazar los parámetros de la url
    for(let param of this.input_params) {
      url = url.replace(`:${param.name}`, '1');
    }

    // Hacer objeto de headers y query strings

    this.apiService.testRoute(url, method, this.headers, this.query_strings).subscribe((data: any) => {
      this.testApiResponse = data;
    });
  }
}
