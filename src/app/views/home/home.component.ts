import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { Api } from 'src/app/models/api.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  apisData: Api[] = [];
  displayedColumns = ['name', 'description', 'url', 'status'];
  dataSource: MatTableDataSource<Api> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortPaginator!: MatSort;

  statusData: any = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getApis();
    // this.getStatus();
  }

  getApis() {
    this.apiService.getApisData().subscribe((dataApi: any) => {
      this.apiService.getStatus().subscribe((dataStatus: any) => {
        this.apisData = dataApi;
        this.statusData = dataStatus;
        console.log(this.statusData);
        for (let i = 0; i < this.apisData.length; i++) {
          if (this.statusData.hasOwnProperty(this.apisData[i].id)) {
            // this.apisData[i].status = this.statusData[this.apisData[i].id!].status?true:false;
            this.apisData[i].status = true;
          } else {
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

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  getStatus() {
    this.apiService.getStatus().subscribe((data: any) => {
      this.statusData = data;
      console.log(data);
    });
  }
}
