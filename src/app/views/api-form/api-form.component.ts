import { Component, OnInit } from "@angular/core";
import { Routes } from "@angular/router";
import { Section, Route } from "src/app/models/forms.model";
import { ApiRouteComponent } from "./api-route/api-route.component";

@Component({
    selector: "app-forms",
    templateUrl: "./api-form.component.html",
    styleUrls: ["./api-form.component.css"]
})

export class ApiFormComponent implements OnInit {

    sections: Section[] = [];
    newSection: string = "";
    routes: Route[] = [{id: 0, name: '', route: '', method: '', type_id: 0, description: '', section_id: 0, api_id: 0}];
    routeComponents: ApiRouteComponent[] = [new ApiRouteComponent];

    constructor() { }

    ngOnInit() {

    }

    addSection() {
        let section: Section = { id: 0, name: this.newSection, api_id: 0 };
        if (this.newSection != '') this.sections.push(section);
        this.newSection = "";
    }

    deleteSection(index: number) {
        this.sections.splice(index, 1);
    }
    
    addRoute(){
        this.routeComponents.push(new ApiRouteComponent);
    }
    
    deleteRoute(index: number) {
        this.routeComponents.splice(index, 1);
    }
}
