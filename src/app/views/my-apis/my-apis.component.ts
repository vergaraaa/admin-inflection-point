import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { Api } from 'src/app/models/api.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/api.user';


@Component({
  selector: 'app-my-apis',
  templateUrl: './my-apis.component.html',
  styleUrls: ['./my-apis.component.css'],
})
export class MyApisComponent implements OnInit {
  apisData: Api[] = [];
  idSelectedApi: number = 0;
  nameSelectedApi: string = '';
  query: string = '';
  queryColaboradores: string = '';
  usersData: User[] = [];

  constructor(
    private apiService: ApiService, private router: Router,
    private userService: UserService) {}
  

  ngOnInit(): void {
    this.apiService.getApisOfUser().subscribe((data: any) => {
      this.apisData = data;
    });
    this.getUsers();
  }

  getApis() {
    this.apiService.getApisOfUser().subscribe((data: any) => {
      this.apisData = data;
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

  search() {
    return this.apisData.filter((api) => {
      return (
        api.name.toLowerCase().includes(this.query.toLowerCase()) ||
        api.name.toLowerCase().includes(this.query.toLowerCase())
      );
    });
  }

  getUsers(){
    this.userService.getUsers().subscribe((data: any) => {
      this.usersData = data;
    });
  }
  
  searchUsers() {
    return this.usersData.filter(user => {
      return user.first_name.toLowerCase().includes(this.queryColaboradores.toLowerCase()) 
          || user.last_name.toLowerCase().includes(this.queryColaboradores.toLowerCase());
    });
  }

}
