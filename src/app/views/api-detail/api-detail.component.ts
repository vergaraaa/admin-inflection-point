import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.css'],
})
export class ApiDetailComponent implements OnInit, OnChanges {
  apiId!: number;
  routeId!: number;

  apiData: any;
  routes: any[] = [];
  sections: any[] = [];

  havePermissionToEdit: boolean = false;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiId = Number(this.route.snapshot.paramMap.get('id'));

    this.route.queryParams.subscribe((params) => {
      this.routeId = Number(params['route']);
    });

    this.userService
      .checkIfUserCanEditApi(this.apiId)
      .subscribe((data: any) => {
        this.havePermissionToEdit = data.can_edit;
      });

    this.getApiDetails();
  }

  getApiDetails() {
    this.apiService.getApiDetail(this.apiId).subscribe((data: any) => {
      this.apiData = data.api;
      this.routes = data.routes;
      this.sections = data.sections;
    });
  }

  ngOnChanges() {
    this.getApiDetails();
  }

  edit(api_id: number) {
    this.router.navigate([`/edit-api/${api_id}`]);
  }

  deleteApi() {
    this.apiService.deleteApi(this.apiId).subscribe((data: any) => {
      this.router.navigate(['/home']);
    });
  }
}
