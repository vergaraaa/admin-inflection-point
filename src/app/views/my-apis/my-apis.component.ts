import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { Api } from 'src/app/models/api.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-apis',
  templateUrl: './my-apis.component.html',
  styleUrls: ['./my-apis.component.css']
})
export class MyApisComponent implements OnInit {

  apisData: Api[] = [];
  idSelectedApi: number = 0;
  indexSelectedApi: number = 0;
  query: string = "";

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getApisOfUser().subscribe((data: any) => {
      this.apisData = data;
    });
  }

  getApis(){
    this.apiService.getApisOfUser().subscribe((data: any) => {
      this.apisData = data;
    });
  }

  deleteApi(){
    this.apiService.deleteApi(this.idSelectedApi).subscribe((data: any) => {
      this.getApis();
    });
  }

  edit(api_id: number){
    this.router.navigate([`/edit-api/${api_id}`]);
  }

  search(){
    return this.apisData.filter(api => {
      return api.name.toLowerCase().includes(this.query.toLowerCase()) 
          || api.name.toLowerCase().includes(this.query.toLowerCase());
    });
  }

}
