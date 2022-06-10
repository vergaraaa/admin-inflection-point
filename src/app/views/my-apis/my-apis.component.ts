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
  ascDescBool: boolean = false;

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

  searchMyApis() {
    return this.apisData.filter((api) => {
      return (
        api.name.toLowerCase().includes(this.query.toLowerCase()) ||
        api.name.toLowerCase().includes(this.query.toLowerCase())
      );
    });
  }

  searchCollaboratorApis() {
    return this.collaboratorApisData.filter((api) => {
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

  sortMyApis(colName: any, boolean: boolean) {
    // if(colName == 'status'){
    //   const statusDataArray = Object.values(this.statusData);

    //   statusDataArray.forEach((apiStatus: any) => {
    //     this.apisData.find(api => {
    //       if (api.id == apiStatus.api_id) {
    //         api.status = apiStatus.status;
    //       }
    //     })
    //   });

    //   this.apisData.forEach((api: any) => {
    //     if (!api.status) {
    //       api.status = false;
    //     }
    //   }
    //   );
    // } 

    if (boolean == true){
      this.apisData.sort((a: any, b: any): number => {
        if(typeof a[colName] === 'string') {
          let aName = a[colName].toLowerCase();
          let bName = b[colName].toLowerCase();
          aName = aName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          bName = bName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          return aName < bName ? 1 : aName > bName ? -1 : 0;
        } else {
          return a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0;
        }
        })        
        this.ascDescBool = !this.ascDescBool
    }
    else{
      this.apisData.sort((a: any, b: any): number => {
        if(typeof a[colName] === 'string') {
          let aName = a[colName].toLowerCase();
          let bName = b[colName].toLowerCase();
          aName = aName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          bName = bName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          return aName < bName ? -1 : aName > bName ? 1 : 0;
        } else {
          return a[colName] < b[colName] ? -1 : a[colName] > b[colName] ? 1 : 0;
        }
        })  
      this.ascDescBool = !this.ascDescBool
    }
  }

  sortCollaboratorApis(colName: any, boolean: boolean) {
    // if(colName == 'status'){
    //   const statusDataArray = Object.values(this.statusData);

    //   statusDataArray.forEach((apiStatus: any) => {
    //     this.apisData.find(api => {
    //       if (api.id == apiStatus.api_id) {
    //         api.status = apiStatus.status;
    //       }
    //     })
    //   });

    //   this.apisData.forEach((api: any) => {
    //     if (!api.status) {
    //       api.status = false;
    //     }
    //   }
    //   );
    // } 

    if (boolean == true){
      this.collaboratorApisData.sort((a: any, b: any): number => {
        if(typeof a[colName] === 'string') {
          let aName = a[colName].toLowerCase();
          let bName = b[colName].toLowerCase();
          aName = aName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          bName = bName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          return aName < bName ? 1 : aName > bName ? -1 : 0;
        } else {
          return a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0;
        }
        })        
        this.ascDescBool = !this.ascDescBool
    }
    else{
      this.collaboratorApisData.sort((a: any, b: any): number => {
        if(typeof a[colName] === 'string') {
          let aName = a[colName].toLowerCase();
          let bName = b[colName].toLowerCase();
          aName = aName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          bName = bName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          return aName < bName ? -1 : aName > bName ? 1 : 0;
        } else {
          return a[colName] < b[colName] ? -1 : a[colName] > b[colName] ? 1 : 0;
        }
        })  
      this.ascDescBool = !this.ascDescBool
    }
  }
}
