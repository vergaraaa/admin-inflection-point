import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { Api } from 'src/app/models/api.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/api.user';
import { CollaboratorsService } from 'src/app/services/collaborators.service';

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

  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService: UserService,
    private collaboratorsService: CollaboratorsService
  ) {}

  ngOnInit(): void {
    this.apiService.getApisOfUser().subscribe((data: any) => {
      this.apisData = data.user_apis;
      this.collaboratorApisData = data.collaborator_apis;
      console.log(this.apisData);
      console.log(this.collaboratorApisData);
    });
    this.getUsers();
    // this.getCollaboratorApis();
  }

  getApis() {
    this.apiService.getApisOfUser().subscribe((data: any) => {
      this.apisData = data;
    });
  }

  // getCollaboratorApis() {
  //   // Get collaborator apis with token
  //   this.collaboratorsService
  //     .getCollaboratorApis(localStorage.getItem('token')!)
  //     .subscribe((data: any) => {
  //       console.log(data);
  //       this.collaboratorApisData = data;
  //       console.log(this.collaboratorApisData);
  //     });
  // }

  onClickDelete(api_id: number, name: string) {
    this.idSelectedApi = api_id;
    this.nameSelectedApi = name;
  }

  deleteApi() {
    this.apiService.deleteApi(this.idSelectedApi).subscribe((data: any) => {
      this.getApis();
      // this.getCollaboratorApis();
    });
  }

  edit(api_id: number) {
    this.router.navigate([`/edit-api/${api_id}`]);
  }

  search() {
    return this.apisData.filter((api) => {
      return (
        api.name.toLowerCase().includes(this.query.toLowerCase()) ||
        api.name.toLowerCase().includes(this.query.toLowerCase())
      );
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.usersData = data;
    });
  }

  searchUsers() {
    return this.usersData.filter((user) => {
      return (
        user.first_name
          .toLowerCase()
          .includes(this.queryColaboradores.toLowerCase()) ||
        user.last_name
          .toLowerCase()
          .includes(this.queryColaboradores.toLowerCase())
      );
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
