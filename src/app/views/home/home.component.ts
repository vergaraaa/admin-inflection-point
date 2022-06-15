import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { Api } from 'src/app/models/api.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  apisData: Api[] = [];
  displayedColumns = ["name", "description", "url", "status"];
  dataSource: MatTableDataSource<Api> = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortPaginator!: MatSort;

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
    
    this.apiService.getApisData().subscribe((dataApi: any) => {
      this.apiService.getStatus().subscribe((dataStatus: any) => {
        
        this.apisData = dataApi;
        this.statusData = dataStatus;
        for(let i = 0; i<this.apisData.length; i++){
          if(this.statusData.hasOwnProperty(this.apisData[i].id)){
            // this.apisData[i].status = this.statusData[this.apisData[i].id!].status?true:false;
            this.apisData[i].status = true;
          }
          else{
            this.apisData[i].status = false;
          }
          console.log(this.statusData[this.apisData[i].id!]);
        }
        // console.log(this.apisData);
        this.dataSource = new MatTableDataSource(this.apisData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sortPaginator;
      });
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

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  getStatus() {
    this.apiService.getStatus().subscribe((data: any) => {
      this.statusData = data;
      console.log(data);
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
