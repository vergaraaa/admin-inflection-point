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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getApisData().subscribe((data: any) => {
      this.apisData = data;
    });
  }
}
