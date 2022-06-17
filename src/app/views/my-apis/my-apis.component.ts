import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { Api } from 'src/app/models/api.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/api.user';
import { CollaboratorsService } from 'src/app/services/collaborators.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-my-apis',
  templateUrl: './my-apis.component.html',
  styleUrls: ['./my-apis.component.css'],
})
export class MyApisComponent implements OnInit {
  apisData: Api[] = [];
  collaboratorApisData: Api[] = [];
  idSelectedApi: number = 0;
  nameSelectedApi: string = '';
  query: string = '';
  queryColaboradores: string = '';
  usersData: User[] = [];

  displayedColumns = ['name', 'description', 'url', 'status', 'operations'];
  dataSource: MatTableDataSource<Api> = new MatTableDataSource();
  dataSourceCollab: MatTableDataSource<Api> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortPaginator!: MatSort;
  @ViewChild(MatPaginator) paginatorCollab!: MatPaginator;
  @ViewChild(MatSort) sortPaginatorCollab!: MatSort;

  statusData: any = {};

  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService: UserService,
    private collaboratorsService: CollaboratorsService
  ) {}

  ngOnInit(): void {
    this.getApis();
    this.getUsers();
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
    this.dataSourceCollab.filter = $event.target.value;
  }

  getApis() {
    this.apiService.getApisOfUser().subscribe((dataApi: any) => {
      this.apiService.getStatus().subscribe((dataStatus: any) => {
        this.apisData = dataApi.user_apis;
        this.statusData = dataStatus;
        console.log(this.apisData);
        console.log(this.statusData);
        for (let i = 0; i < this.apisData.length; i++) {
          if (this.statusData.hasOwnProperty(this.apisData[i].id)) {
            this.apisData[i].status = true;
          } else {
            this.apisData[i].status = false;
          }
        }
        console.log(this.apisData);
        this.dataSource = new MatTableDataSource(this.apisData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sortPaginator;
      });

      this.apiService.getStatus().subscribe((dataStatusCollab: any) => {
        this.collaboratorApisData = dataApi.collaborator_apis;
        this.statusData = dataStatusCollab;
        for (let i = 0; i < this.collaboratorApisData.length; i++) {
          if (this.statusData.hasOwnProperty(this.collaboratorApisData[i].id)) {
            this.collaboratorApisData[i].status = true;
          } else {
            this.collaboratorApisData[i].status = false;
          }
        }
        this.dataSourceCollab = new MatTableDataSource(
          this.collaboratorApisData
        );
        this.dataSourceCollab.paginator = this.paginatorCollab;
        this.dataSourceCollab.sort = this.sortPaginatorCollab;
      });
    });
  }

  getStatus() {
    this.apiService.getStatus().subscribe((data: any) => {
      this.statusData = data;
      console.log(data);
    });
  }

  onClickDelete(api_id: number, name: string) {
    this.idSelectedApi = api_id;
    this.nameSelectedApi = name;
  }

  deleteApi() {
    this.apiService.deleteApi(this.idSelectedApi).subscribe((data: any) => {
      this.getApis();
    });
  }

  edit(api_id: number) {
    this.router.navigate([`/edit-api/${api_id}`]);
  }

  getUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.usersData = data;
    });
  }

  searchUsers() {
    return this.usersData.filter((user) => {
      // Check if user is the user that is logged in
      const googleAuth = localStorage.getItem('google_auth');
      const microsoftAuth = localStorage.getItem('microsoft_auth');

      let userEmail = '';
      if (googleAuth) {
        userEmail = JSON.parse(googleAuth).email.toLowerCase();
      } else if (microsoftAuth) {
        userEmail = JSON.parse(microsoftAuth).email.toLowerCase();
      }

      if (
        userEmail !== user.email.toLowerCase() &&
        (user.role_id === 1 || user.role_id === 2)
      ) {
        return (
          user.first_name
            .toLowerCase()
            .includes(this.queryColaboradores.toLowerCase()) ||
          user.last_name
            .toLowerCase()
            .includes(this.queryColaboradores.toLowerCase())
        );
      } else {
        return false;
      }
    });
  }

  onClickColaborators(api_id: number) {
    this.idSelectedApi = api_id;
    this.getCollaborators();
  }

  setCollaborators() {
    const collaborators = this.usersData
      .filter((user) => {
        return user.selected;
      })
      .map((user) => {
        return user.id;
      });
    this.collaboratorsService
      .setCollaborators(this.idSelectedApi, collaborators)
      .subscribe((data: any) => {
        this.getApis();
        // this.getCollaboratorApis();
      });
  }

  getCollaborators() {
    return this.collaboratorsService
      .getCollaborators(this.idSelectedApi)
      .subscribe((data: any) => {
        this.usersData.forEach((user) => {
          data.forEach((collaborator: any) => {
            if (user.id === collaborator.user_id) {
              user.selected = true;
            }
          });
        });
      });
  }
}
