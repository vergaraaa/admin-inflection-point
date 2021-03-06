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
  @Input() apiUrl: string = '';
  @Input() routeStatus: any = {};
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  isLoading: boolean = true;
  apisData: Api[] = [];

  route: any;
  input_params: any[] = [];
  output_params: any[] = [];
  query_strings: any[] = [];
  headers: any[] = [];
  bodies: any[] = [];
  query: string = '';

  testApiResponse: string = '';
  apiResponseError: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private url: ActivatedRoute,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {}

  deleteRoute() {
    this.routeService.deleteRoute(this.routeId).subscribe((data: any) => {
      this.getRoutesDetails();
      this.onDelete.emit();
      let api_id = this.url.snapshot.paramMap.get('id');
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
      this.bodies = data.bodies;
      this.isLoading = false;
    });
  }

  ngOnChanges(): void {
    this.getRoutesDetails();
    this.testApiResponse = '';
  }

  getFormType(input: any) {
    switch (input.data_type) {
      case 'string':
        return 'text';
      case 'integer':
        return 'number';
      case 'boolean':
        return 'checkbox';
      case 'date':
        return 'date';
      case 'array':
        return 'textarea';
      default:
        return 'text';
    }
  }

  testRoute(url: string) {
    const method = this.route.method;

    // Reemplazar los par??metros de la url
    for (let param of this.input_params) {
      url = url.replace(`:${param.name}`, `${param.value}`);
    }

    this.apiService
      .testRoute(url, method, this.headers, this.query_strings, this.bodies)
      .subscribe(
        (data: any) => {
          this.testApiResponse = data;
          this.apiResponseError = false;
        },
        (error: any) => {
          this.testApiResponse = error;
          this.apiResponseError = true;
        }
      );
  }

  onChangeCheckbox(event: any, input: any) {
    input.value = event.target.checked;
  }
}
