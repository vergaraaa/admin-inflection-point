import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { Api } from 'src/app/models/api.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  apisData: Api[] = [];
  statusData: any = {};
  query: string = '';
  ascDescBool: boolean = false;
  tableHeaders: any = [
    {
      name: 'API',
      value: 'name',
    },
    {
      name: 'Descripción',
      value: 'description',
    },
    {
      name: 'URL',
      value: 'url',
    },
    {
      name: 'Estado',
      value: 'status',
    },
  ]
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getApis();
    this.getStatus();
  }

  getApis() {
    this.apiService.getApisData().subscribe((data: any) => {
      this.apisData = data;
      console.log(this.apisData)
    });
  }

  search() {
    return this.apisData.filter((api) => {
      return (
        api.name.toLowerCase().includes(this.query.toLowerCase()) ||
        api.description.toLowerCase().includes(this.query.toLowerCase())
      );
    });
  }

  getStatus() {
    this.apiService.getStatus().subscribe((data: any) => {
      this.statusData = data;
    });
  }

  sort(colName: any, boolean: boolean) {
    if(colName == 'status'){
      const statusDataArray = Object.values(this.statusData);

      statusDataArray.forEach((apiStatus: any) => {
        this.apisData.find(api => {
          if (api.id == apiStatus.api_id) {
            api.status = apiStatus.status;
          }
        })
      });

      this.apisData.forEach((api: any) => {
        if (!api.status) {
          api.status = false;
        }
      }
      );
    } 

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
}
