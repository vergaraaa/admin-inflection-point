import { Component, OnInit } from "@angular/core";
import { Routes } from "@angular/router";
import { Section, Route } from "src/app/models/forms.model";
import { ApiRouteComponent } from "./api-route/api-route.component";
import { Api } from "src/app/models/api.model";
import { ApiService } from "src/app/services/api-service.service";

@Component({
    selector: "app-api-form",
    templateUrl: "./api-form.component.html",
    styleUrls: ["./api-form.component.css"]
})

export class ApiFormComponent implements OnInit {

    // sections: Section[] = [];
    // newSection: string = "";
    // routes: Route[] = [{id: 0, name: '', route: '', method: '', type_id: 0, description: '', section_id: 0, api_id: 0}];
    // routeComponents: ApiRouteComponent[] = [new ApiRouteComponent];

    name: string = '';
    description: string = '';
    url: string = '';

    constructor(private apiService: ApiService) { }

    ngOnInit() {

    }

    onSubmit() {
        let userIdFromStorage
        if(localStorage.getItem('user_id')) {
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

    // addSection() {
    //     let section: Section = { id: 0, name: this.newSection, api_id: 0 };
    //     if (this.newSection != '') this.sections.push(section);
    //     this.newSection = "";
    // }

    // deleteSection(index: number) {
    //     this.sections.splice(index, 1);
    // }
    
    // addRoute(){
    //     this.routeComponents.push(new ApiRouteComponent);
    // }
    
    // deleteRoute(index: number) {
    //     this.routeComponents.splice(index, 1);
    // }
}
