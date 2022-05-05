import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import { Api } from "src/app/models/api.model";
import { ApiService } from "src/app/services/api-service.service";
@Component({
    selector: "app-api-form",
    templateUrl: "./api-form.component.html",
    styleUrls: ["./api-form.component.css"]
})

export class ApiFormComponent implements OnInit {

    isEditing : boolean = false;
    api_id: string | null = null;
    name: string = '';
    description: string = '';
    url: string = '';
    api: Api = { id: 0, name: '', url: '', description: '', user_id: 0 };

    constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.api_id = this.route.snapshot.paramMap.get('api_id');
        if (this.api_id != null) {
            this.isEditing = true;
            this.getApi();
        }
    }

    onSubmit() {
        let userIdFromStorage
        if (localStorage.getItem('user_id')) {
            userIdFromStorage = +localStorage.getItem('user_id')!
        } else {
            userIdFromStorage = 1
        }
        const api: Api = {
            name: this.name,
            description: this.description,
            url: this.url,
            user_id: userIdFromStorage
        }
        this.apiService.createApi(api).subscribe(res => {
            console.log(res)
        })
    }

    onEdit(){
        console.log('guardando cambios');
        this.apiService.editApi(+this.api_id!, this.api).subscribe({
            next: (res: any) => {
                console.log(res);
                this.router.navigate(['home']);
            },
            error: err => console.error(err),
        })
    }

    getApi() {
        this.apiService.getOneApi(+this.api_id!).subscribe({
            next: (res: any) => {
                this.api = res;
            },
            error: err => console.error(err)
        })
    }
}
